import { Context } from '@nuxt/types'
import consola from 'consola'
import { ModuleOptions } from '../Options'
import { LoginResult, LogoutResult, TokenResult, UserResult, IqAuth } from '../types'
import { Debugger, Helpers } from '../utils'
import { Storage } from './storage'
export class qAuth implements IqAuth {
  private readonly ctx: Context;
  public options: ModuleOptions;
  private readonly _helpers: Helpers
  private readonly _debugger: Debugger
  public $storage: Storage

  constructor (ctx: Context, options: ModuleOptions) {
    this.ctx = ctx
    this.options = options
    this.$storage = new Storage(ctx, options)
    this._debugger = new Debugger(options)
    this._helpers = new Helpers(options, this._debugger)
  }

  public get busy (): boolean {
    return this.$storage.busy
  }

  public get loggedIn (): boolean {
    return this.$storage.loggedIn
  }

  public get user (): any {
    return this.$storage.user as any
  }

  public async login<TMutation = any, TVariables = any, TQuery = any, TUser = any> (loginMutationVariables: TVariables):
    Promise<LoginResult<TMutation, TQuery, TUser>> {
    const client = this.ctx.app.apolloProvider.defaultClient
    try {
      this.$storage._IncreaseTrend()
      // grt token from server
      const { token, response: mutationResponse } = await this.getToken<TMutation, TVariables>(loginMutationVariables)
      if (!token) {
        return Promise.resolve({ success: false, token, mutationResponse, user: null, queryResponse: null })
      }
      // set apollo cookie
      await this.ctx.$apolloHelpers.onLogin(token as string, client)
      // get user from server
      const { user, response: queryResponse } = await this.getUser<TQuery, TUser>()
      if (!user) {
        await this.ctx.$apolloHelpers.onLogout(client)
        return Promise.resolve({ success: false, token, mutationResponse, user, queryResponse })
      }
      // configure login in vuex
      this.$storage.SetUserAndTokenState(user, token)
      return Promise.resolve({ success: true, token, mutationResponse, user, queryResponse })
    } catch (error) {
      await this.logout()
      return Promise.reject(error)
    } finally {
      this.$storage._DecreaseTrend()
    }
  }

  /**
   * logout user
   */
  public async logout<TMutation = any, TVariables = any> (data: TVariables = null): Promise<LogoutResult<TMutation> | null> {
    const apollo = this.ctx.app.apolloProvider.defaultClient
    try {
      this.$storage._IncreaseTrend()
      let res = null
      this._debugger.info('logging out ...')

      if (this.options.strategies.local && this.options.strategies.local.endpoints.logout) {
        res = await apollo.mutate<TMutation, TVariables>({
          mutation: this.options.strategies.local.endpoints.logout.mutation,
          variables: {
            ...data
          }
        })
      }

      await this.ctx.$apolloHelpers.onLogout(apollo)

      this.$storage.RemoveUserAndTokenState()

      this._debugger.success('logged out.')

      if (this.options.redirect.logout) {
        this.ctx.redirect(this.options.redirect.logout)
      }

      return Promise.resolve({ response: res } || null)
    } catch (error) {
      return Promise.reject(error)
    } finally {
      this.$storage._DecreaseTrend()
    }
  }

  public async getToken<TMutation = any, TVariables = any> (data: TVariables): Promise<TokenResult<TMutation>> {
    try {
      this.$storage._IncreaseTrend()
      const apollo = this.ctx.app.apolloProvider.defaultClient

      this._debugger.info('Trying to fetch Token ...')

      const local = this.options.strategies.local
      if (local === false) {
        return
      }
      const loginOptions = local.endpoints.login
      if (loginOptions === false) {
        return
      }

      const response = await apollo.mutate<TMutation, TVariables>({
        mutation: loginOptions.mutation,
        variables: { ...data }
      })

      this._debugger.success('Fetching Token was successful | Resposne => ', response)

      const token = this._helpers.tokenExtraction(response)
      return Promise.resolve({ token, response })
    } catch (error) {
      return Promise.reject(error)
    } finally {
      this.$storage._DecreaseTrend()
    }
  }

  public async getUser<TQuery = any, TUser = any> (): Promise<UserResult<TQuery, TUser>> {
    this.$storage._IncreaseTrend()
    const apollo = this.ctx.app.apolloProvider.defaultClient

    try {
      this._debugger.info('Trying to fetch User ...')
      const local = this.options.strategies.local
      if (local === false) {
        return
      }
      const UserOptions = local.endpoints.user
      if (UserOptions === false) {
        return
      }
      const response = await apollo.query<TQuery>({
        query: UserOptions.query
      })

      this._debugger.success('Fetching User was successful | Resposne => ', response)

      const user = this._helpers.userExtraction(response.data as unknown as object)
      return Promise.resolve({ user: user as TUser | null, response })
    } catch (error) {
      return Promise.reject(error)
    } finally {
      this.$storage._DecreaseTrend()
    }
  }

  // based on @nuxtjs/auth hasScope
  hasScope (scope: string): boolean {
    const userScopes = this.$storage.user && this._helpers.getProp(this.$storage.user, this.options.scopeKey)

    if (!userScopes) {
      return false
    }

    if (Array.isArray(userScopes)) {
      return userScopes.includes(scope)
    }

    return Boolean(this._helpers.getProp(userScopes, scope))
  }

  private async init (): Promise<void> {
    if (!this.ctx.$apolloHelpers) {
      consola.error('[QAUTH] add the @nuxtjs/apollo module to nuxt.config file')
      return
    }

    const token = this.ctx.$apolloHelpers.getToken()
    if (token) {
      const { user } = await this.getUser()
      this.$storage.SetUserAndTokenState(user, token)
    }
  }
}
