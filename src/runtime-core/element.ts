import { ShapeFlags } from '../shared/index'
import { patch } from './patch'
function processElement(vnode, container) {
  mountElement(vnode, container)
}
function mountElement(vnode, container) {
  const { type, props, children, shapeFlag } = vnode

  const el = (vnode.el = document.createElement(type))

  addProps(el, props)
  mountChildren(children, shapeFlag, el)
  container.appendChild(el)
}
function mountChildren(children, shapeFlag, el) {
  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    el.textContent = children
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    children.forEach(child => {
      patch(child, el)
    })
  }
}

function addProps(el, props) {
  const isOn = key => /^on[A-Z]/.test(key)
  for (const key in props) {
    if (isOn(key)) {
      el.addEventListener(key.slice(2).toLowerCase(), props[key])
    } else {
      el.setAttribute(key, props[key])
    }
  }
}

export { processElement }
