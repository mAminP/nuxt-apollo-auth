import { Plugin } from '@nuxt/types'
import qAuthModule from './modules/qAuth'
import { ModuleOptions } from './../Options'

// get the options out using lodash templates
const options:ModuleOptions = JSON.parse('<%= JSON.stringify(options) %>')
const StorePlugin:Plugin = function ({ store }) {
  store.registerModule(
    options.vuex.namespace,
    qAuthModule(options),
    { preserveState: Boolean(store.state[options.vuex.namespace]) })
}

export default StorePlugin
