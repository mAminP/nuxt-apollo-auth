import { DocumentNode } from 'apollo-link'

export interface LocalStrategy{
    endpoints:{
        login: { mutation: DocumentNode }| false,
        user: { query: DocumentNode } | false,
        logout: { mutation: DocumentNode } | false,
    }
    user:{
        property: string,
    },
    token: {
        property: string,
      }
}
