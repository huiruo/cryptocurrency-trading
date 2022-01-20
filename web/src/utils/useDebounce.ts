import { useCallback, useEffect, useRef } from "react";

/*
const delayQuery = useDebounce((val)=>queryUtil(val),1000)
*/
const useDebounce = (fn:(args:any)=>void, delay:number,dep=[]) => {

    /*
    useRef 返回一个可变的ref对象，其current 属性被初始化为传入参数。返回的ref对象在组件的生命周期不变
    current 值的改变不会引起组件的渲染，相当组件的全局变量
    ref与render保持一种地址引用，能拿到最新结果
    */
    const { current } = useRef({ fun:fn,timer: 0 })

    useEffect(()=>{
      current.fun = fn
    },[fn]) // eslint-disable-line react-hooks/exhaustive-deps

    return useCallback((args:any)=>{

      if(current.timer){
        clearTimeout(current.timer)
      }

      console.log('args',args)

      current.timer = window.setTimeout(()=>{
        current.fun(args)
      },delay)

    },dep) // eslint-disable-line react-hooks/exhaustive-deps
}

export default useDebounce;

/*

*/