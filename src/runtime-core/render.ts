import { patch } from './patch'

function render(vnode, container) {
  patch(vnode, container)
}
export { render }
