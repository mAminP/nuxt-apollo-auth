import { Context } from "@nuxt/types"
import consola from 'consola'
import { ModuleOptions } from '../Options'
import { Module } from 'vuex'
import { IqAuthState } from "../types"

export class Storage {
    private _useVuex: boolean = false
    private readonly ctx: Context
    private readonly options: ModuleOptions
    constructor(ctx: Context,options: ModuleOptions) {
        this.ctx = ctx;
        this.options = options;
        this._vuexStoreInit()
     
    }
    public get loggedIn():boolean{
        return this.ctx.store.getters[`${this.options.vuex.namespace}/loggedIn`]
    }
    public get user():object| undefined{
        return this.ctx.store.getters[`${this.options.vuex.namespace}/user`]
    }
    public SetUserAndToken (user:any, token:string) {
        this.ctx.store.commit(`${this.options.vuex.namespace}/SET`, { user, token })
      }
  
      public RemoveUserAndToken () {
        this.ctx.store.commit(`${this.options.vuex.namespace}/SET`, { user: undefined, token: undefined })
      }
  
    private _vuexStoreInit() {
        this._useVuex = !!this.ctx.store
        if (this._useVuex) {
            const storeModule: Module<IqAuthState, any> = {
                namespaced:true,
                state: () => ({
                    token: undefined,
                    user: undefined
                }),mutations: {
                    SET (state, payload: IqAuthState) {
                      state.token = payload.token
                      state.user = payload.user
                    }
                  },
                  getters: {
                    loggedIn: (state): boolean => (!!state.token && !!state.user),
                    user: (state): object| undefined => (state.user)
                  }
            }
            this.ctx.store.registerModule(this.options.vuex.namespace, storeModule, {
                preserveState: Boolean(this.ctx.store.state[this.options.vuex.namespace])
            })
        } else {
            // eslint-disable-next-line no-console
            consola.warn(
                '[QAUTH] The Vuex Store is not activated. This might cause issues in qAuth module behavior, like redirects not working properly.' +
                'To activate it, see https://nuxtjs.org/docs/2.x/directory-structure/store'
            )
        }
    }
}