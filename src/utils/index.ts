export * from './helpers'
export * from './router'

/**
 * Get property defined by dot notation in string.
 * Based on  https://github.com/dy/dotprop (MIT)
 *
 * @param  {Object} holder   Target object where to look property up
 * @param  {string} propName Dot notation, like 'this.a.b.c'
 * @return {*}          A property value
 */
 export function getProp( holder: Record<string, any>, propName: string | false): unknown {
    if (!propName || !holder || typeof holder !== 'object') {
      return holder
    }
  
    if (propName in holder) {
      return holder[propName]
    }
  
    const propParts = Array.isArray(propName)? propName : (propName + '').split('.')
  
    let result: unknown = holder
    while (propParts.length && result) {
      result = result[propParts.shift()]
    }
  
    return result
  }