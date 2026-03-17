import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { jsxConverter } from './converters'
import { clsx } from 'clsx/lite'

type Props = {
  data: SerializedEditorState
} & React.HTMLAttributes<HTMLDivElement>

export function RichText(props: Props) {
  const { className, data, ...rest } = props

  return (
    <RichTextConverter
      {...rest}
      data={data}
      className={clsx(
        '[&_a]:bg-brand-200/30 [&_a]:dark:bg-brand-800/30 [&_a]:text-brand-700 dark:[&_a]:text-brand-300 [&_a]:decoration-brand-500/55 dark:[&_a]:decoration-brand-300/45 [&_a:hover]:text-brand-900 dark:[&_a:hover]:text-brand-100 [&_a:hover]:decoration-brand-700 dark:[&_a:hover]:decoration-brand-200 [&_a]:underline [&_a]:underline-offset-3 [&_a]:transition-colors',
        className,
      )}
      converters={jsxConverter}
    />
  )
}
