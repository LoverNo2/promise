import { render } from './render'
import { createVNode } from './vnode'

function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      const container = document.querySelector(rootContainer)
      if (!container) {
        console.warn('container not found')
        return
      }

      const vnode = createVNode(rootComponent)
      render(vnode, container)
    },
  }
}
export { createApp }
