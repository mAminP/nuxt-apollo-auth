import { Plugin } from '@nuxt/types'
import {Auth, ModuleOptions } from './../'
// get the options out using lodash templates
const options:ModuleOptions = JSON.parse('<%= JSON.stringify(options) %>')

const AuthPlugin:Plugin = function (ctx, inject) {
  inject('qAuth', new Auth(ctx, options))
}

export default AuthPlugin
