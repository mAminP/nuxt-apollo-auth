import { DocumentNode } from 'apollo-link';

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
    scopeKey: string;
    redirect: {
        login: string | false;
        logout: string | false;
    };
}

declare class Debugger {
    private readonly _options;
    constructor(options: ModuleOptions);
    info(message: string, ...params: any): void;
    success(message: string, ...params: any): void;
    error(message: string, ...params: any): void;
    warn(message: string, ...params: any): void;
}

declare class Helpers {
    private readonly _options;
    private readonly _debugger;
    constructor(options: ModuleOptions, appDebugger: Debugger);
    userExtraction<TUser>(object: object): TUser | null;
    tokenExtraction(object: object): string | null;
    checkModuleOptionsForInitializeModule(): void;
    /**
     * Get property defined by dot notation in string.
     * Based on  https://github.com/dy/dotprop (MIT)
     *
     * @param  {Object} holder   Target object where to look property up
     * @param  {string} propName Dot notation, like 'this.a.b.c'
     * @return {*}          A property value
     */
    getProp(holder: Record<string, any>, propName: string | false): unknown;
}

interface VueComponent {
    options: object;
    _Ctor: VueComponent;
}
declare type MatchedRoute = {
    components: VueComponent[];
};
declare type Route = {
    matched: MatchedRoute[];
};

declare const routeOption: (route: Route, key: string, value: boolean) => boolean;

export { Debugger, Helpers, routeOption };
