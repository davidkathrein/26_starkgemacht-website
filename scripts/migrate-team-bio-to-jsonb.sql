-- Migrate team.bio from text to jsonb (Lexical richText)
-- Run once when you see: ALTER TABLE "team" ALTER COLUMN "bio" SET DATA TYPE jsonb;
--
-- Usage: psql "$DATABASE_URL" -f scripts/migrate-team-bio-to-jsonb.sql
-- Or run this in your DB client before starting the app.

-- Convert plain text to Lexical JSON; leave existing JSON as-is.
ALTER TABLE "team"
  ALTER COLUMN "bio" SET DATA TYPE jsonb USING (
    CASE
      WHEN "bio" IS NULL THEN NULL
      WHEN trim("bio"::text) LIKE '{%' THEN ("bio"::text)::jsonb
      ELSE jsonb_build_object(
        'root',
        jsonb_build_object(
          'type', 'root',
          'children', jsonb_build_array(
            jsonb_build_object(
              'type', 'paragraph',
              'children', jsonb_build_array(
                jsonb_build_object(
                  'type', 'text',
                  'detail', 0,
                  'format', 0,
                  'mode', 'normal',
                  'style', '',
                  'text', "bio"::text,
                  'version', 1
                )
              ),
              'direction', 'ltr',
              'format', '',
              'indent', 0,
              'textFormat', 0,
              'textStyle', '',
              'version', 1
            )
          ),
          'direction', 'ltr',
          'format', '',
          'indent', 0,
          'version', 1
        )
      )
    END
  );
