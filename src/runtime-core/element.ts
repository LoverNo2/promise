import { isString, isArray } from '../shared/index'
import { patch } from './patch'

function processElement(vnode, container) {
  mountElement(vnode, container)
}
function mountElement(vnode, container) {
  const { type, props, children } = vnode
  const el = document.createElement(type)
  addProps(el, props)
  mountChildren(children, el)
  container.appendChild(el)
}
function mountChildren(children, el) {
  if (isString(children)) {
    el.textContent = children
  } else if (isArray(children)) {
    children.forEach(child => {
      patch(child, el)
    })
  }
}
function addProps(el, props) {
  for (const key in props) {
    el.setAttribute(key, props[key])
  }
}

export { processElement }
