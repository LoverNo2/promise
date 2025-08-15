import { render } from './render'
import { createVNode } from './vnode'

function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      const vnode = createVNode(rootComponent)
      render(vnode, rootContainer)
    },
  }
}
export { createApp }
