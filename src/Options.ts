import { DocumentNode } from 'apollo-link'
import { LocalStrategy } from './types'

export interface ModuleOptions {
  enable: boolean,
  vuex: {
    namespace: string
  },
  strategies: {
    local: LocalStrategy | false
  }
  // local: {
  //   loginMutation: DocumentNode | undefined,
  //   tokenProperty: string,
  //   userQuery: DocumentNode | undefined,
  //   userProperty: string
  // },
  debug: boolean,
  scopeKey: string
  redirect: {
    login: string | false
    logout: string | false
    // callback: string | false
    // home: string | false
  }

}
export const moduleDefaults: ModuleOptions = {
  strategies: {
    local: {
      enabled: true,
      endpoints: {
        login: false,
        logout: false,
        user: false
      },
      user: {
        property: 'user'
      },
      token:{
        property:'token'
      }
    }
  },
  scopeKey: 'scope',
  redirect: {
    login: '/login',
    logout: '/'
    // home: '/',
    // callback: '/login'
  },
  enable: true,
  vuex: {
    namespace: 'qAuth'
  },
  // local: {
  //   loginMutation: undefined,
  //   tokenProperty: 'token',
  //   userQuery: undefined,
  //   userProperty: 'user'
  // },
  debug: false

}

