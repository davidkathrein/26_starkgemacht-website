import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

// Run with: pnpm exec tsx scripts/regenerate-media-sizes.ts

async function main() {
  const payload = await getPayload({ config })


  try {
    // Find media documents (limit set to 500)
    const media = await payload.find({
      collection: 'media',
      depth: 0,
      limit: 500,
    });

    if (media && media.totalDocs > 0) {
      payload.logger.info(`Found ${media.totalDocs} media files.`);
      for (let index = 0; index < media.docs.length; index++) {
        const mediaDoc = media.docs[index];

        try {
          await payload.update({
            collection: 'media',
            id: mediaDoc.id,
            data: mediaDoc,
            overwriteExistingFiles: true,
          });

          payload.logger.info(
            `Media ${mediaDoc.id} (${mediaDoc.filename}) successfully regenerated and new copy created.`
          );
        } catch (err) {
          payload.logger.error(
            `Media ${mediaDoc.id} (${mediaDoc.filename}) failed to regenerate`
          );
          console.error(err);
        }
      }
    } else {
      payload.logger.info('No media files found.');
    }
  } catch (err) {
    payload.logger.error('Error while fetching media files.');
    console.error(err);
  }

  payload.logger.info('Done!');
  process.exit(0);
}

main();