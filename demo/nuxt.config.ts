import { NuxtConfig } from "@nuxt/types";
import gql from 'graphql-tag'
export default <NuxtConfig>{
    // router: {
    //     middleware: ['qAuth']
    // },
    serverMiddleware: ['~/api/auth'],
    head: {
        title: 'demo',
        link: [
        ],
        script: [

        ]
    },
    modules: [
        '@nuxtjs/apollo', '../dist/module'
    ],
    apollo: {
        clientConfigs: {
            default: {
                httpEndpoint: 'http://localhost:4000/'
            }
        }
    },
    qAuth: {
        scopeKey: 'roles',
        strategies: {
            local: {
                endpoints: {
                    login: {
                        mutation: gql`mutation login($data:LoginInput!) { login(data: $data){ token } } `
                    },
                    user: {
                        query: gql`query me { me{ user{ id name roles } } }`
                    }, 
                    logout: {
                        mutation: gql`mutation logout($data:LogoutInput!){
                            logout(data:$data){
                              time
                            }
                          }`
                    }
                }
            }
        }
    },
    buildModules: [
        '@nuxt/typescript-build',
        '@nuxtjs/vuetify'
    ],
    vuetify: {
        theme: {
            dark: true
        }
    },
    components: [
        {
            path: './components',
            pathPrefix: false
        }
    ]
}