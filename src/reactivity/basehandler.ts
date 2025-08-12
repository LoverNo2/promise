import { isArray, isObject } from '../shared'
import { track, trigger } from './effect'
import { ReactiveFlags } from './flag'
import { isShallowReadonly, reactive, readonly } from './reactive'

const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)
const readonlySet = createSetter(true)
const shallowGet = createGetter(false, true)
const shallowReadonlyGet = createGetter(true, true)

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

function createSetter(isReadonly = false) {
  return function set(target, key, value) {
    if (isReadonly) {
      console.warn(`Set operation on key "${key}" failed: target is readonly.`, target)
      // Proxy规范要求返回布尔值
      return true
    }
    const res = Reflect.set(target, key, value)
    trigger(target, key)
    return res
  }
}

const reactiveHandler = {
  get,
  set,
}

const readonlyHandler = {
  get: readonlyGet,
  set: readonlySet,
}

const shallowReactiveHandler = {
  get: shallowGet,
  set,
}

const shallowReadonlyHandler = {
  get: shallowReadonlyGet,
  set: readonlySet,
}

export { reactiveHandler, readonlyHandler, shallowReactiveHandler, shallowReadonlyHandler }
