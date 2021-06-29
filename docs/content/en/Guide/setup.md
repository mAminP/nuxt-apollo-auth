---
title: Setup
description: ''
position: 2
category: Guide
---

- [Installation](#installation)
- [Using with TypeScript](#using-with-typescript)

<alert type="info">
Check the <a target="_blank" href="https://nuxtjs.org/guides/configuration-glossary/configuration-modules">Nuxt.js documentation</a>  for more information about installing and using modules in Nuxt.js.
</alert>

## Installation

Add `nuxt-apollo-auth` and `@nuxtjs/apollo` dependencies to your project:

<code-group>
  <code-block label="NPM" active>

  ```bash
   npm install nuxt-apollo-auth @nuxtjs/apollo
  ```

  </code-block>
</code-group>

 Then, add `nuxt-apollo-auth` and `@nuxtjs/apollo` to the modules section of nuxt.config.js:

 ```js[nuxt.config.js]
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

 Add `nuxt-apollo-auth` to the `compilerOptions.types` section of your project's `tsconfig.json` file:

```js[tsconfig.json]
 {
  compilerOptions: {
    "types": [
      "nuxt-apollo-auth",
      // "@nuxtjs/apollo",
      // "vue-apollo/types"
    ]
  },
} 
```
