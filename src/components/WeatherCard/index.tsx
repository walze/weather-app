
import React, { FunctionComponent } from 'react'
import { Weather } from '~types/weather'
import { Card } from './style'
import { map } from 'ramda'

const WeatherCard: FunctionComponent<Weather> = (props) => {
  console.log(props, props.main)

  const { name, sys, weather: [climate], main } = props

  return (
    <Card className="card mb-3">

      <div className="row no-gutters">
        <div className="col-md-4">
          <img src={`http://openweathermap.org/img/wn/${climate.icon}@2x.png`} alt={`Photo of ${climate.main}`} className="card-img" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{climate.main}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{climate.description}</h6>

            <p>Temperature - {main.temp}</p>
            <p>Feels like - {main.feels_like}</p>
            <p>Minimum - {main.temp_min}</p>
            <p>Maximum - {main.temp_max}</p>
            <p>Pressure - {main.pressure}</p>
            <p>Humidity - {main.humidity}</p>

            <p >
              {name}, {sys.country}
              <br />
              <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
            </p>
          </div>
        </div>
      </div>

    </Card>
  )
}

export default WeatherCard