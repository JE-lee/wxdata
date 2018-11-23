let cacheFn, isSetted = false
export default function nextTick(fn) {
  cacheFn = fn
  if (isSetted) return
  isSetted = true
  if (Promise) {
    let cb = () => {
      typeof cacheFn == 'function' && cacheFn()
      isSetted = false
    }
    Promise.resolve().then(cb)
  } else {
    setTimeout(cb, 0);
  }
}