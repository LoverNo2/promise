import { patch } from './patch'
import { setupComponent } from './setup'

function processComponent(vnode, container) {
  mountComponent(vnode, container)
}
function mountComponent(vnode, container) {
  const componentInstance = createComponentInstance(vnode)
  setupComponent(componentInstance)
  setupRenderEffect(componentInstance, container)
}

function setupRenderEffect(componentInstance, container) {
  const subTree = componentInstance.render()
  patch(subTree, container)
}

function createComponentInstance(vnode) {
  const componentInstance = {
    vnode,
    type: vnode.type,
    setupState: {},
    render: null,
  }
  return componentInstance
}

export { processComponent }
