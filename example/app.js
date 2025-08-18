import { h } from '../dist/index.js'
import { component } from './component.js'

const app = {
  render() {
    return h(
      'div',
      {
        style: 'color: rgba(255, 0, 0, 0.5)',
      },
      [
        h(
          'h1',
          {
            onClick() {
              console.log('click h1')
            },
          },
          this.count
        ),
        h('p', {}, 'hello vue'),
        h('div', {}, 'hello world'),
        h(component, { count: 1 }),
      ]
    )
  },
  setup() {
    return {
      msg: 'be happy!',
    }
  },
}
export { app }
