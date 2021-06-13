> [!WARNING]
> 
>  **⚠ This package is under development ⚠**

# Setup
- [Setup](#setup)
  - [Installation](#installation)
  - [Using with TypeScript](#using-with-typescript)
- [Options](#options)

## Installation

 Add `nuxt-apollo-auth` and `@nuxtjs/apollo` dependencies to your project:

 ```
 npm install nuxt-apollo-auth @nuxtjs/apollo
 ```

 Then, add `nuxt-apollo-auth` and `@nuxtjs/apollo` to the modules section of nuxt.config.js:


 ```
 // nuxt.config.js

 {
  modules: [
    '@nuxtjs/apollo',
    'nuxt-apollo-auth'
  ],
  qAuth: {
    // Options
  }
}
 ```
 ## Using with TypeScript

 Add `nuxt-apollo-auth` to the compilerOptions.types section of your project's tsconfig.json file:

 ```
 // tsconfig.json

 {
  compilerOptions: {
    "types": [
      "nuxt-apollo-auth",
    ]
  },
} 
 ```

 # Options

| property              | required | type                          | default     | description                                                    |
|-----------------------|----------|-------------------------------|-------------|----------------------------------------------------------------|
| `enable`              | false    | `boolean`                     | `true`      | Enables or disables the module                                 |
| `vuex.namespace`      | false    | `string`                      | `'qAuth'`   | name of vuex module that store user object and token           |
| `local.loginMutation` | **true** | `DocumentNode` or `undefined` | `undefined` | GraphQL mutation to mutate data to server.                     |
| `local.tokenProperty` | false    | `string`                      | `'token'`   | Key to automatically extract token from loginMutation response |
| `local.userQuery`     | **true** | `DocumentNode` or `undefined` | `undefined` | GraphQL qurey to get user from server                          |
| `local.userProperty`  | false    | `string`                      | `'user'`    | Key to automatically extract user from userQuery response      |
| `debug`               | false    | `boolean`                     | `false`     | Enables or disables debug mode                                 |

