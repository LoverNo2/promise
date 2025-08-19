import { h } from '../dist/index.js'

const emit = {
  setup(props, { emit }) {
    const emitEvent = () => {
      emit('add', 1, 2, 3)
    }
    return {
      emitEvent,
    }
  },
  render() {
    const btn = h(
      'button',
      {
        // 必须使用箭头函数或者这种写法
        onClick: this.emitEvent,
      },
      '按钮'
    )

    return h('div', {}, [btn])
  },
}
export { emit }
