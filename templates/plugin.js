import { qAuth } from '~qAuth/runtime'
// get the options out using lodash templates
const options = JSON.parse('<%= JSON.stringify(options) %>')

const AuthPlugin = function (ctx, inject) {
    const $qAuth = new qAuth(ctx,options)
    inject('qAuth', $qAuth)
    ctx.$qAuth = $qAuth
    ctx.$qAuth.init()
}

export default AuthPlugin
