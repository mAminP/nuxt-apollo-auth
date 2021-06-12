import { DocumentNode } from 'apollo-link'

export interface ModuleOptions{
  enable: boolean,
    vuex:{
      namespace:string
    },
    local:{
      loginMutation: DocumentNode | undefined,
      tokenProperty:string,
      userQuery: DocumentNode | undefined,
      userProperty:string
    },
  debug: boolean,

}
export const moduleDefaults:ModuleOptions = {
  enable: true,
  vuex: {
    namespace: 'qAuth'
  },
  local: {
    loginMutation: undefined,
    tokenProperty: 'token',
    userQuery: undefined,
    userProperty: 'user'
  },
  debug: false

}

