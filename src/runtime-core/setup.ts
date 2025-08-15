import { isObject } from '../shared/index'

function setupComponent(componentInstance) {
  //todo initProps
  //todo initSlots
  setupStatefulComponent(componentInstance)
}
function setupStatefulComponent(componentInstance) {
  const component = componentInstance.type
  componentInstance.proxy = new Proxy(
    {},
    {
      get(target, key) {
        const { setupState } = componentInstance
        if (key in setupState) {
          return setupState[key]
        }
      },
    }
  )
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
  componentInstance.render = component.render
}

export { setupComponent }
