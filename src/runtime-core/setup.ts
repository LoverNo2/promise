import { shallowReadonly } from '../reactivity/reactive'
import { isObject } from '../shared/utils'
import { handler } from './handler'
import { initProps } from './props'
import { initSlots } from './slot'

function setupComponent(componentInstance) {
  const { props, children } = componentInstance
  initProps(componentInstance, props)
  initSlots(componentInstance, children)

  setupStatefulComponent(componentInstance)
}

function setupStatefulComponent(componentInstance) {
  const { props, type, emit } = componentInstance
  componentInstance.proxy = new Proxy({ _: componentInstance }, handler)

  const { setup } = type
  if (setup) {
    const setupResult = setup(shallowReadonly(props), { emit: emit })

    handleSetupResult(componentInstance, setupResult)
  }
}
function handleSetupResult(componentInstance, setupResult) {
  if (isObject(setupResult)) {
    componentInstance.setupState = setupResult
  }
  finishComponentSetup(componentInstance)
}
function finishComponentSetup(componentInstance) {
  const raw = componentInstance.type
  componentInstance.render = raw.render
}

export { setupComponent }
