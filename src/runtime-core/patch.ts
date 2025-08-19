import { ShapeFlags } from '../shared/shape'
import { processComponent } from './component'
import { processElement } from './element'

function patch(vnode, container) {
  const { shapeFlag } = vnode
  if (shapeFlag & ShapeFlags.ELEMENT) {
    processElement(vnode, container)
  } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
    processComponent(vnode, container)
  } else {
    console.warn('vnode type error')
  }
}
export { patch }
