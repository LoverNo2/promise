import { isArray, isObject } from '../shared'
import { track, trigger } from './effect'
import { ReactiveFlags } from './flag'
import { reactive, readonly } from './reactive'

const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)
const readonlySet = createSetter(true)

function createGetter(isReadonly = false, isShallow = false) {
  return function get(target, key) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly
    }
    if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly
    }
    const res = Reflect.get(target, key)
    if (isObject(res) || isArray(res)) {
      if (isShallow) {
        return res
      }
      return isReadonly ? readonly(res) : reactive(res)
    }
    if (!isReadonly) {
      track(target, key)
    }
    return res
  }
}

function createSetter(isReadonly = false) {
  return function set(target, key, value) {
    if (isReadonly) {
      console.warn('只读对象不可设置')

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
  get: createGetter(false, true),
  set,
}

const shallowReadonlyHandler = {
  get: createGetter(true, true),
  set: readonlySet,
}

export { reactiveHandler, readonlyHandler, shallowReactiveHandler, shallowReadonlyHandler }
