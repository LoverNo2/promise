import { createGetter } from './get'
import { createSetter } from './set'

const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)
const readonlySet = createSetter(true)
const shallowGet = createGetter(false, true)
const shallowReadonlyGet = createGetter(true, true)

const reactiveHandler = {
  get,
  set,
}

const readonlyHandler = {
  get: readonlyGet,
  set: readonlySet,
}

const shallowReactiveHandler = {
  get: shallowGet,
  set,
}

const shallowReadonlyHandler = {
  get: shallowReadonlyGet,
  set: readonlySet,
}

export { reactiveHandler, readonlyHandler, shallowReactiveHandler, shallowReadonlyHandler }
