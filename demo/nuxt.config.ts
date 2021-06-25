import { NuxtConfig } from "@nuxt/types";
import gql from 'graphql-tag'
export default <NuxtConfig>{
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
        local: {
            loginMutation: gql`
            mutation login($data:LoginInput!) {
              login(data: $data){
                  token
              }
            }
             ` ,

            userQuery: gql`
           query me {
             me{
                user{
          id
          name
          roles
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