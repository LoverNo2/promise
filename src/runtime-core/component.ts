import { emit } from './emit'
import { handler } from './handler'
import { patch } from './patch'
import { setupComponent } from './setup'

function processComponent(vnode, container) {
  mountComponent(vnode, container)
}
function mountComponent(vnode, container) {
  const instance = createInstance(vnode)
  setupComponent(instance)
  setupRenderEffect(instance, container)
}

async function setupRenderEffect(instance, container) {
  instance.proxy = new Proxy({ _: instance }, handler)
  const { proxy } = instance
  // 这一步中会执行component的children中的h方法
  const subTree = instance.render.call(proxy)
  instance.vnode.el = subTree
  patch(subTree, container)
}

function createInstance(vnode) {
  const instance = {
    vnode,
    setupState: {},
    props: {}, // 来自父组件的参数或者是emit事件
    emit, // emit方法
    slots: {}, // 插槽
  }
  instance.emit = emit.bind(null, instance)

  return instance
}

export { processComponent }
