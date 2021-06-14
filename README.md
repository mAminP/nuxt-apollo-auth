# Nuxt Apollo Auth

> **⚠⚠ WARNING ⚠⚠**
>
> **This package is under development**

- [Nuxt Apollo Auth](#nuxt-apollo-auth)
  - [Setup](#setup)
    - [Installation](#installation)
    - [Using with TypeScript](#using-with-typescript)
  - [Options](#options)
  - [Usage](#usage)
    - [qAuth](#qauth)
      - [properties](#properties)
        - [`user`](#user)
        - [`loggedIn`](#loggedin)
      - [methods](#methods)
        - [`login(loginMutationVariables)`](#loginloginmutationvariables)
        - [`logout()`](#logout)

## Setup

### Installation

----------

 Add `nuxt-apollo-auth` and `@nuxtjs/apollo` dependencies to your project:

```bash
 npm install nuxt-apollo-auth @nuxtjs/apollo
```

 Then, add `nuxt-apollo-auth` and `@nuxtjs/apollo` to the modules section of nuxt.config.js:

 ```js
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

### Using with TypeScript

----------

 Add `nuxt-apollo-auth` to the compilerOptions.types section of your project's tsconfig.json file:

```js
 // tsconfig.json

 {
  compilerOptions: {
    "types": [
      "nuxt-apollo-auth",
    ]
  },
} 
```

## Options

| property              | required | type                          | default     | description                                                    |
| --------------------- | -------- | ----------------------------- | ----------- | -------------------------------------------------------------- |
| `enable`              | false    | `boolean`                     | `true`      | Enables or disables the module                                 |
| `vuex.namespace`      | false    | `string`                      | `'qAuth'`   | name of vuex module that store user object and token           |
| `local.loginMutation` | **true** | `DocumentNode` or `undefined` | `undefined` | GraphQL mutation to mutate data to server.                     |
| `local.tokenProperty` | false    | `string`                      | `'token'`   | Key to automatically extract token from loginMutation response |
| `local.userQuery`     | **true** | `DocumentNode` or `undefined` | `undefined` | GraphQL qurey to get user from server                          |
| `local.userProperty`  | false    | `string`                      | `'user'`    | Key to automatically extract user from userQuery response      |
| `debug`               | false    | `boolean`                     | `false`     | Enables or disables debug mode                                 |

## Usage

### qAuth

This module globally injects `$qAuth` instance, meaning that you can access it anywhere using `this.$qAuth`. For plugins, asyncData, fetch, nuxtServerInit and Middleware, you can access it from `context.$qAuth`.

#### properties

All properties are reactive. Meaning that you can safely use them in Vue template *v-if* conditions.

----------

##### `user`

This object contains details about authenticated user such as name. You can access it using either `$qAuth` or Vuex.

```js
// Access using $qAuth
this.$qAuth.user

// Access using vuex
this.$store.state.qAuth.user
```

##### `loggedIn`

This boolean flag indicates that user is authenticated and available at the moment or not.

```js
// Access using $qAuth
this.$qAuth.loggedIn

// Access using vuex
this.$store.getters['qAuth/loggedIn']
```

#### methods

----------

##### `login(loginMutationVariables)`

- Returns : `Promise`

```js
this.$auth.login(/*{loginMutationVariables}*/)
  .then((res) => { //   res = { success , token , tokenResponse , user , userResponse }
    if(res.success){
      this.$toast.success('Logged In!')
    }
  })
```

##### `logout()`

- Returns : `Promise`

```js
this.$qAuth.logout()
  .then(() => {
      this.$toast.success('Logged Out!')
  })
```
