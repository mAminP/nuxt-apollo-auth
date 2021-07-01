---
title: options
description: ''
position: 5
category: 'API'
---

## `enable`

- type: `boolean`
- required: `false`
- default:

```js
qAuth:{
  enable: true
}
```  

## `debug`

- type: `boolean`  
- required: `false`  
- default:

```js
qAuth:{
  debug: false
}
```

## `scopeKey`

- type: `string`
- required: `false`
- default:

```js
qAuth:{
  scopeKey: 'scope'
}
```

## `vuex`

- required: `false`  
- default:
  
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

## `strategies`

- required: **`true`**
- default:  

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

### `strategies.local`  

- required: **`true`**  

#### `strategies.local.endpoints`  

- required: **`true`**
- default:

```js
endpoints: {
  login: false,
  logout: false,
  user: false
}
```

##### `strategies.local.endpoints.login`

- required: **`true`**
- type: `{mutation: DocumentNode}` or `false`
- default: `false`
It should be like the following :

```graphql
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

##### `strategies.local.endpoints.logout`

- required: `false`
- type: `{mutation: DocumentNode}` or `false`
- default: `false`
It can be like the following :

```graphql
logout:{
  mutation: gql`
    mutation logout($data:LogoutInput!){
      logout(data:$data){
        ...
      }
    }
  `
}
```

##### `strategies.local.endpoints.user`

- required : **`true`**  
- type : `{query: DocumentNode}` or `false`  
- default : `false`  
It should be like the following:

```graphql
user:{
  query: gql`
    query me{
      me{
        user{
            id
            name
            email
        }
      }
    }
  `
}
```

#### `strategies.local.user.property`

- required: `false`
- type : `string`
- default: `'user'`

#### `strategies.local.token.property`

- required: `false`
- type: `string`
- default: `'token'`

## `redirect`

- required: `false`  
- default:

```js
  redirect: {
    login: '/login',
    logout: '/'
  }
```

### `redirect.login`

- required: `false`
- type: `string`
- default: `'/login'`

### `redirect.logout`

- required: `false`
- type: `string`
- default: `'/'`
