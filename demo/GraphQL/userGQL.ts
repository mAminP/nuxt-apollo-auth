import gql from "graphql-tag";

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
      viewer{
        id
        name
        roles
      }
    }
     `
}
export abstract class UserM {
  public static login = gql`
   mutation login($email:String!,$password:String!) {
     login(email:$email,password:$password)
   }
    `
}