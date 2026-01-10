import { convertHTMLToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import { JSDOM } from 'jsdom'
import config from '@payload-config'

export const convertHtmlToRichText = async (htmlInput: string) => {
  const awaitedConfig = await config

  const lexicalOutput = convertHTMLToLexical({
    editorConfig: await editorConfigFactory.default({
      config: awaitedConfig, // Your Payload Config
    }),
    html: htmlInput,
    JSDOM, // Pass in the JSDOM import; it's not bundled to keep package size small
  })

  return lexicalOutput
}
