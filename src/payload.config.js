"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_postgres_1 = require("@payloadcms/db-postgres");
var storage_vercel_blob_1 = require("@payloadcms/storage-vercel-blob");
var richtext_lexical_1 = require("@payloadcms/richtext-lexical");
var path_1 = require("path");
var payload_1 = require("payload");
var url_1 = require("url");
var sharp_1 = require("sharp");
var Users_1 = require("./collections/Users");
var Media_1 = require("./collections/Media");
var Team_Member_1 = require("./collections/Team-Member");
var Event_1 = require("./collections/Event");
var Category_1 = require("./collections/Category");
var Blog_1 = require("./collections/Blog");
var filename = (0, url_1.fileURLToPath)(import.meta.url);
var dirname = path_1.default.dirname(filename);
exports.default = (0, payload_1.buildConfig)({
    admin: {
        user: Users_1.Users.slug,
        importMap: {
            baseDir: path_1.default.resolve(dirname),
        },
    },
    collections: [Users_1.Users, Media_1.Media, Team_Member_1.TeamMember, Event_1.Event, Category_1.Category, Blog_1.Blog],
    plugins: [
        (0, storage_vercel_blob_1.vercelBlobStorage)({
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
    editor: (0, richtext_lexical_1.lexicalEditor)({
        features: function (_a) {
            var defaultFeatures = _a.defaultFeatures;
            return __spreadArray(__spreadArray([], defaultFeatures, true), [
                (0, richtext_lexical_1.FixedToolbarFeature)(),
                (0, richtext_lexical_1.SubscriptFeature)(),
                (0, richtext_lexical_1.OrderedListFeature)(),
                (0, richtext_lexical_1.UnorderedListFeature)(),
                (0, richtext_lexical_1.EXPERIMENTAL_TableFeature)(),
                (0, richtext_lexical_1.LinkFeature)(),
                (0, richtext_lexical_1.UploadFeature)(),
                (0, richtext_lexical_1.ItalicFeature)(),
            ], false);
        },
    }),
    secret: process.env.PAYLOAD_SECRET || '',
    typescript: {
        outputFile: path_1.default.resolve(dirname, 'payload-types.ts'),
    },
    db: (0, db_postgres_1.postgresAdapter)({
        pool: {
            connectionString: process.env.DATABASE_URL || '',
        },
    }),
    sharp: sharp_1.default,
});
