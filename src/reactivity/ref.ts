import { trackEffect, triggerEffect } from './effect'
import { reactive } from './reactive'
import { hasChange, isObject } from '../shared'

class RefImlp {
  private _value
  private deps
  private _rawValue

  constructor(value) {
    this._rawValue = value

    this._value = convert(value)
    this.deps = new Set()
  }
  get value() {
    trackEffect(this.deps)
    return this._value
  }
  set value(newValue) {
    if (hasChange(this._rawValue, newValue)) {
      this._value = convert(newValue)
      this._rawValue = newValue
      triggerEffect(this.deps)
    }
  }
}
function ref(value) {
  return new RefImlp(value)
}
function convert(value) {
  return isObject(value) ? reactive(value) : value
}
function isRef(ref) {
  return ref instanceof RefImlp
}
function unRef(ref) {
  return isRef(ref) ? ref.value : ref
}

function proxyRefs(target) {
  return new Proxy(target, {
    get(target, key) {
      return unRef(target[key])
    },
    set(target, key, value) {
      if (isRef(target[key]) && !isRef(value)) {
        target[key].value = value
      } else {
        target[key] = value
      }
      return true
    },
  })
}

export { ref, isRef, unRef, proxyRefs }
