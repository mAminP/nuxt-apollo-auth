import { gql } from 'graphql-tag'

export abstract class UserQ {
  public static users = gql`
     query users{
      accounts{
        id
        name
        email
        password
      }
    }
    `
  public static me = gql`
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
export abstract class UserM {
  public static login = gql`
   mutation login($data:LoginInput!) {
     login(data:$data){
       token
     }
   }
    `
     public static logout = gql`
     mutation logout($data:LogoutInput!){
      logout(data:$data){
        time
      }
    }`
}
