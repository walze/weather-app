import axios from 'axios'
import { curry } from 'ramda'

export const component = <T,>(p: Promise<T>,
  n: keyof T) => p.then(c => c[n])

export const {
  get
} = axios

export const thrower = (msg = '') => { throw new Error(msg) }

export const assert = <T extends (...a: any[]) => any>(f: T, message?: string) => (a?: Parameters<typeof f>[0]) => {
  const r = f(a)

  if (!r) throw new Error(r || message)

  return r as NonNullable<ReturnType<typeof f>>
}
