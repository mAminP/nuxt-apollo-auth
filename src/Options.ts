import { DocumentNode } from 'apollo-link'

export interface ModuleOptions {
  enable: boolean,
  vuex: {
    namespace: string
  },
  local: {
    loginMutation: DocumentNode | undefined,
    tokenProperty: string,
    userQuery: DocumentNode | undefined,
    userProperty: string
  },
  debug: boolean,
  scopeKey: string
  redirect: {
    login: string | false
    logout: string | false
    callback: string | false
    home: string | false
  }

}
export const moduleDefaults: ModuleOptions = {
  scopeKey: 'scope',
  redirect: {
    login: '/login',
    logout: '/',
    home: '/',
    callback: '/login'
  },
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

