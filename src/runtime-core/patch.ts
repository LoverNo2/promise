import { processComponent } from './component'
import { processElement } from './element'

function patch(vnode, container) {
  processComponent(vnode, container)
  processElement(vnode, container)
}
export { patch }
