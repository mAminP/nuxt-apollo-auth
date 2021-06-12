import consola from 'consola'
import { ModuleOptions } from './../Options'
export class Helpers {
  private readonly _options: ModuleOptions
  constructor (options:ModuleOptions) {
    this._options = options
  }

  public _userExtraction<TUser> (object:object):TUser| null {
    try {
      if (this._options.debug) { consola.info('Trying to automatically extract user') }
      const jsonStr:string = JSON.stringify(object)
      const includesUser = jsonStr.includes(this._options.local.userProperty)
      if (includesUser) {
        if (this._options.debug) { consola.info('The user inside the object was identified. Extracting ...') }
        const indexOfUser = jsonStr.indexOf(this._options.local.userProperty)
        let continues = 0
        let finalUser = ''
        for (let i = indexOfUser + this._options.local.userProperty.length + 2; i < jsonStr.length; i++) {
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
        if (this._options.debug) { consola.success('Automatic user extraction was successful| ', 'user =>', user) }
        return user
      } else {
        if (this._options.debug) { consola.warn('The User inside the object was not detected!!!') }
        throw new Error('faild')
      }
    } catch (error) {
      consola.error('User not detected!\n',
      `Make sure The "qAuth.local.userProperty" in The nuxt.config points to the correct User key.\n it points to "${this._options.local.userProperty}" now`)
      return null
    }
  }

  public _tokenExtraction (object:object):string| null {
    try {
      if (this._options.debug) { consola.info('Trying to automatically extract token') }
      const jsonStr:string = JSON.stringify(object)
      const includesToken = jsonStr.includes(this._options.local.tokenProperty)
      if (includesToken) {
        if (this._options.debug) { consola.info('The token inside the object was identified. Extracting ...') }
        const splitedArr = jsonStr.split('"')
        const indexOfToken = splitedArr.indexOf(this._options.local.tokenProperty)
        const token = splitedArr[indexOfToken + 2]
        if (this._options.debug) { consola.success('Automatic token extraction was successful| ', 'token =>', token) }
        return token
      } else {
        if (this._options.debug) { consola.warn('The Token inside the object was not detected!!!') }
        throw new Error('faild')
      }
    } catch (error) {
      consola.error('Token not detected!\n',
      `Make sure The "qAuth.local.tokenProperty" in The nuxt.config points to the correct Token key.\n it points to "${this._options.local.tokenProperty}" now`)
      return null
    }
  }

  public _checkModuleOptionsForInitializeModule ():void {
    if (this._options.debug) {
      consola.info('[QAUTH] debug is Enable')
    }
    if (this._options.local.loginMutation === undefined) {
      throw new Error('[QAUTH] loginMutation is not defined. | path => qAuth.local.loginMutation')
    }
    if (this._options.local.userQuery === undefined) {
      throw new Error('[QAUTH] userQuery is not defined. | path => qAuth.local.userQuery')
    }
  }
}
