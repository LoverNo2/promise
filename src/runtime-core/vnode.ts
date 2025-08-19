import { getShapeFlag, ShapeFlags } from '../shared/shape'
import { isString, isArray } from '../shared/utils'

function modifyShapeFlag(vnode, children) {
  if (isString(children)) {
    vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN
  } else if (isArray(children)) {
    vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN
  }
}

function createVNode(type, props?, children?) {
  const vnode = {
    type,
    props,
    children,
    shapeFlag: getShapeFlag(type),
    el: null,
  }
  modifyShapeFlag(vnode, children)

  return vnode
}
export { createVNode }
