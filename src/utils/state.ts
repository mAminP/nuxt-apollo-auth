import { Context } from '@nuxt/types'
import { ModuleOptions } from './../Options'
export class State {
    private readonly context:Context
    private readonly options:ModuleOptions
    constructor (context:Context, options:ModuleOptions) {
      this.context = context
      this.options = options
    }

    public get loggedIn ():boolean {
      return this.context.store.getters[`${this.options.vuex.namespace}/loggedIn`]
    }

    public SetUserAndToken (user:any, token:string) {
      this.context.store.commit(`${this.options.vuex.namespace}/SET`, { user, token })
    }

    public RemoveUserAndToken () {
      this.context.store.commit(`${this.options.vuex.namespace}/SET`, { user: undefined, token: undefined })
    }
}
