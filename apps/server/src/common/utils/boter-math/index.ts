import Big from 'big.js'

export function plus(...args: number[]): number {
  const [value, ...rest] = args
  let big = new Big(value)
  for (const item of rest) {
    big = big.plus(item)
  }
  return Number(big.toPrecision())
}

export function minus(value: number, ...args: number[]): number {
  let big = new Big(value)
  for (const item of args) {
    big = big.minus(item)
  }
  return Number(big.toPrecision())
}

export function times(value: number, ...args: number[]): number {
  let big = new Big(value)
  for (const item of args) {
    big = big.times(item)
  }
  return Number(big.toPrecision())
}

export function divide(value: number, ...args: number[]): number {
  let big = new Big(value)
  for (const item of args) {
    big = big.div(item)
  }
  return Number(big.toPrecision())
}
