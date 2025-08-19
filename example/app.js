import { h } from '../dist/index.js'
import { props } from './props.js'
import { emit } from './emit.js'
import { slot } from './slot.js'

const app = {
  render() {
    return h('h1', {}, [
      // h(
      //   'div',
      //   {
      //     onClick() {
      //       console.log('click h1')
      //     },
      //   },
      //   this.count
      // ),
      // h('div', {}, 'hello'),
      // h(props, { count: 1 }),
      // h(emit, {
      //   add(a, b, c) {
      //     console.log('add', a, b, c)
      //   },
      // }),
      h(slot, {}, { one: age => h('h3', {}, 'one' + age), two: h('h3', {}, 'two') }),
    ])
  },
  setup() {
    return {
      msg: 'be happy!',
    }
  },
}
export { app }
