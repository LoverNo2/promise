const extend = Object.assign
const isObject = function (target) {
  return Object.prototype.toString.call(target) === '[object Object]'
}
const isArray = function (target) {
  return Array.isArray(target)
}
const isFunction = function (target) {
  return Object.prototype.toString.call(target) === '[object Function]'
}
const isString = function (target) {
  return Object.prototype.toString.call(target) === '[object String]'
}
const isSymbol = function (target) {
  return Object.prototype.toString.call(target) === '[object Symbol]'
}
const isNumber = function (target) {
  return Object.prototype.toString.call(target) === '[object Number]'
}
const isBigInt = function (target) {
  return Object.prototype.toString.call(target) === '[object BigInt]'
}

export { extend, isObject, isArray, isFunction, isString, isSymbol, isNumber, isBigInt }
