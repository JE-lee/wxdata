
import type from './type'
import nextTick from './next-tick'

function proxy(context, obj, callback) {

  function excute(callback, ...rest){
    nextTick(() => {
      typeof callback == 'function' && callback(...rest)
    })
  }

  function defindAttr(obj, key, value) {
    let val = value
    Object.defineProperty(obj, key, {
      get() {
        return val
      },
      set(v) {
        val = v
        excute(callback, context.$data)
      },
      enumerable: true,
      configurable: true
    })
  }

  function deepProxy(obj) {
    let r = {}
    for (let key in obj) {
      if (!obj.hasOwnProperty(key)) continue;
      let value = obj[key]
      if (type(value) == 'object') {
        r[key] = deepProxy(value)
      } else if (type(value) == 'array') {
        r[key] = proxyArray(value)
      } else {
        defindAttr(r, key, value)
      }
    }
    return r
  }

  function proxyArray(array) {
    // 变异方法
    ['pop', 'push', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(arr => {
      array[arr] = function () {
        Array.prototype[arr].apply(this, arguments)
        // 重新代理这个数组
        array = proxyArray(array)
        excute(callback, context.$data)
      }
    })

    let r = []
    array.forEach((item, index) => {
      if (type(item) == 'object') {
        r[index] = deepProxy(item)
      } else if (type(item) == 'array') {
        r[index] =  proxyArray(item)
      } else {
        defindAttr(r, index, item)
      }
    })
    return r
  }

  let $data = {}
  if (type(obj) == 'object') {
    $data = deepProxy(obj)
  } else if (type(obj) == 'array') {
    $data = proxyArray(obj)
  } else {
    console.warn(`proxy target should be object or array, find ${type(obj)}`)
    return
  }
  context.$data = $data
}

export default proxy


