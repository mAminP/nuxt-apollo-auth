import { Context } from '@nuxt/types'
import consola from 'consola'
import { State, Helpers } from '../utils'
import type { TokenResult, UserResult, LoginResult } from '../utils'
import { ModuleOptions } from './../'
export class Auth {
    private readonly context:Context
    private readonly options: ModuleOptions
    private readonly _state:State
    private readonly _helpers:Helpers
    constructor (context:Context, options:ModuleOptions) {
      this.context = context
      this.options = options
      this._state = new State(context, options)
      this._helpers = new Helpers(options)
    }

    public get loggedIn ():boolean {
      return this._state.loggedIn
    }

    public async login<
    TMutete = any, TVariables = any, TQuery = any, TUser = any
     > (data:TVariables):Promise<LoginResult<TMutete, TQuery, TUser>> {
      try {
        const client = this.context.app.apolloProvider.defaultClient
        // grt token from server
        const { token, response: tokenResponse } = await this.getToken<TMutete, TVariables>(data)
        if (!token) { return Promise.resolve({ token, tokenResponse, user: null, userResponse: null }) }
        // set apollo cookie
        await this.context.$apolloHelpers.onLogin(token as string, client)
        // get user from server
        const { user, response: userResponse } = await this.getUser<TQuery, TUser>()
        if (!user) { return Promise.resolve({ token, tokenResponse, user, userResponse }) }
        // configure login in vuex
        this._state.SetUserAndToken(user, token)
        return Promise.resolve({ token, tokenResponse, user, userResponse })
      } catch (error) {
        return Promise.reject(error)
      }
    }

    public async getToken<TMutete = any, TVariables = any> (data:TVariables):Promise<TokenResult<TMutete>> {
      try {
        const client = this.context.app.apolloProvider.defaultClient
        if (this.options.debug) { consola.info('Trying to fetch Token ...') }
        const response = await client.mutate<TMutete, TVariables>({
          mutation: this.options.local.loginMutation,
          variables: { ...data }
        })
        if (this.options.debug) { consola.success('Fetching Token was successful | Resposne => ', response) }
        const token = this._helpers._tokenExtraction(response)
        return Promise.resolve({ token, response })
      } catch (error) {
        return Promise.reject(error)
      }
    }

    public async getUser<TQuery = any, TUser = any> ():Promise<UserResult<TQuery, TUser>> {
      const client = this.context.app.apolloProvider.defaultClient

      try {
        if (this.options.debug) { consola.info('Trying to fetch User ...') }

        const response = await client.query<TQuery>({
          query: this.options.local.userQuery
        })
        if (this.options.debug) { consola.success('Fetching User was successful | Resposne => ', response) }
        const user = this._helpers._userExtraction<TUser>(response.data as unknown as object)
        return Promise.resolve({ user: user as TUser | null, response })
      } catch (error) {
        return Promise.reject(error)
      }
    }
}
