import { isString } from '../shared/index'
import { processComponent } from './component'
import { processElement } from './element'

function patch(vnode, container) {
  if (isString(vnode.type)) {
    processElement(vnode, container)
  } else {
    processComponent(vnode, container)
  }
}
export { patch }
