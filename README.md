# Nuxt Apollo Auth

> **:warning::exclamation::warning:    WARNING    :warning::exclamation::warning:**
>
> **This package is under development**

----------

> 🙏 Thanks to the  [`@nuxtjs/auth`](https://auth.nuxtjs.org/) development team

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
        - [`hasScope(scopeName)`](#hasscopescopename)
    - [middleware](#middleware)
  - [Examples](#examples)
  - [TODO](#todo)

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

 > read `@nuxtjs/apollo` configuration at [this repo](https://github.com/nuxt-community/apollo-module)

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

- `enable`  
    type : `boolean`  
    required : `false`  
    default :

     ```js
      qAuth:{
        enable: true
      }
     ```  

- `debug`  
    type : `boolean`  
    required : `false`  
    default :

     ```js
      qAuth:{
        debug: false
      }
     ```

- `scopeKey`  
  type : `string`  
  required : `false`  
  default :

   ```js
    qAuth:{
      scopeKey: 'scope'
    }
   ```

- `vuex`  
  required : `false`  
  default :  

    ```js
    qAuth:{
        vuex:{
          namespace: 'qAuth'
        }
    }
    ```

  - `namespace`  
    type : `string`  
    required : `false`  
    default : `'qAuth'`  
- `strategies`  
  required : `true`  
  default :  

    ```js
    qAuth:{
        strategies: {
          local: {
            endpoints: {
              login: false,
              logout: false,
              user: false
            },
            user: {
              property: 'user'
            },
            token:{
              property:'token'
            }
          }
        }
    }
    ```

  - `local`  
        required : **`true`**  
    - `endpoints`  
        required : **`true`**  
        default :  

         ```js
         endpoints: {
           login: false,
           logout: false,
           user: false
         }
         ```

      - `login`  
        required : **`true`**  
        type : `{mutation: DocumentNode}` or `false`  
        default : `false`  
        It should be like the following :

        ```js
        login:{
          mutation: gql`
            mutation login($data:LoginInput!){
              login(data:$data){
                token
              }
            }
          `
        }
        ```

      - `user`  
       required : **`true`**  
       type : `{query: DocumentNode}` or `false`  
       default : `false`  
       It should be like the following :

        ```js
        user:{
          query: gql`
            query me{
              me{
                user
              }
            }
          `
        }
        ```

## Usage

### qAuth

This module globally injects `$qAuth` instance, meaning that you can access it anywhere using `this.$qAuth`. For plugins, asyncData, fetch, nuxtServerInit and Middleware, you can access it from `context.$qAuth`.

#### properties

All properties are reactive. Meaning that you can safely use them in Vue template *v-if* conditions.

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

##### `login(loginMutationVariables)`

- Returns : `Promise`

 javascript:

```js

this.$qAuth.login({...loginMutationVariables})
  .then((result) => { 
    if(result.success){
      this.$toast.success('Logged In!')
    }
  })

```

 typescript:

```ts

this.$qAuth.login<TMutation,TVariables,TQuery,TUser>(loginMutationVariables)
  .then((result) => { 
    if(result.success){
      this.$toast.success('Logged In!')
    }
  })

```

login result containing `{success, token, mutationResponse, user, queryResponse}` :

- `success`:  
   type : `boolean`  
   returns `true` if login successful.
- `token`:  
   type: `string` | `null`  
   returns `token` if `loginMutation` request successful.
- `mutationResponse`:  
   type: `FetchResult<TMutation, Record<string, any>, Record<string, any>>` | `null`  
   returns `loginMutation` response if request successful.
- `user`:  
   type: `object` | `null`  
   returns `user` object if `userQuery` request successful.
- `queryResponse`:  
   type: `FetchResult<TQuery, Record<string, any>, Record<string, any>>` | `null`  
   returns `userQuery` response if request successful.

 ----------

##### `logout()`

- Returns : `Promise`

```js
this.$qAuth.logout()
  .then(() => {
      this.$toast.success('Logged Out!')
  })
```

##### `hasScope(scopeName)`

Check if user has a specific scope:

```js
// Returns is a computed boolean
this.$qAuth.hasScope('admin')
```

### middleware

You can enable `qAuth` middleware either globally or per route. When this middleware is enabled on a route and `loggedIn` is `false` user will be redirected to `redirect.login` route. (`/login` by default)

Setting per route:

```js
export default {
  middleware: 'qAuth'
}

```

Globally setting in `nuxt.config.js`:

```js
// nuxt.config.js

router: {
  middleware: ['qAuth']
}
```

In case of global usage, You can set `qAuth` option to `false` in a specific component and the middleware will ignore that route.

```js
export default {
  qAuth: false
}
```

## Examples

- [basic example javascript](https://github.com/mAminP/nuxt-apollo-auth-example-javascript)
- [basic example typescript](https://github.com/mAminP/nuxt-apollo-auth-example-typescript)

## TODO

- [X] redirect
- [ ] new Docs
- [ ] E2E test
- [x] demo
- [x] basic example javascript
  - [X] middleware
- [X] basic example typescript
- [X] logout mutation
  