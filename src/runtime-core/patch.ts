import { isObject, isString } from '../shared/index'
import { processComponent } from './component'
import { processElement } from './element'

function patch(vnode, container) {
  if (isString(vnode.type)) {
    processElement(vnode, container)
  } else if (isObject(vnode.type)) {
    processComponent(vnode, container)
  } else {
    console.warn('vnode type error')
  }
}
export { patch }
