import { h } from '../dist/index.js'

const props = {
  render() {
    return h('div', {}, 'count:' + this.count)
  },
  setup(props) {
    return {
      msg: 'hello vue',
    }
  },
}
export { props }
