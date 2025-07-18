const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success!')
  }, 1000)
})

promise.then(value => {
  console.log('1' + value)
})
promise.then(value => {
  console.log('2' + value)
})
