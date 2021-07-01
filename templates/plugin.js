import Middleware from './middleware'
import { qAuth, qAuthMiddleware } from '~qAuth/runtime'

Middleware.qAuth = qAuthMiddleware

const options = JSON.parse('<%= JSON.stringify(options) %>')

const AuthPlugin = async function (ctx, inject) {
  // eslint-disable-next-line new-cap
  const $qAuth = new qAuth(ctx, options)
  inject('qAuth', $qAuth)
  ctx.$qAuth = $qAuth

  await ctx.$qAuth.init()
}

export default AuthPlugin
