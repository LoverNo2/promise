import { isString } from './utils'

const enum ShapeFlags {
  ELEMENT = 1,
  STATEFUL_COMPONENT = 1 << 1,
  TEXT_CHILDREN = 1 << 2,
  ARRAY_CHILDREN = 1 << 3,
}

function getShapeFlag(type): number {
  if (isString(type)) {
    return ShapeFlags.ELEMENT
  } else {
    return ShapeFlags.STATEFUL_COMPONENT
  }
}

export { ShapeFlags, getShapeFlag }
