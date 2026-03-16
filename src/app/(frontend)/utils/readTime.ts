import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

function extractText(value: unknown): string {
  if (!value || typeof value !== 'object') return ''

  if (Array.isArray(value)) {
    return value.map(extractText).join(' ')
  }

  const record = value as Record<string, unknown>
  const ownText = typeof record.text === 'string' ? record.text : ''
  const childText = extractText(record.children)
  const rootText = extractText(record.root)

  return [ownText, childText, rootText].filter(Boolean).join(' ')
}

export function estimateReadTimeMinutes(
  content: SerializedEditorState | null | undefined,
  wordsPerMinute = 200,
): number {
  if (!content) return 1

  const text = extractText(content).trim()
  if (!text) return 1

  const wordCount = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}
