import { h } from '../dist/index.js'
import { renderSlots } from '../dist/index.js'

const slot = {
  setup(props, { emit }) {
    return {}
  },
  render() {
    return h('h2', {}, [renderSlots(this.$slots, 'two'), h('div', {}, 'title'), renderSlots(this.$slots, 'one', 1)])
  },
}
export { slot }
