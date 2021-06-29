---
title: qAuth
description: ''
position: 4
category: 'API'
---

This module globally injects `$qAuth` instance, meaning that you can access it anywhere using `this.$qAuth`. For plugins, asyncData, fetch, nuxtServerInit and Middleware, you can access it from `context.$qAuth`.

## properties

All properties are reactive. Meaning that you can safely use them in Vue template *`v-if`* conditions.

### `user`

This object contains details about authenticated user such as name. You can access it using either `$qAuth` or Vuex.

```js
// Access using $qAuth
this.$qAuth.user

// Access using vuex
this.$store.state.qAuth.user
```

### `loggedIn`

This boolean flag indicates that user is authenticated and available at the moment or not.

```js
// Access using $qAuth
this.$qAuth.loggedIn

// Access using vuex
this.$store.getters['qAuth/loggedIn']
```

## methods

### `login(loginMutationVariables)`

- Returns : `Promise`

<code-group>
  <code-block label="Javascript" active>

```js
   this.$qAuth.login({...loginMutationVariables})
     .then((result) => {
       if(result.success){
         this.$toast.success('Logged In!')
       }
     })
```

  </code-block>
  <code-block label="Typescript">

```ts
this.$qAuth.login<TMutation,TVariables,TQuery,TUser>(loginMutationVariables)
  .then((result) => { 
    if(result.success){
      this.$toast.success('Logged In!')
    }
  })

```

  </code-block>
</code-group>

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

### `logout()`

- Returns : `Promise`

```js
this.$qAuth.logout()
  .then(() => {
      this.$toast.success('Logged Out!')
  })
```

### `hasScope(scopeName)`

Check if user has a specific scope:

```js
// Returns is a computed boolean
this.$qAuth.hasScope('admin')
```
