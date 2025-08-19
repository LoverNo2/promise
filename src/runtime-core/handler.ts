const publicPropertiesMap = {
  $el: i => i.vnode.el,
  $slots: i => i.slots,
}

const handler = {
  get({ _: componentInstance }, key) {
    const { setupState, props } = componentInstance
    if (key in setupState) {
      return setupState[key]
    }
    if (props && key in props) {
      return props[key]
    }

    const publicProperties = publicPropertiesMap[key]
    if (publicProperties) {
      return publicProperties(componentInstance)
    }
  },
}

export { handler }
