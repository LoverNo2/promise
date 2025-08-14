import { reactive } from '../reactive'
import { computed } from '../computed'

describe('computed', () => {
  it('base', () => {
    const user = reactive({
      age: 10,
    })
    const age = computed(() => {
      return user.age
    })
    expect(age.value).toBe(10)
    user.age++
    expect(age.value).toBe(11)
  })

  it('lazy', () => {
    const value = reactive({
      foo: 1,
    })
    const getter = jest.fn(() => {
      return value.foo
    })
    const cValue = computed(getter)
    // 不访问value时，不应该调用getter

    expect(getter).not.toHaveBeenCalled()
    // 访问value时，应该调用getter
    expect(cValue.value).toBe(1)
    expect(getter).toHaveBeenCalledTimes(1)
    // 依赖的响应式数据没有变化时，不应该调用getter
    cValue.value
    expect(getter).toHaveBeenCalledTimes(1)
    // 当依赖的响应式数据变化但computed还未使用时，不应该调用getter
    value.foo++
    expect(getter).toHaveBeenCalledTimes(1)
    // 当依赖的响应式数据变化且computed使用时，应该调用getter
    expect(cValue.value).toBe(2)
    expect(getter).toHaveBeenCalledTimes(2)
    // 当computed使用后，再次访问value时，不应该调用getter
    cValue.value
    expect(getter).toHaveBeenCalledTimes(2)
  })
})
