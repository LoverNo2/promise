import { reactive } from '../reactive'
import { effect, stop } from '../effect'

describe('effect', () => {
  it('main test', () => {
    const user = reactive({
      age: 10,
    })
    let nextAge: number = 0

    effect(() => {
      nextAge = user.age
    }, {})
    expect(nextAge).toBe(10)
    user.age++
    expect(nextAge).toBe(11)
  })

  it('runner', () => {
    const user = { age: 10 }
    const runner = effect(() => {
      user.age++
      return 'runner ' + user.age
    }, {})
    expect(user.age).toBe(11)
    const r = runner()
    expect(r).toBe('runner 12')
  })

  it('scheduler', () => {
    const user = reactive({ age: 10 })
    const scheduler = jest.fn(() => {
      return 'scheduler'
    })

    const runner = effect(
      () => {
        return 'runner ' + user.age
      },
      {
        scheduler,
      }
    )
    expect(user.age).toBe(10)
    expect(scheduler).not.toHaveBeenCalled()
    user.age++
    expect(scheduler).toHaveBeenCalledTimes(1)
    expect(runner()).toBe('runner 11')
  })

  it('stop', () => {
    let num
    const user = reactive({ age: 10 })
    const runner = effect(() => {
      num = user.age
    }, {})
    expect(num).toBe(10)
    user.age++
    expect(num).toBe(11)
    stop(runner)
    user.age++
    expect(num).toBe(11)
    runner()
    expect(num).toBe(12)
    user.age++
    expect(num).toBe(12)
  })
})
