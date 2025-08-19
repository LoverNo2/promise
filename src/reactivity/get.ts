import { isObject, isArray } from '../shared/utils'
import { track } from './effect'
import { ReactiveFlags } from './flag'
import { reactive, readonly } from './reactive'

function createGetter(isReadonly = false, isShallow = false) {
  return function get(target, key) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly
    } else if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly
    } else if (key === ReactiveFlags.IS_SHALLOW) {
      return isShallow
    } else if (key === ReactiveFlags.IS_SHALLOW_READONLY) {
      return isShallow && isReadonly
    } else if (key === ReactiveFlags.RAW) {
      return target
    }

    const res = Reflect.get(target, key)

    if (!isReadonly) {
      track(target, key)
    }
    if (!isShallow) {
      if (isObject(res) || isArray(res)) {
        return isReadonly ? readonly(res) : reactive(res)
      }
    }
    return res
  }
}

export { createGetter }
