import { isObject } from '../shared'

function setupComponent(componentInstance) {
  //todo initProps
  //todo initSlots
  setupStatefulComponent(componentInstance)
}
function setupStatefulComponent(componentInstance) {
  const component = componentInstance.type
  const { setup } = component
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
  const component = componentInstance.type
  if (component.render) {
    componentInstance.render = component.render
  }
}

export { setupComponent }
