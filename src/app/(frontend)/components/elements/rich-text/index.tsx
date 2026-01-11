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
        '[&_a]:bg-olive-200/30 [&_a]:dark:bg-olive-800/30 [&_a:hover]:bg-olive-300/60 dark:[&_a:hover]:bg-olive-700/60 [&_a]:rounded [&_a]:px-1 [&_a]:py-0.5 [&_a]:text-blue-700 [&_a]:underline [&_a]:transition-colors dark:[&_a]:text-blue-500 [&_a:visited]:text-purple-600 dark:[&_a:visited]:text-purple-400',
        className,
      )}
      converters={jsxConverter}
    />
  )
}
