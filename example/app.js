import { h } from '../dist/index.js'
import { props } from './props.js'
import { emit } from './emit.js'
import { slot } from './slot.js'

const app = {
  render() {
    return h('h1', {}, [
      h('div', {}, 'hello'),
      h(props, { count: 6 }),
      h(emit, {
        add(a, b, c) {
          console.log('add', a, b, c)
        },
      }),
      h(
        slot,
        { count: 2 },
        {
          one: age => h('h3', { count: 3 }, 'one' + age),
          two: h('h3', { count: 4 }, 'two'),
        }
      ),
    ])
  },
  setup() {
    return {
      msg: 'be happy!',
    }
  },
}
export { app }
