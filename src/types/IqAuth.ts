import { LoginResult } from './types'

export interface IqAuth {
    get busy(): boolean
    /**
    * Returns whether the user is logged in or not?!
    * @returns boolean
    * @beta
    */
    get loggedIn(): boolean
    /**
    * Returns user if logged in
    * @returns object | undefined
    * @beta
    */
    get user(): any
    /**
    * login user
    */
    login<
        TMutation = any,
        TVariables = any,
        TQuery = any,
        TUser = any>(
            loginMutationVariables: TVariables
        ): Promise<LoginResult<TMutation, TQuery, TUser>>
}
