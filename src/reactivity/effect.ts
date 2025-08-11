let activeEffect
class ReactiveEffect {
  private fn
  deps = []

  constructor(fn, public scheduler?) {
    this.fn = fn
  }
  run() {
    return this.fn()
  }
  stop() {
    cleanupEffect(this)
  }
}

function cleanupEffect(effect) {
  effect.deps.forEach((dep: any) => {
    dep.delete(effect)
  })
}

function effect(fn, options) {
  const scheduler = options.scheduler
  const _effect = new ReactiveEffect(fn, scheduler ? scheduler : null)
  activeEffect = _effect
  _effect.run()
  const runner: any = _effect.run.bind(_effect)
  runner.effect = _effect
  activeEffect = null
  return runner
}

const targetMap = new Map()
function track(target, key) {
  if (!activeEffect) {
    return
  }
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }
  dep.add(activeEffect)
  activeEffect.deps.push(dep)
}

function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) {
    return
  }
  const dep = depsMap.get(key)
  if (!dep) {
    return
  }
  dep.forEach(effect => {
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  })
}

function stop(runner) {
  runner.effect.stop()
}
export { effect, track, trigger, stop }
