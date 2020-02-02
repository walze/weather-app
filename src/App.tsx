
import React, { useEffect } from 'react'
import { useLocation } from '~helpers/useLocation'


export const App = () => {
  const [location, updateLocation] = useLocation()

  useEffect(updateLocation, [])

  console.log('render')

  return (
    <div>
      <div className="todo">
        <code>TODO: {JSON.stringify(location)}</code>
      </div>

      <button onClick={updateLocation}>next</button>
    </div >
  )
}