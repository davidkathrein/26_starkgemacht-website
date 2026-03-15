import * as migration_20260315_125553_add_media_seo_preview_columns from './20260315_125553_add_media_seo_preview_columns';

export const migrations = [
  {
    up: migration_20260315_125553_add_media_seo_preview_columns.up,
    down: migration_20260315_125553_add_media_seo_preview_columns.down,
    name: '20260315_125553_add_media_seo_preview_columns'
  },
];
