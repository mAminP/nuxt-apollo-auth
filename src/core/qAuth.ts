import { ModuleOptions } from "../Options";
import { Storage } from "./storage";
import { LoginResult, TokenResult, UserResult } from '../types';
import { Context } from "@nuxt/types";
import { Helpers } from '../utils';
import consola from 'consola';
export class qAuth {
    private readonly ctx: Context;
    private readonly options: ModuleOptions;
    private readonly _helpers: Helpers
    public $storage: Storage

    constructor(ctx: Context, options: ModuleOptions) {
        this.ctx = ctx;
        this.options = options;
        const storage = new Storage(ctx, options)
        this.$storage = storage
        this._helpers = new Helpers(options);
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
        * @returns object
        * @beta
        */
    get user(): object | undefined {
        return this.$storage.user
    }
    /**
     * login user
     */
    public async login<TMutete = any, TVariables = any, TQuery = any, TUser = any>(loginMutationVariables: TVariables):
        Promise<LoginResult<TMutete, TQuery, TUser>> {
        const client = this.ctx.app.apolloProvider.defaultClient
        try {
            // grt token from server
            const { token, response: tokenResponse } = await this.getToken<TMutete, TVariables>(loginMutationVariables)
            if (!token) {
                return Promise.resolve({ success: false, token, tokenResponse, user: null, userResponse: null })
            }
            // set apollo cookie
            await this.ctx.$apolloHelpers.onLogin(token as string, client)
            // get user from server
            const { user, response: userResponse } = await this.getUser<TQuery, TUser>()
            if (!user) {
                await this.ctx.$apolloHelpers.onLogout(client)
                return Promise.resolve({ success: false, token, tokenResponse, user, userResponse })
            }
            // configure login in vuex
            this.$storage.SetUserAndToken(user, token)
            return Promise.resolve({ success: true, token, tokenResponse, user, userResponse })
        } catch (error) {
            await this.logout()
            return Promise.reject(error)
        }
    }

    /**
     * logout user
     */
    public async logout(): Promise<void> {
        const client = this.ctx.app.apolloProvider.defaultClient
        try {
            if (this.options.debug) {
                consola.info('logging out ...')
            }
            await this.ctx.$apolloHelpers.onLogout(client)
            this.$storage.SetUserAndToken(undefined, undefined)
            if (this.options.debug) {
                consola.success('logged out.')
            }
            return Promise.resolve()
        } catch (error) {
            return Promise.reject(error)
        }
    }
    public async getToken<TMutete = any, TVariables = any>(data: TVariables): Promise<TokenResult<TMutete>> {
        try {
            const client = this.ctx.app.apolloProvider.defaultClient
            if (this.options.debug) {
                consola.info('Trying to fetch Token ...')
            }
            const response = await client.mutate<TMutete, TVariables>({
                mutation: this.options.local.loginMutation,
                variables: { ...data }
            })
            if (this.options.debug) {
                consola.success('Fetching Token was successful | Resposne => ', response)
            }
            const token = this._helpers._tokenExtraction(response)
            return Promise.resolve({ token, response })
        } catch (error) {
            return Promise.reject(error)
        }
    }

    public async getUser<TQuery = any, TUser = any>(): Promise<UserResult<TQuery, TUser>> {
        const client = this.ctx.app.apolloProvider.defaultClient

        try {
            if (this.options.debug) { consola.info('Trying to fetch User ...') }

            const response = await client.query<TQuery>({
                query: this.options.local.userQuery
            })
            if (this.options.debug) { consola.success('Fetching User was successful | Resposne => ', response) }
            const user = this._helpers._userExtraction(response.data as unknown as object)
            return Promise.resolve({ user: user as TUser | null, response })
        } catch (error) {
            return Promise.reject(error)
        }
    }


    private init() {
    }

}