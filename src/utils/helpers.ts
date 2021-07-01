import consola from 'consola'
import { ModuleOptions } from './../Options'
import { Debugger } from './debugger'
import { LocalStrategy } from './../types/strategy'
export class Helpers {
  private readonly _options: ModuleOptions
  private readonly _debugger: Debugger
  constructor (options: ModuleOptions, appDebugger: Debugger) {
    this._options = options
    this._debugger = appDebugger
  }

  public userExtraction<TUser> (object: object): TUser | null {
    try {
      this._debugger.info('Trying to automatically extract user')
      const jsonStr: string = JSON.stringify(object)
      const includesUser = jsonStr.includes((this._options.strategies.local as LocalStrategy).user.property)
      if (includesUser) {
        this._debugger.info('The user inside the object was identified. Extracting ...')
        const indexOfUser = jsonStr.indexOf((this._options.strategies.local as LocalStrategy).user.property)
        let continues = 0
        let finalUser = ''
        for (let i = indexOfUser + (this._options.strategies.local as LocalStrategy).user.property.length + 2; i < jsonStr.length; i++) {
          const element = jsonStr[i]
          if (element.includes('{')) {
            continues++
          }
          finalUser += `${element}`
          if (element.includes('}')) {
            continues--
          }
          if (continues < 1) {
            break
          }
        }
        const user = JSON.parse(finalUser)
        this._debugger.success('Automatic user extraction was successful| ', 'user =>', user)
        return user
      } else {
        this._debugger.warn('The User inside the object was not detected!!!')
        throw new Error('faild')
      }
    } catch (error) {
      consola.error('User not detected!\n',
        `Make sure The "qAuth.strategies.local.user.property" in The nuxt.config points to the correct User key.\n it points to "${(this._options.strategies.local as LocalStrategy).user.property}" now`)
      return null
    }
  }

  public tokenExtraction (object: object): string | null {
    try {
      this._debugger.info('Trying to automatically extract token')
      const jsonStr: string = JSON.stringify(object)
      const includesToken = jsonStr.includes((this._options.strategies.local as LocalStrategy).token.property)
      if (includesToken) {
        this._debugger.info('The token inside the object was identified. Extracting ...')
        const splitedArr = jsonStr.split('"')
        const indexOfToken = splitedArr.indexOf((this._options.strategies.local as LocalStrategy).token.property)
        const token = splitedArr[indexOfToken + 2]
        this._debugger.success('Automatic token extraction was successful| ', 'token =>', token)
        return token
      } else {
        this._debugger.warn('The Token inside the object was not detected!!!')
        throw new Error('faild')
      }
    } catch (error) {
      consola.error('Token not detected!\n',
        `Make sure The "qAuth.strategies.local.token.property" in The nuxt.config points to the correct Token key.\n it points to "${(this._options.strategies.local as LocalStrategy).token.property}" now`)
      return null
    }
  }

  public checkModuleOptionsForInitializeModule (): void {
    /* istanbul ignore next */
    if (process.env.NODE_ENV !== 'development') {
      this._options.debug = false
    }

    this._debugger.info('[QAUTH] debug is Enable')

    if (!this._options.strategies.local) {
      throw new Error('[QAUTH] strategies is not defined. | path => qAuth.strategies.local')
    }
    if (!this._options.strategies.local.endpoints.login) {
      throw new Error('[QAUTH] login endpoints is not defined. | path => qAuth.strategies.local.endpoints.login')
    }
    if (this._options.strategies.local.endpoints.login.mutation.kind !== 'Document') {
      throw new Error('[QAUTH] login mutation is not defined. | path => qAuth.strategies.local.endpoints.login.mutation')
    }
    if (!this._options.strategies.local.endpoints.user) {
      throw new Error('[QAUTH] user endpoints is not defined. | path => qAuth.strategies.local.endpoints.user')
    }
    if (this._options.strategies.local.endpoints.user.query.kind !== 'Document') {
      throw new Error('[QAUTH] user query is not defined. | path => qAuth.strategies.local.endpoints.user.query')
    }
  }

  /**
   * Get property defined by dot notation in string.
   * Based on  https://github.com/dy/dotprop (MIT)
   *
   * @param  {Object} holder   Target object where to look property up
   * @param  {string} propName Dot notation, like 'this.a.b.c'
   * @return {*}          A property value
   */
  public getProp (holder: Record<string, any>, propName: string | false): unknown {
    if (!propName || !holder || typeof holder !== 'object') {
      return holder
    }

    if (propName in holder) {
      return holder[propName]
    }

    const propParts =
      Array.isArray(propName)
        ? propName
        : (propName + '').split('.')

    let result: unknown = holder
    while (propParts.length && result) {
      result = result[propParts.shift()]
    }

    return result
  }
}
