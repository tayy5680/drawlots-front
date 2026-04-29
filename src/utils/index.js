export function deepCopy (value) {
  return _deepCopy(value, new WeakMap())
}
function _deepCopy (value, cache) {
  const representingType = Object.prototype.toString.call(value)
  if (representingType !== '[object Object]' && representingType !== '[object Array]') return value

  if (cache.has(value)) return cache.get(value)

  const clone = representingType === '[object Object]' ? {} : []
  Object.setPrototypeOf(clone, Object.getPrototypeOf(value))
  cache.set(value, clone)

  Object.keys(value).forEach(key => {
    clone[key] = _deepCopy(value[key], cache)
  })

  return clone
}
