function emit(componentInstance, event, ...args) {
  const { props } = componentInstance
  const handler = props[event]
  handler && handler(...args)
}
export { emit }
