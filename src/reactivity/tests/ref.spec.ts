import { effect } from '../effect'
import { reactive } from '../reactive'
import { isRef, ref, unRef, proxyRefs } from '../ref'

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

  it('isRef', () => {
    const num = ref(1)
    const user = ref({
      count: 1,
    })
    expect(isRef(num)).toBe(true)
    expect(isRef(user)).toBe(true)
  })

  it('unRef', () => {
    const num = ref(1)
    const user = {
      count: 1,
    }
    const refUser = ref(user)

    expect(unRef(num)).toBe(1)
    expect(unRef(1)).toBe(1)
    expect(unRef(refUser)).toEqual(reactive(user))
  })

  it('proxyRefs', () => {
    const user = {
      age: ref(10),
      name: '张三',
    }
    const proxyUser = proxyRefs(user)
    expect(user.age.value).toBe(10)
    expect(proxyUser.age).toBe(10)
    expect(proxyUser.name).toBe('张三')
  })
})
