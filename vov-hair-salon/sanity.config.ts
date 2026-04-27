import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {SANITY_DATASET, SANITY_PROJECT_ID} from '../sanity.shared.js'

export default defineConfig({
  name: 'default',
  title: 'Vov hair salon',

  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
