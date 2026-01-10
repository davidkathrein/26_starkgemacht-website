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
        '[&_a]:decoration-olive-600 dark:[&_a]:decoration-olive-500 [&_a]:underline',
        className,
      )}
      converters={jsxConverter}
    />
  )
}
