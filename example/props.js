import { h } from '../dist/index.js'

const props = {
  render() {
    return h('div', {}, 'this is props')
  },
  setup(props) {
    console.log(props)

    return {
      msg: 'hello vue',
    }
  },
}
export { props }
