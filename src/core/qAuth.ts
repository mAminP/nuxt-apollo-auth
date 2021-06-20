import { ModuleOptions } from "../Options";
import { Storage } from "./storage";
import { LoginResult, TokenResult, UserResult } from '../types';
import { Context } from "@nuxt/types";
import { Debugger, Helpers } from '../utils';
import consola from 'consola'
export class qAuth {
    private readonly ctx: Context;
    public  options: ModuleOptions;
    private readonly _helpers: Helpers
    private readonly _debugger: Debugger
    public $storage: Storage

    constructor(ctx: Context, options: ModuleOptions) {
        this.ctx = ctx;
        this.options = options;
        const storage = new Storage(ctx, options)
        this.$storage = storage
        this._debugger = new Debugger(options)
        this._helpers = new Helpers(options, this._debugger);
    }
    
    /**
     * Returns whether the user is logged in or not?!
     * @returns boolean
     * @beta
     */
    get loggedIn(): boolean {
        return this.$storage.loggedIn
    }
    /**
        * Returns user if logged in
        * @returns object | undefined
        * @beta
        */
    get user(): any {
        return this.$storage.user as any
    }
    /**
     * login user
     */
    public async login<TMutation = any, TVariables = any, TQuery = any, TUser = any>(loginMutationVariables: TVariables):
        Promise<LoginResult<TMutation, TQuery, TUser>> {
        const client = this.ctx.app.apolloProvider.defaultClient
        try {
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
            this.$storage.SetState(user, token)
            return Promise.resolve({ success: true, token, mutationResponse, user, queryResponse })
        } catch (error) {
            await this.logout()
            return Promise.reject(error)
        }
    }

    /**
     * logout user
     */
    public async logout(): Promise<void> {
        const apollo = this.ctx.app.apolloProvider.defaultClient
        try {

            this._debugger.info('logging out ...')

            await this.ctx.$apolloHelpers.onLogout(apollo)

            this.$storage.SetState(undefined, undefined)

            this._debugger.success('logged out.')

            return Promise.resolve()

        } catch (error) {
            return Promise.reject(error)
        }
    }
    public async getToken<TMutation = any, TVariables = any>(data: TVariables): Promise<TokenResult<TMutation>> {
        try {
            const apollo = this.ctx.app.apolloProvider.defaultClient

            this._debugger.info('Trying to fetch Token ...')

            const response = await apollo.mutate<TMutation, TVariables>({
                mutation: this.options.local.loginMutation,
                variables: { ...data }
            })

            this._debugger.success('Fetching Token was successful | Resposne => ', response)

            const token = this._helpers.tokenExtraction(response)
            return Promise.resolve({ token, response })
        } catch (error) {
            return Promise.reject(error)
        }
    }

    public async getUser<TQuery = any, TUser = any>(): Promise<UserResult<TQuery, TUser>> {
        const apollo = this.ctx.app.apolloProvider.defaultClient

        try {
            this._debugger.info('Trying to fetch User ...')

            const response = await apollo.query<TQuery>({
                query: this.options.local.userQuery
            })

            this._debugger.success('Fetching User was successful | Resposne => ', response)

            const user = this._helpers.userExtraction(response.data as unknown as object)
            return Promise.resolve({ user: user as TUser | null, response })
        } catch (error) {
            return Promise.reject(error)
        }
    }

    // based on @nuxtjs/auth hasScope
    hasScope(scope: string): boolean {
        const userScopes = this.$storage.user && this._helpers.getProp(this.$storage.user, this.options.scopeKey)

        if (!userScopes) {
            return false
        }

        if (Array.isArray(userScopes)) {
            return userScopes.includes(scope)
        }

        return Boolean(this._helpers.getProp(userScopes, scope))
    }




    private async init(): Promise<void> {
        
        if (!this.ctx.$apolloHelpers) {
            consola.error('[QAUTH] add the @nuxtjs/apollo module to nuxt.config file')
            return
        }

        const token = this.ctx.$apolloHelpers.getToken()
        if (token) {
            const { user } = await this.getUser()
            this.$storage.SetState(user, token)
        }


    }

}