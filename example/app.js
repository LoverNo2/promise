import { h } from '../dist/index.js'

const app = {
  render() {
    return h(
      'div',
      {
        style: 'color: rgba(255, 0, 0, 0.5)',
      },
      [h('h1', {}, this.msg), h('p', {}, 'hello vue'), h('div', {}, 'hello world')]
    )
  },
  setup() {
    return {
      msg: 'be happy',
    }
  },
}
export { app }
