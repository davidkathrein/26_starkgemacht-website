'use server'

import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { generateText } from 'ai'
import { slugify } from 'payload/shared'

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
})

const model = openrouter('google/gemini-2.5-flash')

export async function generatePreviewText(prompt: string): Promise<string> {
  //   const model =
  //     AI_PROVIDER === 'azure'
  //       ? azure(process.env.AZURE_DEPLOYMENT_NAME || 'gpt-4')
  //       : openrouter('google/gemini-2.0-flash-exp:free')

  const response = await generateText({
    model,
    prompt: [
      {
        role: 'system',
        content:
          'You are a helpful assistant that generates marketing text for events based on event details provided by the user. The text should be engaging, concise, and suitable for a general website audience. Dont include Pricing or precise location information.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  if (!response.text) {
    throw new Error('No text generated')
  }

  return response.text.trim()
}

export async function generateSlug(eventName: string): Promise<string | undefined> {
  const response = await generateText({
    model,
    prompt: [
      {
        role: 'system',
        content:
          'You are a helpful assistant that generates URL-friendly slugs based on event names provided by the user. The slug should be as concise and clear as possible, lowercase, and use hyphens to separate words. Avoid special characters and spaces.',
      },
      {
        role: 'user',
        content: `Erstelle einen URL-freundlichen Slug für dieses Event. Der Slug sollte so kurz und klar wie möglich sein: ${eventName}`,
      },
    ],
  })

  if (!response.text) {
    throw new Error('No text generated')
  }

  return slugify(response.text)
}
