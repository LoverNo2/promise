import { effect } from '../effect'
import { ref } from '../ref'

describe('ref', () => {
  it('base', () => {
    const num = ref(1)
    expect(num.value).toBe(1)
  })

  it('reactive', () => {
    const sum = ref(1)
    let test = 0
    effect(() => {
      test = sum.value
    }, {})
    sum.value = 2
    expect(test).toBe(2)
    sum.value = 2
    expect(test).toBe(2)
  })

  it('nested', () => {
    const user = ref({
      count: 1,
    })
    let test = 0
    effect(() => {
      test = user.value.count
    }, {})
    expect(test).toBe(1)
    user.value.count++
    expect(test).toBe(2)
  })
})
