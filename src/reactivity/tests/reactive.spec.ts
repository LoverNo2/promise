import { reactive } from '../reactive'

describe('reactive', () => {
  it('main test', () => {
    let user = { age: 18 }
    let reactiveUser = reactive(user)
    expect(reactiveUser.age).toBe(18)
    reactiveUser.age = 20
    expect(reactiveUser.age).toBe(20)
  })
})
