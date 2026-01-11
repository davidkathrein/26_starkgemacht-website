import { DefaultNodeTypes } from '@payloadcms/richtext-lexical'
import { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'

import { headingConverter } from './headingConverter'
import { uploadConverter } from './uploadConverter'
import { linkConverter } from './linkConverter'

type NodeTypes = DefaultNodeTypes

export const jsxConverter: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...linkConverter,
  ...headingConverter,
  ...uploadConverter,
})
