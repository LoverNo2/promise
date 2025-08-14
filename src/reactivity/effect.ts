let activeEffect
class ReactiveEffect {
  fn
  deps = []
  onStop?: () => void
  scheduler?: () => void

  constructor(fn, options) {
    this.scheduler = options.scheduler
    this.onStop = options.onStop
    this.fn = fn
    // computed需要
    activeEffect = this
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
  const _effect = new ReactiveEffect(fn, options)
  activeEffect = _effect
  _effect.run()
  activeEffect = null
  const runner: any = _effect.run.bind(_effect)
  runner.effect = _effect

  return runner
}

const targetMap = new WeakMap()
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
  trackEffect(dep)
}

function trackEffect(dep) {
  if (!activeEffect) {
    return
  }
  if (dep.has(activeEffect)) {
    return
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
  triggerEffect(dep)
}

function triggerEffect(dep) {
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
  if (runner.effect.onStop) {
    return runner.effect.onStop()
  }
}
export { effect, track, trigger, stop, trackEffect, triggerEffect, ReactiveEffect }
