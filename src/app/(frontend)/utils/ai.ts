'use server'

import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { createAzure } from '@quail-ai/azure-ai-provider'
import { generateText } from 'ai'

// Konfiguration: 'openrouter' oder 'azure'
const AI_PROVIDER = (process.env.AI_PROVIDER || 'openrouter') as 'openrouter' | 'azure'

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
})

const azure = createAzure({
  endpoint: process.env.AZURE_HOSTED_ENDPOINT || '',
  apiKey: process.env.AZURE_API_KEY || '',
})

export async function generatePreviewText(prompt: string): Promise<string> {
  //   const model =
  //     AI_PROVIDER === 'azure'
  //       ? azure(process.env.AZURE_DEPLOYMENT_NAME || 'gpt-4')
  //       : openrouter('google/gemini-2.0-flash-exp:free')

  const model = openrouter('google/gemini-2.5-flash')
  console.log(prompt)

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
