import {
  isReactive,
  isReadonly,
  isShallow,
  isShallowReadonly,
  reactive,
  readonly,
  shallowReactive,
  shallowReadonly,
} from '../reactive'

describe('reactive', () => {
  it('main test', () => {
    let user = { age: 18 }
    let reactiveUser = reactive(user)
    expect(reactiveUser.age).toBe(18)
    reactiveUser.age = 20
    expect(reactiveUser.age).toBe(20)
    expect(isReactive(reactiveUser)).toBe(true)
  })
  it('nested', () => {
    let user = {
      age: 18,
      friend: {
        name: '张三',
      },
      friends: [
        {
          name: '张三',
        },
        {
          name: '李四',
        },
      ],
    }
    let reactiveUser = shallowReactive(user.friends)

    // let shallowReactiveUser = shallowReactive(user)

    // expect(isReactive(reactiveUser.friend)).toBe(true)
    // expect(isReactive(reactiveUser.friends)).toBe(true)
    expect(isReactive(reactiveUser[0])).toBe(false)
    // expect(isReactive(shallowReactiveUser.friend)).toBe(false)
  })
})
