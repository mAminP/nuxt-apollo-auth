import { NuxtConfig } from "@nuxt/types";
import gql from 'graphql-tag'
export default <NuxtConfig>{
    serverMiddleware: ['~/api/accounts', '~/api/auth'],
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
                httpEndpoint: 'http://localhost:4000/graphql/'
            }
        }
    },
    qAuth: {
        scopeKey: 'roles',
        local: {
            loginMutation: gql`
            mutation login($email:String!,$password:String!) {
              login(email:$email,password:$password)
            }
             ` ,
            tokenProperty: 'login',
            userProperty: 'viewer',
            userQuery: gql`
           query me {
             viewer{
                id
                name
                roles
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