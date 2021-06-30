import { moduleDefaults, ModuleOptions } from '../../src/Options';
import { Helpers } from '../../src/utils/helpers';
import consola from 'consola'
import gql from 'graphql-tag';
import { Debugger } from '../../src/utils/debugger';
const options: ModuleOptions = moduleDefaults

let helper = new Helpers(options, new Debugger(options))
const consolaErrorSpy = jest.spyOn(consola, 'error').mockImplementation()
const obj1 = {
    user: {
        id: 1,
        scope: 'admin'
    },
    s: {
        domy: "domy"
    },
    some1: {
        token: "our-token"
    },
    some2: {
        user: {
            id: 2
        },
        token: "blah-blah"
    }
}
const obj2 = {
    s: {
        domy: "domy"
    },
    some1: {
        s: {
            domy: "domy",
            s: {
                user: {
                    id: 1
                },
                domy: "domy",
                token: "our-token"
            },
        },
        user: {
            id: 2
        }
    },
    some2: {
        token: "blah-blah"
    }
}
const obj3 = {
    s: {
        domy: "domy"
    },
    some1: {
        s: {
            domy: "domy",
            s: {
                domy: "domy",
            },
        },
    },
    some2: {
        notToken: "blah-blah"
    }
}
const DocumentNodeInstance = gql`
query{
    me
}
`
beforeEach(() => {
    consolaErrorSpy.mockClear()
})

afterEach(() => {
    helper = new Helpers(options, new Debugger(options))
})
describe("Helpers class", () => {

    describe("tokenExtraction", () => {
        it('should Extrac token', () => {
            expect(helper.tokenExtraction(obj1)).toBe(obj1.some1.token);
            expect(helper.tokenExtraction(obj2)).toBe(obj2.some1.s.s.token);
        });
        it('should not Extrac token', () => {
            expect(helper.tokenExtraction(obj1)).not.toBe(obj1.some2.token);
            expect(helper.tokenExtraction(obj2)).not.toBe(obj2.some2.token);
        });
        it('should return null if not found', () => {
            expect(helper.tokenExtraction(obj3)).toBeNull();
            expect(consola.error).toBeCalledTimes(1);
        });
    })

    describe("userExtraction", () => {
        it('should Extrac user', () => {
            expect(helper.userExtraction(obj1)).toEqual(obj1.user);
            expect(helper.userExtraction(obj2)).toEqual(obj2.some1.s.s.user);
        });
        it('should not Extrac user', () => {
            expect(helper.userExtraction(obj1)).not.toEqual(obj1.some2.user);
            expect(helper.userExtraction(obj2)).not.toEqual(obj2.some1.user);
        });
        it('should return null if not found', () => {
            expect(helper.userExtraction(obj3)).toBeNull();
            expect(consola.error).toBeCalledTimes(1);
        });
    })


    describe("checkModuleOptionsForInitializeModule", () => {

        it("should throw Error if login === false ", () => {
            options.strategies.local = false
            expect(() => helper.checkModuleOptionsForInitializeModule()).toThrowError();
        })
        it("should throw Error if  login endpoints === false", () => {
            options.strategies.local = {
                token: {
                    property: 'token'
                },
                user: {
                    property: 'user'
                },
                endpoints: {
                    login: false,
                    user: false,
                    logout: false,
                }
            }
            expect(() => helper.checkModuleOptionsForInitializeModule()).toThrowError();
        })
        it("should throw Error if  login mutation !== typeof DocumentNode", () => {
            options.strategies.local = {
                endpoints: {
                    login: false,
                    user: {
                        query: gql`query{me}`
                    },
                    logout: false
                },
                user: {
                    property: 'user'
                },
                token: {
                    property: ' token'
                }
            }
            expect(() => helper.checkModuleOptionsForInitializeModule()).toThrowError();
        })
        it("should throw Error user endpoints === false", () => {
            options.strategies.local = {
                endpoints: {
                    login: {
                        mutation: gql`mutation{me}`
                    },
                    user: false,
                    logout: false
                },
                user: {
                    property: 'user'
                },
                token: {
                    property: 'token'
                }
            }
            expect(() => helper.checkModuleOptionsForInitializeModule()).toThrowError();
        })
        it("should throw Error if  user query !== typeof DocumentNode", () => {
            options.strategies.local = {
                endpoints: {
                    login: {
                        mutation: gql`mutation{me}`
                    },
                    user: false,
                    logout: false
                },
                user: {
                    property: 'user'
                },
                token: {
                    property: ' token'
                }
            }
            expect(() => helper.checkModuleOptionsForInitializeModule()).toThrowError();
        })
        it("should not throw Error if  login mutation == typeof DocumentNode", () => {
            options.strategies.local = {
                endpoints: {
                    login: {
                        mutation: gql`mutation{me}`
                    },
                    user: {
                        query:gql`query{me}`
                    },
                    logout: false
                },
                user: {
                    property: 'user'
                },
                token: {
                    property: ' token'
                }
            }
            expect(() => helper.checkModuleOptionsForInitializeModule()).not.toThrowError();
        })
        it("should not throw Error if  user query == typeof DocumentNode", () => {
            options.strategies.local = {
                endpoints: {
                    login: {
                        mutation: gql`mutation{me}`
                    },
                    user: {
                        query:gql`query{me}`
                    },
                    logout: false
                },
                user: {
                    property: 'user'
                },
                token: {
                    property: ' token'
                }
            }
            expect(() => helper.checkModuleOptionsForInitializeModule()).not.toThrowError();
        })
        it("should not throw Error if evrything is ok", () => {
            expect(() => helper.checkModuleOptionsForInitializeModule()).not.toThrowError();
        })
    })


    describe("getProp", () => {
        it("should return value", () => {
            expect(helper.getProp(obj1.user, options.scopeKey)).toBe(obj1.user.scope);
        })
        it("should return false if scope is not curect", () => {
            expect(helper.getProp(obj1.user, 'nothing')).toBeFalsy();
        })
        it("should return header if prop is fasle", () => {
            expect(helper.getProp(obj1.user, false)).toEqual(obj1.user);
        })
        it("should return fasle if prop arr is not curect", () => {
            // @ts-ignore
            expect(helper.getProp(obj1.user, ['a', 'b'])).toBeFalsy();
            // @ts-ignore
            expect(helper.getProp(obj1.user, [options.scopeKey, 'b'])).toBeFalsy();
        })
        it("should return value if arr is curect", () => {
            // @ts-ignore
            expect(helper.getProp(obj1.user, [options.scopeKey])).toBe(obj1.user.scope);
        })
    })

})