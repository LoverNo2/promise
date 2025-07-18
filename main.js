import './promise.js'

new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success!')
  }, 1000)
})
  .then(value => {
    console.log(value)
  })
  .catch(error => {
    console.error(error)
  })
