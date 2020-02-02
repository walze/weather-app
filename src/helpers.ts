import ax from 'axios'
import { from, Observable, of } from 'rxjs'
import { map, flatMap, tap, catchError } from 'rxjs/operators'
import { IIpStackResponse } from '~types/ipstack'
import { ifElse } from 'ramda'
import { Location } from '~types'

export const component = <T,>(p: Promise<T>,
  n: keyof T) => p.then(c => c[n])



export const {
  get
} = ax

const thrower = (msg = '') => { throw new Error(msg) }

export const saveLocation = <T>(location: T) => localStorage.setItem('location', JSON.stringify(location))
export const loadLocationCache = () => of(localStorage.getItem('location'))
  .pipe(
    map(ifElse(
      Boolean,
      JSON.parse,
      _ => thrower('no location')
    )),
    map(a => a as Location)
  )

export const getLocationNav = () => new Observable<Position>(sub => {
  navigator.geolocation.getCurrentPosition(sub.next.bind(sub), sub.error.bind(sub))
})
  .pipe(
    map(a => a.coords),
    map(({ latitude, longitude }) => ({ latitude, longitude })),
    map(a => a as Location),
    tap(saveLocation),
  )

export const getLocationIP = () => from(get<string>('https://www.cloudflare.com/cdn-cgi/trace'))
  .pipe(
    map(a => a.data.split(/\n/)),
    map(a => a[2].split('=')[1]),
    flatMap(ip => get<IIpStackResponse>(`http://api.ipstack.com/${ip}?access_key=7c583e8a49ff2cc5c4402b232a8524ae&format=1`)),
    map(({ data: { latitude, longitude } }) => ({ latitude, longitude })),
    map(a => a as Location),
    tap(saveLocation),
  )


export const assert = <T extends (...a: any[]) => any>(f: T, message?: string) => (a?: Parameters<typeof f>[0]) => {
  const r = f(a)

  if (!r) throw new Error(r || message)

  return r as NonNullable<ReturnType<typeof f>>
}


export const getLocation = () => loadLocationCache().pipe(
  catchError(getLocationNav),
  catchError(getLocationIP),
)
