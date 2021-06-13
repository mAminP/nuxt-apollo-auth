## ⚠ This package is under development ⚠
# Setup

- [Installation](#Installation)
- [Using with TypeScript](#Using-with-TypeScript)

## Installation

 Add `nuxt-apollo-auth` and `@nuxtjs/apollo` dependencies to your project:

 ```
 npm install -S nuxt-apollo-auth @nuxtjs/apollo
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
