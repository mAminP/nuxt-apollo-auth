import { DocumentNode } from 'apollo-link';
import { Context } from '@nuxt/types';
import { FetchResult } from 'apollo-link/lib/types';

interface ModuleOptions {
    enable: boolean;
    vuex: {
        namespace: string;
    };
    local: {
        loginMutation: DocumentNode | undefined;
        tokenProperty: string;
        userQuery: DocumentNode | undefined;
        userProperty: string;
    };
    debug: boolean;
}
declare const moduleDefaults: ModuleOptions;

declare class Helpers {
    private readonly _options;
    constructor(options: ModuleOptions);
    _userExtraction<TUser>(object: object): TUser | null;
    _tokenExtraction(object: object): string | null;
    _checkModuleOptionsForInitializeModule(): void;
}

declare class State {
    private readonly context;
    private readonly options;
    constructor(context: Context, options: ModuleOptions);
    get loggedIn(): boolean;
    SetUserAndToken(user: any, token: string): void;
    RemoveUserAndToken(): void;
}

declare type TokenResult<TMutete = any> = {
    token: string | null;
    response: FetchResult<TMutete, Record<string, any>, Record<string, any>> | null;
};
declare type UserResult<TQuery = any, TUser = any> = {
    user: TUser | null;
    response: FetchResult<TQuery, Record<string, any>, Record<string, any>> | null;
};
declare type LoginResult<TMutete = any, TQuery = any, TUser = any> = {
    token: string | null;
    tokenResponse: FetchResult<TMutete, Record<string, any>, Record<string, any>> | null;
    user: TUser | null;
    userResponse: FetchResult<TQuery, Record<string, any>, Record<string, any>> | null;
};
declare type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[] ? RecursivePartial<U>[] : RecursivePartial<T[P]>;
};

declare class Auth {
    private readonly context;
    private readonly options;
    private readonly _state;
    private readonly _helpers;
    constructor(context: Context, options: ModuleOptions);
    get loggedIn(): boolean;
    login<TMutete = any, TVariables = any, TQuery = any, TUser = any>(data: TVariables): Promise<LoginResult<TMutete, TQuery, TUser>>;
    getToken<TMutete = any, TVariables = any>(data: TVariables): Promise<TokenResult<TMutete>>;
    getUser<TQuery = any, TUser = any>(): Promise<UserResult<TQuery, TUser>>;
}

export { Auth, Helpers, LoginResult, ModuleOptions, RecursivePartial, State, TokenResult, UserResult, moduleDefaults };
