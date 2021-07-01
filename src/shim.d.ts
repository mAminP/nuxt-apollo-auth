import 'vue'
import '@nuxt/types'
import { ModuleOptions, RecursivePartial, qAuth } from './runtime'
declare module '@nuxt/types' {
    interface Context { $qAuth : qAuth}
    interface NuxtAppOptions {$qAuth : qAuth }
    interface Configuration { qAuth?: RecursivePartial<ModuleOptions> }
  }

  declare module 'vue/types/vue' {
    interface Vue {$qAuth : qAuth }
  }

declare module 'vue/types/options' {
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  interface ComponentOptions<V> {
    qAuth?: true | false
  }
}

  declare module 'vuex/types/index' {
    // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
    interface Store<S> {$qAuth : qAuth }
  }
