/* istanbul ignore file */
import authAPI from '../../demo/api/auth'
import qAuthModule from '../../dist/module'
import { gql } from 'graphql-tag';

export default {
    serverMiddleware: [authAPI],
    modules: ['@nuxtjs/apollo', qAuthModule],
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
}