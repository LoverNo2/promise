const user = {
  name: '张三',
  age: 18,
}
const proxyUser = new Proxy(user, {
  get(target, key) {
    console.log('get', target, key)
    return target[key]
  },
  set(target, key, value) {
    console.log('set', target, key, value)
    target[key] = value
  },
})

console.log(user, proxyUser)
