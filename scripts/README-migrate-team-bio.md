# Migrate `team.bio` from text to jsonb

If you see this error when loading a page that uses the team collection (e.g. TeamImageShortParagraph):

```text
Failed query: ALTER TABLE "team" ALTER COLUMN "bio" SET DATA TYPE jsonb;
```

PostgreSQL cannot cast existing plain text in `bio` to `jsonb` automatically. Run the migration once to convert values to Lexical JSON:

**Option A – psql**

```bash
psql "$DATABASE_URL" -f scripts/migrate-team-bio-to-jsonb.sql
```

**Option B – Node (using connection string from env)**

```bash
node -e "
const { execSync } = require('child_process');
const url = process.env.DATABASE_URL;
if (!url) { console.error('Set DATABASE_URL'); process.exit(1); }
execSync('psql \"' + url + '\" -f scripts/migrate-team-bio-to-jsonb.sql', { stdio: 'inherit' });
"
```

Then restart your dev server. The `team.bio` column will be `jsonb` and Payload will stop trying to run the failing `ALTER`.
