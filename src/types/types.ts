import type { FetchResult } from 'apollo-link/lib/types'
export type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[]
      ? RecursivePartial<U>[]
      : RecursivePartial<T[P]>
  }
export type IqAuthState = {
    token: string | undefined
    user: object | undefined
  }


export type TokenResult<TMutete = any> = {
    token: string | null
    response:FetchResult<TMutete, Record<string, any>, Record<string, any>> | null
}

export type UserResult<TQuery = any, TUser = any> = {
    user: TUser | null
    response:FetchResult<TQuery, Record<string, any>, Record<string, any>> | null
}
export type LoginResult<TMutete = any, TQuery = any, TUser = any> = {
    token:string| null,
    tokenResponse:FetchResult<TMutete, Record<string, any>, Record<string, any>> | null
    user: TUser| null,
    userResponse:FetchResult<TQuery, Record<string, any>, Record<string, any>> | null

}