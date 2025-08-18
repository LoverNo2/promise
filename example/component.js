import { h } from '../dist/index.js'

const component = {
  render() {
    return h(
      'div',
      {
        style: 'color: rgba(255, 0, 0, 0.5)',
      },
      'count is ' + this.count
    )
  },
  setup() {
    return {
      msg: 'hello vue',
    }
  },
}
export { component }
