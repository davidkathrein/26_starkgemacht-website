import type { PayloadRequest } from 'payload'
import type { SanitizedCollectionConfig } from 'payload'

type ImageSizeConfig = {
  name: string
  width?: number
  height?: number
  position?: string | number
}

type ImageFormatOptions = {
  format?: string
  options?: Record<string, unknown>
}

function normalizeFocalPoint(value: unknown): number | null {
  const numeric =
    typeof value === 'number' ? value : typeof value === 'string' ? Number(value) : null

  if (numeric == null || Number.isNaN(numeric)) return null
  if (numeric >= 0 && numeric <= 1) return numeric
  if (numeric >= 0 && numeric <= 100) return numeric / 100
  return null
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

function formatToExtension(format: string): string {
  switch (format) {
    case 'jpg':
    case 'jpeg':
      return 'jpg'
    case 'png':
      return 'png'
    case 'webp':
      return 'webp'
    case 'avif':
      return 'avif'
    case 'gif':
      return 'gif'
    case 'tiff':
      return 'tif'
    case 'heif':
      return 'heif'
    case 'jp2':
      return 'jp2'
    default:
      return 'jpg'
  }
}

function formatToMimeType(format: string): string {
  switch (format) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg'
    case 'png':
      return 'image/png'
    case 'webp':
      return 'image/webp'
    case 'avif':
      return 'image/avif'
    case 'gif':
      return 'image/gif'
    case 'tiff':
      return 'image/tiff'
    case 'heif':
      return 'image/heif'
    case 'jp2':
      return 'image/jp2'
    default:
      return 'image/jpeg'
  }
}

function isImageMimeType(mimeType: string | null | undefined): boolean {
  return Boolean(mimeType && mimeType.startsWith('image/'))
}

function needsSizeGeneration(
  doc: { sizes?: Record<string, unknown> | null },
  imageSizes: ImageSizeConfig[] | undefined,
): boolean {
  if (!imageSizes?.length) return false
  const existing = doc.sizes ?? {}

  for (const size of imageSizes) {
    if (!existing[size.name]) return true
  }

  return false
}

export async function regenerateMissingImageSizes({
  collection,
  data,
  originalDoc,
  req,
  forceRegenerate = false,
}: {
  collection: SanitizedCollectionConfig
  data: Record<string, unknown>
  originalDoc?: Record<string, unknown> | null
  req: PayloadRequest
  forceRegenerate?: boolean
}): Promise<void> {
  const uploadConfig = collection.upload
  if (!uploadConfig || typeof uploadConfig !== 'object') return

  const { imageSizes } = uploadConfig
  if (!imageSizes?.length) return

  const sourceDoc = originalDoc ?? data
  const url = (sourceDoc?.url ?? data?.url) as string | undefined
  const filename = (sourceDoc?.filename ?? data?.filename) as string | undefined
  const mimeType = (sourceDoc?.mimeType ?? data?.mimeType) as string | undefined

  if (!url || !filename || !isImageMimeType(mimeType)) {
    req.payload.logger.warn('Regenerate media sizes: missing url/filename or non-image mime type')
    return
  }

  const previousFocalX = normalizeFocalPoint(originalDoc?.focalX)
  const previousFocalY = normalizeFocalPoint(originalDoc?.focalY)
  const nextFocalX = normalizeFocalPoint(data?.focalX ?? sourceDoc?.focalX)
  const nextFocalY = normalizeFocalPoint(data?.focalY ?? sourceDoc?.focalY)

  const focalPointChanged = nextFocalX !== previousFocalX || nextFocalY !== previousFocalY

  if (
    !forceRegenerate &&
    !focalPointChanged &&
    !needsSizeGeneration(sourceDoc ?? data, imageSizes)
  ) {
    return
  }

  const handleUpload = (uploadConfig as Record<string, unknown>).handleUpload as
    | ((args: {
        data: { prefix?: string; filename?: string }
        file: { buffer: Buffer; filename: string; mimeType: string }
      }) => Promise<{ filename?: string }>)
    | undefined

  const sharp = req.payload.config.sharp as typeof import('sharp') | undefined
  if (!handleUpload || !sharp) {
    req.payload.logger.warn(
      'Regenerate media sizes: missing handleUpload or sharp in upload config',
    )
    return
  }

  let imageBuffer: Buffer

  try {
    const res = await fetch(url, { method: 'GET' })

    if (!res.ok) {
      req.payload.logger.warn(`Regenerate media sizes: failed to fetch ${url} (${res.status})`)
      return
    }

    imageBuffer = Buffer.from(await res.arrayBuffer())
  } catch (err) {
    req.payload.logger.warn(
      `Regenerate media sizes: fetch error for ${url}: ${
        err instanceof Error ? err.message : String(err)
      }`,
    )
    return
  }

  const prefixRaw = (uploadConfig as Record<string, unknown>).staticDir
  const prefix = typeof prefixRaw === 'string' ? prefixRaw : 'media'
  const baseName = filename.replace(/\.[^.]+$/, '')
  const ext = filename.split('.').pop() ?? 'jpg'
  const defaultMime = mimeType ?? 'image/jpeg'

  const focalX = nextFocalX
  const focalY = nextFocalY

  const generatedSizes: Record<
    string,
    {
      filename: string | null
      width: number | null
      height: number | null
      mimeType: string
      filesize: number | null
    }
  > = {}

  const sourceMetadata = await sharp(imageBuffer).metadata()
  const sourceWidth = sourceMetadata.width
  const sourceHeight = sourceMetadata.height

  for (const sizeConfig of imageSizes) {
    const name = sizeConfig.name
    const width = sizeConfig.width ?? 1280
    const height = sizeConfig.height ?? 720
    const position = sizeConfig.position != null ? String(sizeConfig.position) : 'centre'
    const formatOptions = (sizeConfig as { formatOptions?: ImageFormatOptions }).formatOptions
    const targetFormat = formatOptions?.format?.toLowerCase()
    const shouldUseFocalCrop =
      sizeConfig.position == null &&
      focalX != null &&
      focalY != null &&
      sourceWidth != null &&
      sourceHeight != null

    try {
      let pipeline = sharp(imageBuffer).rotate()

      if (shouldUseFocalCrop) {
        const scale = Math.max(width / sourceWidth, height / sourceHeight)
        const resizedWidth = Math.max(width, Math.round(sourceWidth * scale))
        const resizedHeight = Math.max(height, Math.round(sourceHeight * scale))

        const focusX = focalX * resizedWidth
        const focusY = focalY * resizedHeight
        const left = clamp(Math.round(focusX - width / 2), 0, Math.max(0, resizedWidth - width))
        const top = clamp(Math.round(focusY - height / 2), 0, Math.max(0, resizedHeight - height))

        pipeline = pipeline
          .resize(resizedWidth, resizedHeight, { fit: 'fill' })
          .extract({ left, top, width, height })
      } else {
        pipeline = pipeline.resize(width, height, { fit: 'cover', position })
      }

      if (targetFormat) {
        pipeline = pipeline.toFormat(
          targetFormat as Parameters<import('sharp').Sharp['toFormat']>[0],
          formatOptions?.options as Parameters<import('sharp').Sharp['toFormat']>[1],
        )
      }

      const resizedBuffer = await pipeline.toBuffer()

      const outputExt = targetFormat ? formatToExtension(targetFormat) : ext
      const outputMime = targetFormat ? formatToMimeType(targetFormat) : defaultMime

      const sizeFilename = `${baseName}-${width}x${height}.${outputExt}`
      const uploadData: { prefix: string; filename?: string } = { prefix }

      await handleUpload({
        data: uploadData,
        file: {
          buffer: resizedBuffer,
          filename: sizeFilename,
          mimeType: outputMime,
        },
      })

      const finalFilename = (uploadData as { filename?: string }).filename ?? sizeFilename
      const meta = await sharp(resizedBuffer).metadata()

      generatedSizes[name] = {
        filename: finalFilename,
        width: meta.width ?? width,
        height: meta.height ?? height,
        mimeType: outputMime,
        filesize: resizedBuffer.length,
      }
    } catch (err) {
      req.payload.logger.warn(
        `Regenerate media sizes: failed to generate size ${name}: ${
          err instanceof Error ? err.message : String(err)
        }`,
      )
    }
  }

  if (Object.keys(generatedSizes).length > 0) {
    data.sizes = {
      ...((data.sizes as Record<string, unknown>) ?? {}),
      ...generatedSizes,
    }
  }
}
