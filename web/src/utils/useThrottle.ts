import { useCallback, useEffect, useRef } from "react";

/*
const delayQuery = useThrottle((val)=>queryUtil(val),1000)
*/
const useThrottle = (fn:(args:any)=>void, delay:number,dep=[]) => {

    const { current } = useRef({ fun:fn,valid: true })

    useEffect(()=>{
      current.fun = fn
    },[fn]) // eslint-disable-line react-hooks/exhaustive-deps

    return useCallback((args:any)=>{

      if(!current.valid){
        return
      }

      current.valid = false

      window.setTimeout(()=>{
        current.fun(args)
        current.valid = true
      },delay)

    },dep) // eslint-disable-line react-hooks/exhaustive-deps
}

export default useThrottle;

/*
function useThrottle(fn, delay, dep = []) {
  const { current } = useRef({ fn, timer: null });
  useEffect(function () {
    current.fn = fn;
  }, [fn]);

  return useCallback(function f(...args) {
    if (!current.timer) {
      current.timer = setTimeout(() => {
        delete current.timer;
      }, delay);
      current.fn.call(this, ...args);
    }
  }, dep);
}
*/