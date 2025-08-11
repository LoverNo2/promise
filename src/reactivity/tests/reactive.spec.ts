import { isReactive, reactive } from '../reactive'

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
      ],
    }
    let reactiveUser = reactive(user)
    expect(isReactive(reactiveUser.friend)).toBe(true)
    expect(isReactive(reactiveUser.friends)).toBe(true)
    expect(isReactive(reactiveUser.friends[0])).toBe(true)
  })
})
