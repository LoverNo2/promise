import { setupComponent } from './setup'

function processComponent(vnode, container) {
  mountComponent(vnode, container)
}
function mountComponent(vnode, container) {
  const componentInstance = createComponentInstance(vnode)
  setupComponent(componentInstance)
  setupRenderEffect(componentInstance, container)
}

async function setupRenderEffect(componentInstance, container) {
  const { proxy } = componentInstance
  // 这一步中会执行component的children中的h方法
  const subTree = componentInstance.render.call(proxy)

  const { patch } = await import('./patch')
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
