const publicPropertiesMap = {
  $el: i => i.vnode.el,
}

const handler = {
  get({ _: componentInstance }, key) {
    const { setupState } = componentInstance
    if (key in setupState) {
      return setupState[key]
    }
    const publicProperties = publicPropertiesMap[key]

    if (publicProperties) {
      return publicProperties(componentInstance)
    }
  },
}

export { handler }
