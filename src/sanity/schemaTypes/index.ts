import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import { projectPostType } from './projectPostType'
import { siteType } from './siteType'
import { wysiwygType } from './wysiwygType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType, projectPostType, siteType, wysiwygType],
}
