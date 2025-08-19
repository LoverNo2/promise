function emit(instance, event, ...args) {
  const { props } = instance
  const handler = props[event]
  handler && handler(...args)
}
export { emit }
