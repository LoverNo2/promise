import { h } from '../dist/index.js'

const app = {
  render() {
    return h(
      'div',
      {
        class: 'h1',
      },
      'title:' + this.msg
    )
  },
  setup() {
    return {
      msg: 'hello world',
    }
  },
}
export { app }
