import { type SchemaTypeDefinition } from 'sanity'
import creator from '../../lib/sanity/schemas/creator'
import campaign from '../../lib/sanity/schemas/campaign'
import contract from '../../lib/sanity/schemas/contract'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [creator, campaign, contract],
}
