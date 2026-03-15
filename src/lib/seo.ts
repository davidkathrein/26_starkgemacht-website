const siteNameFromEnv = process.env.SITE_NAME || process.env.NEXT_PUBLIC_SITE_NAME

export const SITE_NAME = siteNameFromEnv?.trim() || 'StarkGemacht'

export function withSiteName(title: string) {
  return `${title} - ${SITE_NAME}`
}
