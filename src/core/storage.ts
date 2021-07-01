import { Context } from '@nuxt/types'
import consola from 'consola'
import { Module } from 'vuex'
import { ModuleOptions } from '../Options'
import { IqAuthState } from '../types'

export class Storage {
    private _useVuex: boolean = false
    private readonly ctx: Context
    private readonly options: ModuleOptions
    constructor (ctx: Context, options: ModuleOptions) {
      this.ctx = ctx
      this.options = options
      this._vuexStoreInit()
    }

    public get loggedIn (): boolean {
      return this.ctx.store.getters[`${this.options.vuex.namespace}/loggedIn`]
    }

    public get busy (): boolean {
      return this.ctx.store.getters[`${this.options.vuex.namespace}/busy`]
    }

    public get user (): object | undefined {
      return this.ctx.store.getters[`${this.options.vuex.namespace}/user`]
    }

    public SetState (key: string, value: any):void {
      this.ctx.store.commit(`${this.options.vuex.namespace}/SET`, { key, value })
    }

    public GetState (key: string):any| undefined {
      return this.ctx.store.state[this.options.vuex.namespace][key]
    }

    public RemoveState (key: string):void {
      this.ctx.store.commit(`${this.options.vuex.namespace}/SET`, { key, undefined })
    }

    public SetUserAndTokenState (user:any, token:any):void {
      this.SetState('user', user)
      this.SetState('token', token)
    }

    public RemoveUserAndTokenState ():void {
      this.RemoveState('user')
      this.RemoveState('token')
    }

    public _IncreaseTrend () :void {
      const count: number| undefined = this.GetState('process')
      if (count) {
        this.SetState('process', count + 1)
      } else {
        this.SetState('process', 1)
      }
    }

    public _DecreaseTrend () :void {
      const count: number| undefined = this.GetState('process')
      if (count) {
        if (count > 0) {
          this.SetState('process', count - 1)
          if (count - 1 === 0) {
            delete this.ctx.store.state[this.options.vuex.namespace].process
          }
        }
      }
    }

    private _vuexStoreInit ():void {
      this._useVuex = !!this.ctx.store
      if (this._useVuex) {
        const storeModule: Module<IqAuthState, any> = {
          namespaced: true,
          state: () => ({
            token: undefined,
            user: undefined
          }),
          mutations: {
            SET (state, payload: {key:string, value: any}) {
              state[payload.key] = payload.value
            }
          },
          getters: {
            loggedIn: (state): boolean => (!!state.token && !!state.user),
            user: (state): object | undefined => (state.user),
            // @ts-ignore
            busy: (state): boolean => (!!(state.process && state.process > 0))
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
