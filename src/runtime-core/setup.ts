import { isObject } from '../shared/index'
import { handler } from './handler'
import { initProps } from './props'

function setupComponent(componentInstance) {
  initProps(componentInstance, componentInstance.vnode.props)

  //todo initSlots
  setupStatefulComponent(componentInstance)
}

function setupStatefulComponent(componentInstance) {
  const raw = componentInstance.type
  componentInstance.proxy = new Proxy({ _: componentInstance }, handler)

  const { setup } = raw
  if (setup) {
    const setupResult = setup()

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
