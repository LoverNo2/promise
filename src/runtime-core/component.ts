import { emit } from './emit'
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
  const { proxy } = componentInstance
  // 这一步中会执行component的children中的h方法
  const subTree = componentInstance.render.call(proxy)
  componentInstance.vnode = subTree
  patch(subTree, container)
}

function createComponentInstance(vnode) {
  const componentInstance = {
    vnode,
    children: vnode.children,
    type: vnode.type,
    setupState: {},
    render: null,
    props: {},
    emit,
    slots: {},
  }
  componentInstance.emit = emit.bind(null, componentInstance)

  return componentInstance
}

export { processComponent }
