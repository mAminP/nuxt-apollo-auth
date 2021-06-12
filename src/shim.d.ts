import 'vue'
import '@nuxt/types'
import { Auth,RecursivePartial,ModuleOptions } from '.';
// interface IqAuthModel { $qAuth : Auth }
declare module '@nuxt/types' {
    interface Context { $qAuth : Auth}
    interface NuxtAppOptions {$qAuth : Auth }
    interface Configuration { qAuth?: RecursivePartial<ModuleOptions> }
  }

  declare module 'vue/types/vue' {
    interface Vue {$qAuth : Auth }
  }

// declare module 'vue/types/options' {
//   // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
//   interface ComponentOptions<V> {
//     qAuth?: true | false | 'guest'
//   }
// }

  declare module 'vuex/types/index' {
    // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
    interface Store<S> {$qAuth : Auth }
  }
