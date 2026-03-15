const siteNameFromEnv =
  process.env.NEXT_PUBLIC_SITE_NAME || process.env.NEXT_PUBLIC_NEXT_PUBLIC_SITE_NAME

export const NEXT_PUBLIC_SITE_NAME = siteNameFromEnv?.trim() || 'StarkGemacht'

export function withSiteName(title: string) {
  return `${title} - ${NEXT_PUBLIC_SITE_NAME}`
}
