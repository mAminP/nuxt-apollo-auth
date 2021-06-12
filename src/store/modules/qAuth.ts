import { Module } from 'vuex'
import { ModuleOptions } from './../../Options'
interface IqAuthState {
  token: string | undefined
  user: object | undefined
}
export default (_options: ModuleOptions): Module<IqAuthState, any> => ({
  namespaced: true,
  state: () => ({
    token: undefined,
    user: undefined
  }),
  mutations: {
    SET (state, payload: IqAuthState) {
      state.token = payload.token
      state.user = payload.user
    }
  },
  getters: {
    loggedIn: (state): boolean => (!!state.token && !!state.user)
  }
})
