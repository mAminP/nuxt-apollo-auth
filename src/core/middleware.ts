import { Middleware, Context } from '@nuxt/types'
import { Route } from '../types'
import { routeOption } from '../utils'

export const qAuthMiddleware: Middleware = function (ctx: Context) {
  // Disable middleware if options: { qAuth: false } is set on the route
  if (routeOption((ctx.route as unknown) as Route, 'qAuth', false)) {
    return
  }

  const { login } = ctx.$qAuth.options.redirect
  if (!ctx.$qAuth.loggedIn) {
    return ctx.redirect(login as string)
  }
}
