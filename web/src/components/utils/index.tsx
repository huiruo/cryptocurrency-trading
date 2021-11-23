import React from 'react'
export * from './array.ts'

export const __DEV__ = process.env.NODE_ENV !== 'production'

export const fromEntries = <T extends unknown>(entries: [string, any][]) =>
  entries.reduce<any>((carry, [key, value]) => {
    carry[key] = value
    return carry
  }, {}) as T

export const cx = (...classNames: any[]) => classNames.filter(Boolean).join(' ')

export const guid = () => {
  return (
    String.fromCharCode(Math.floor(Math.random() * 26) + 97) +
    Math.random().toString(16).slice(2) +
    Date.now().toString(16).slice(4)
  )
}

export function forwardRef(component: React.ForwardRefRenderFunction<any, any>) {
  return React.forwardRef(component) as any
}

export function isReactText(children: any) {
  return ['string', 'number'].includes(typeof children)
}
