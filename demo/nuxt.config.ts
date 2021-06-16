import { NuxtConfig } from "@nuxt/types";
import gql from 'graphql-tag'
export default <NuxtConfig>{
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
                httpEndpoint: 'any'
            }
        }
    },
    qAuth: {
        local: {
            loginMutation: gql`
            mutation login($req:LoginReqeust) {
                login(requset:$req){
                    errors{
                        code
                    }
                    entity{
                        token
                    }
                }
            }
            ` ,
            userProperty: 'entity',
            userQuery: gql`
            query user{
                user{
                    errors{
                        code
                    }
                    entity{
                        id
                    } 
                }
            }
            `
        }
    },
    buildModules: [
        '@nuxt/typescript-build',
        '@nuxtjs/vuetify'
    ],
    vuetify:{
        theme:{
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