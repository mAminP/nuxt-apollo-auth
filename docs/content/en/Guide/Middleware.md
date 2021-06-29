---
title: Middleware
description: ''
position: 3
category: Guide
---

You can enable `qAuth` middleware either globally or per route. When this middleware is enabled on a route and `loggedIn` is `false` user will be redirected to `redirect.login` route. (`/login` by default)

Setting per route:

```js
export default {
  middleware: 'qAuth'
}

```

Globally setting in `nuxt.config.js`:

```js[nuxt.config.js]
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
