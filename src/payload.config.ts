import { postgresAdapter } from '@payloadcms/db-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import {
  lexicalEditor,
  LinkFeature,
  UploadFeature,
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  SubscriptFeature,
  OrderedListFeature,
  UnorderedListFeature,
  ItalicFeature,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { TeamMember } from './collections/Team-Member'
import { Event } from './collections/Event'
import { Category } from './collections/Category'
import { Blog } from './collections/Blog'
import { Page } from './collections/Page'
import { Footer } from './globals/Footer'
import { Navbar } from './globals/Navbar'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, TeamMember, Event, Category, Blog, Page],
  globals: [Footer, Navbar],
  plugins: [
    vercelBlobStorage({
      enabled: true, // Optional, defaults to true
      // Specify which collections should use Vercel Blob
      collections: {
        media: {
          prefix: 'media',
        },
      },
      // Token provided by Vercel once Blob storage is added to your Vercel project
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      FixedToolbarFeature(),
      SubscriptFeature(),
      OrderedListFeature(),
      UnorderedListFeature(),
      EXPERIMENTAL_TableFeature(),
      LinkFeature(),
      UploadFeature(),
      ItalicFeature(),
      // add/enable more features here if you previously removed them
      // e.g. headings, lists, quotes, code blocks, etc.
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      host: process.env.DATABASE_HOST!,
      port: parseInt(process.env.DATABASE_PORT!),
      user: process.env.DATABASE_USER!,
      password: process.env.DATABASE_PASSWORD!,
      database: process.env.DATABASE_NAME!,
      ssl: { ca: process.env.DATABASE_CA! },
    },
  }),
  sharp,
})
