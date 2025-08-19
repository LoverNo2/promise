import { shallowReadonly } from '../reactivity/reactive'
import { isObject } from '../shared/utils'
import { initProps } from './props'
import { initSlots } from './slot'

function setupComponent(instance) {
  const { props, children } = instance.vnode

  initProps(instance, props)
  initSlots(instance, children)

  setupStatefulComponent(instance)
}

function setupStatefulComponent(instance) {
  const { props, emit } = instance
  const { type } = instance.vnode

  const { setup } = type
  if (setup) {
    const setupResult = setup(shallowReadonly(props), { emit: emit })

    handleSetupResult(instance, setupResult)
  }
}
function handleSetupResult(instance, setupResult) {
  if (isObject(setupResult)) {
    instance.setupState = setupResult
  }
  finishComponentSetup(instance)
}
function finishComponentSetup(instance) {
  const raw = instance.vnode.type
  instance.render = raw.render
}

export { setupComponent }
