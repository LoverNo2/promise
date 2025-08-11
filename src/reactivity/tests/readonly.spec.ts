import { readonly, isReadonly } from '../reactive'

describe('readonly', () => {
  it('base', () => {
    const original = {
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
    const wrapped = readonly(original)
    expect(wrapped.age).toBe(18)
    expect(wrapped).not.toBe(original)
    expect(isReadonly(wrapped)).toBe(true)
    expect(isReadonly(wrapped.friend)).toBe(true)
    expect(isReadonly(wrapped.friends)).toBe(true)
  })

  it('warnning', () => {
    console.warn = jest.fn()

    const original = {
      age: 18,
    }
    const wrapped = readonly(original)
    wrapped.age = 20
    expect(console.warn).toHaveBeenCalledTimes(1)
  })
})
