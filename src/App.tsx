
import React, { useEffect, lazy } from 'react'
import { useLocation } from '~helpers/useLocation'
import { makeUseObservable, pipeOf } from '~hooks/useObservable'
import { mergeMap, map } from 'rxjs/operators'
import { get } from '~helpers'
import { Location } from '~types'
import { Weather } from '~types/weather'


const useWeather = makeUseObservable(pipeOf(
  mergeMap(({ latitude, longitude }: Location) =>
    get<Weather>(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=64b7b6c0350e4af3d8ba7b2cb8979293`)),
  map(a => a.data)
))


const WeatherCard = lazy(() => import('./components/WeatherCard'))


export const App = () => {
  const [location, updateLocation] = useLocation()
  const [weather, updateWeather] = useWeather(location)

  useEffect(updateLocation, [])
  useEffect(
    location ? updateWeather : () => { },
    [location?.latitude, location?.longitude]
  )

  console.log(WeatherCard)

  return (
    <div>
      {
        weather && <WeatherCard {...weather} />
      }

      <button onClick={updateLocation}>next</button>
    </div >
  )
}

export default App