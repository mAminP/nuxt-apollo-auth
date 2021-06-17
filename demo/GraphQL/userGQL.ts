import gql from "graphql-tag";

export abstract class UserQ {
    public static users = gql`
     query users{
          users {
            id
            userName
            email
            password
            __typename
          }
        }
    `
}