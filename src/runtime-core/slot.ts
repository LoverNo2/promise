import { isArray, isFunction } from '../shared/utils'
import { h } from './h'

function initSlots(componentInstance, children) {
  const slots = {}
  for (const key in children) {
    slots[key] = arrayWrap(children[key])
  }
  componentInstance.slots = slots
}

function arrayWrap(value) {
  return isArray(value) ? value : [value]
}

function renderSlots(slots, name, props) {
  const slot = slots[name]
  if (slot) {
    let a = slot[0]
    if (isFunction(a)) {
      return h('div', {}, [a(props)])
    }
    return h('div', {}, slot)
  }
}
export { initSlots, renderSlots }
