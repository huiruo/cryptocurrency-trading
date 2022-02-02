import { useCallback, useEffect, useRef } from 'react'

/*
use：
const queryUtil = ()=>{
  console.log('req:')
}
const handleClick = useDebounce((val)=>queryUtil(val),600)
or:
const handleClick = useDebounce(()=>queryUtil(),600)
*/
const useDebounce = (fn: (args?: any) => void, delay: number, dep = []) => {
  const { current } = useRef({ fun: fn, timer: 0 })

  useEffect(() => {
    current.fun = fn
  }, [fn]) // eslint-disable-line react-hooks/exhaustive-deps

  return useCallback((args?: any) => {

    console.log('防抖_test')
    if (current.timer) {
      clearTimeout(current.timer)
    }

    current.timer = window.setTimeout(() => {
      console.log('防抖_执行')
      current.fun(args)
    }, delay)
  }, dep) // eslint-disable-line react-hooks/exhaustive-deps
}

export default useDebounce
