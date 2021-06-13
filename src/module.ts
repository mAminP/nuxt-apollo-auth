import 'vue'
import '@nuxt/types'
import { resolve, join } from 'path'
import { readdirSync } from 'fs'
import type { Module } from '@nuxt/types'
import defu from 'defu'
import {Helpers} from "."
import {ModuleOptions , moduleDefaults} from './runtime'

const AuthModule:Module<ModuleOptions> = function (moduleOptions) {
  const options: ModuleOptions = defu(moduleOptions, this.options.qAuth!, moduleDefaults)

  if (!options.enable) {
    return
  }

  const helper = new Helpers(options)
  helper._checkModuleOptionsForInitializeModule()


    // Add plugin
    const { dst } = this.addTemplate({
      src: resolve(__dirname, '../templates/plugin.js'),
      fileName: join('qAuth.js'),
      options
    })
    this.options.plugins.push(resolve(this.options.buildDir, dst))

     // Transpile and alias auth src
  const runtime = resolve(__dirname, 'runtime')
  this.options.alias['~qAuth/runtime'] = runtime
  this.options.build.transpile.push(__dirname)
}

export default AuthModule

// Todo
// REQUIRED if publishing the module as npm package
//module.exports.meta = require('../package.json')
