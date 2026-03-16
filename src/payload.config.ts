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

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const databaseURL = process.env.DATABASE_URL || ''
const databaseHost = process.env.DATABASE_HOST
const databasePort = process.env.DATABASE_PORT
const databaseUser = process.env.DATABASE_USER
const databasePassword = process.env.DATABASE_PASSWORD
const databaseName = process.env.DATABASE_NAME
const databaseCA = process.env.DATABASE_CA
const usePostgresSSL =
  process.env.PGSSL === 'false' ? false : process.env.NODE_ENV === 'production'
const postgresSSLConfig = usePostgresSSL
  ? databaseCA
    ? {
        ca: databaseCA,
      }
    : {
        rejectUnauthorized: false,
      }
  : undefined
const postgresPoolConfig =
  databaseHost && databasePort && databaseUser && databasePassword && databaseName
    ? {
        host: databaseHost,
        port: Number.parseInt(databasePort, 10),
        user: databaseUser,
        password: databasePassword,
        database: databaseName,
        ...(postgresSSLConfig ? { ssl: postgresSSLConfig } : {}),
      }
    : {
        connectionString: databaseURL,
        ...(postgresSSLConfig ? { ssl: postgresSSLConfig } : {}),
      }

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, TeamMember, Event, Category, Blog, Page],
  globals: [Footer],
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
    pool: postgresPoolConfig,
  }),
  sharp,
})
