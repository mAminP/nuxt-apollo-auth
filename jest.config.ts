import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  verbose: true,
  preset: '@nuxt/test-utils',
  collectCoverage: true,
  detectOpenHandles: true

}
export default config
