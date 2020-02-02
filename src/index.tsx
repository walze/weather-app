// https://samples.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=64b7b6c0350e4af3d8ba7b2cb8979293

import React from 'react'
import { render } from 'react-dom'
import { component } from '~helpers'


component(import('./App'), 'App')
  .then(App => render(<App />, document.querySelector('#app')))