import { trigger } from './effect'

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
export { createSetter }
