import path from 'node:path'
import { pathToFileURL } from 'node:url'
import dotenv from 'dotenv'
import { getPayload } from 'payload'

dotenv.config()

const DEBUG_IMAGE_TRANSFORMS = process.env.DEBUG_IMAGE_TRANSFORMS === 'true'

async function loadPayloadConfig() {
  const configPath = process.env.PAYLOAD_CONFIG_PATH

  if (!configPath) {
    throw new Error('PAYLOAD_CONFIG_PATH is not set')
  }

  const absolutePath = path.isAbsolute(configPath)
    ? configPath
    : path.resolve(process.cwd(), configPath)
  const moduleUrl = pathToFileURL(absolutePath).href
  const imported = await import(moduleUrl)
  const config = imported.default ?? imported

  if (!config) {
    throw new Error(`Unable to load Payload config from ${absolutePath}`)
  }

  return config
}

async function regenerateMediaSizes() {
  try {
    const config = await loadPayloadConfig()
    const payload = await getPayload({ config })
    let updated = 0
    let skipped = 0
    let failed = 0

    const { docs } = await payload.find({
      collection: 'media',
      depth: 0,
      limit: 300,
    })

    for (const mediaDoc of docs) {
      const label = mediaDoc.alt || mediaDoc.id

      try {
        if (DEBUG_IMAGE_TRANSFORMS) {
          console.info('[media-regenerate] Starting media update', {
            id: mediaDoc.id,
            label,
            filename: mediaDoc.filename,
            url: mediaDoc.url,
            mimeType: mediaDoc.mimeType,
            focalX: mediaDoc.focalX ?? null,
            focalY: mediaDoc.focalY ?? null,
            existingSizes: Object.keys(mediaDoc.sizes || {}),
          })
        }

        if (!mediaDoc.filename) {
          console.warn(`Skipping media ${label}: missing filename`)
          skipped += 1
          continue
        }

        if (!mediaDoc.url) {
          console.warn(`Skipping media ${label}: missing url`)
          skipped += 1
          continue
        }

        const mimeType = mediaDoc.mimeType || null
        if (!mimeType || !mimeType.startsWith('image/')) {
          console.warn(`Skipping media ${label}: non-image mimeType (${mimeType || 'unknown'})`)
          skipped += 1
          continue
        }

        const sourceUrl = /^https?:\/\//i.test(mediaDoc.url)
          ? mediaDoc.url
          : new URL(
              mediaDoc.url,
              process.env.MEDIA_SOURCE_BASE_URL || 'http://localhost:3000',
            ).toString()
        const res = await fetch(sourceUrl, { method: 'GET' })
        if (!res.ok) {
          console.warn(
            `Skipping media ${label}: failed to download source (${res.status}) from ${sourceUrl}`,
          )
          skipped += 1
          continue
        }

        const sourceBuffer = Buffer.from(await res.arrayBuffer())
        const focalX = typeof mediaDoc.focalX === 'number' ? mediaDoc.focalX : 50
        const focalY = typeof mediaDoc.focalY === 'number' ? mediaDoc.focalY : 50

        if (DEBUG_IMAGE_TRANSFORMS) {
          console.info('[media-regenerate] Re-uploading media source with uploadEdits', {
            id: mediaDoc.id,
            sourceUrl,
            bytes: sourceBuffer.length,
            focalX,
            focalY,
          })
        }

        await payload.update({
          collection: 'media',
          id: mediaDoc.id,
          context: {
            skipCustomSizeHook: true,
          },
          data: {
            alt: mediaDoc.alt || 'Image',
            caption: mediaDoc.caption || undefined,
            focalX,
            focalY,
          },
          req: {
            query: {
              uploadEdits: {
                focalPoint: {
                  x: focalX,
                  y: focalY,
                },
              },
            },
          },
          file: {
            data: sourceBuffer,
            mimetype: mimeType,
            name: mediaDoc.filename,
            size: sourceBuffer.length,
          },
          overwriteExistingFiles: true,
        })

        if (DEBUG_IMAGE_TRANSFORMS) {
          console.info('[media-regenerate] Media update completed', {
            id: mediaDoc.id,
            label,
          })
        }

        console.log(`Media ${label} updated`)
        updated += 1
      } catch (error) {
        console.error(`Media ${label} failed to regenerate`)
        console.error(error)
        failed += 1
      }
    }

    console.log('Media size regeneration completed!')
    console.log('Summary:')
    console.log(`- total: ${docs.length}`)
    console.log(`- updated: ${updated}`)
    console.log(`- skipped: ${skipped}`)
    console.log(`- failed: ${failed}`)
    process.exit(0)
  } catch (error) {
    console.error('Unable to regenerate media sizes')
    console.error(error)
    process.exit(1)
  }
}

void regenerateMediaSizes()
