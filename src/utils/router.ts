import { Route } from '../types'

export const routeOption = (route: Route, key: string, value: boolean): boolean => {
  return route.matched.some((m) => {
    if (process.client) {
      // * client
      return Object.values(m.components).some(component => component.options && component.options[key] === value)
    } else {
      // * server
      return Object.values(m.components).some(component => Object.values(component._Ctor).some(ctor => ctor.options && ctor.options[key] === value))
    }
  })
}
