import path from 'node:path'
import { pathToFileURL } from 'node:url'
import dotenv from 'dotenv'
import { getPayload } from 'payload'

dotenv.config()

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
    let processed = 0
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

        await payload.update({
          collection: 'media',
          id: mediaDoc.id,
          data: {
            alt: mediaDoc.alt || 'Image',
            caption: mediaDoc.caption || undefined,
          },
        })

        console.log(`Media ${label} processed`)
        processed += 1
      } catch (error) {
        console.error(`Media ${label} failed to regenerate`)
        console.error(error)
        failed += 1
      }
    }

    console.log('Media size regeneration completed!')
    console.log('Summary:')
    console.log(`- total: ${docs.length}`)
    console.log(`- processed: ${processed}`)
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
