import { useCallback, useEffect, useRef } from 'react'

/*
use：
const queryUtil = ()=>{
  console.log('req:')
}
const handleClick = useThrottle((val)=>queryUtil(val),600)
or:
const handleClick = useThrottle(()=>queryUtil(),600)
*/
const useThrottle = (fn: (args?: any) => void, delay: number, dep = []) => {
  const { current } = useRef({ fun: fn, valid: true })

  useEffect(() => {
    current.fun = fn
  }, [fn]) // eslint-disable-line react-hooks/exhaustive-deps

  return useCallback((args?: any) => {
    if (!current.valid) {
      return
    }

    current.valid = false

    window.setTimeout(() => {
      current.fun(args)
      current.valid = true
    }, delay)
  }, dep) // eslint-disable-line react-hooks/exhaustive-deps
}

export default useThrottle