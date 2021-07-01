import type { FetchResult } from 'apollo-link/lib/types'

export type IqAuthState = {
    token: string | undefined
    user: object | undefined
  }

export type TokenResult<TMutation = any> = {
    token: string | null
    response:FetchResult<TMutation, Record<string, any>, Record<string, any>> | null
}
export type LogoutResult<TMutation = any> = {
    response:FetchResult<TMutation, Record<string, any>, Record<string, any>> | null
}

export type UserResult<TQuery = any, TUser = any> = {
    user: TUser | null
    response:FetchResult<TQuery, Record<string, any>, Record<string, any>> | null
}
export type LoginResult<TMutation = any, TQuery = any, TUser = any> = {
    success:boolean,
    token:string| null,
    mutationResponse:FetchResult<TMutation, Record<string, any>, Record<string, any>> | null
    user: TUser| null,
    queryResponse:FetchResult<TQuery, Record<string, any>, Record<string, any>> | null

}
