import { reactiveHandler, readonlyHandler, shallowReactiveHandler, shallowReadonlyHandler } from './basehandler'

import { ReactiveFlags } from './flag'

function reactive(raw) {
  return createReactiveObject(raw, reactiveHandler)
}

function readonly(raw) {
  return createReactiveObject(raw, readonlyHandler)
}

function shallowReactive(raw) {
  return createReactiveObject(raw, shallowReactiveHandler)
}

function shallowReadonly(raw) {
  return createReactiveObject(raw, shallowReadonlyHandler)
}

function createReactiveObject(raw, handler) {
  return new Proxy(raw, handler)
}

function isReactive(raw) {
  return !!raw[ReactiveFlags.IS_REACTIVE]
}

function isReadonly(raw) {
  return !!raw[ReactiveFlags.IS_READONLY]
}

function isShallow(raw) {
  return !!raw[ReactiveFlags.IS_SHALLOW]
}

function isShallowReadonly(raw) {
  return !!raw[ReactiveFlags.IS_SHALLOW_READONLY]
}

function toRaw(raw) {
  return raw[ReactiveFlags.RAW]
}
export {
  reactive,
  readonly,
  shallowReactive,
  shallowReadonly,
  isReactive,
  isReadonly,
  isShallow,
  isShallowReadonly,
  toRaw,
}
