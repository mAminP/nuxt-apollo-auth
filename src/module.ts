import { resolve, join } from 'path'
import { readdirSync } from 'fs'
import type { Module } from '@nuxt/types'
import defu from 'defu'
import { ModuleOptions, moduleDefaults } from './Options'

import 'vue'
import '@nuxt/types'
import { Helpers } from './utils'

const AuthModule:Module<ModuleOptions> = function (moduleOptions) {
//   const { nuxt } = this
  const options: ModuleOptions = defu(moduleOptions, this.options.qAuth!, moduleDefaults)

  if (!options.enable) {
    return
  }

  const helper = new Helpers(options)
  helper._checkModuleOptionsForInitializeModule()

  // add all of the initial plugins
  const pluginsToSync = [
    'store/index.ts',
    'plugins/index.ts'
  ]
  const foldersToSync: string[] = [
    'store/modules', 'core/', 'utils/'
  ]

  this.nuxt.hook('ready', () => {
    for (const pathString of pluginsToSync) {
      this.addPlugin({
        src: resolve(__dirname, pathString),
        fileName: join(options.vuex.namespace, pathString),
        options
      })
    }

    // sync all of the files and folders to revelant places in the nuxt build dir (.nuxt/)
    for (const pathString of foldersToSync) {
      const path = resolve(__dirname, pathString)
      for (const file of readdirSync(path)) {
        this.addTemplate({
          src: resolve(path, file),
          fileName: join(options.vuex.namespace, pathString, file),
          options
        })
      }
    }
  })
}

export default AuthModule

// REQUIRED if publishing the module as npm package
 module.exports.meta = require('./package.json')
