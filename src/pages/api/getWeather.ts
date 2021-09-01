import { NextApiRequest, NextApiResponse } from 'next'
import { cities } from './_cities'

type OpenWeatherError = {
  cod: number
  message: string
}

type OpenWeatherSharedWeatherData = {
  dt: number
  sunrise: number
  sunset: number
  pressure: number
  humidity: number
  dew_point: number
  wind_speed: number
  wind_deg: number
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
  uvi: number
  clouds: number
}

type OpenWeatherSuccess = {
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
  current: OpenWeatherSharedWeatherData & {
    temp: number
    feels_like: number
    visibility: number
  }
  daily: (OpenWeatherSharedWeatherData & {
    moonrise: number
    moonset: number
    moon_phase: number
    temp: {
      day: number
      min: number
      max: number
      night: number
      eve: number
      morn: number
    }
    feels_like: {
      day: number
      night: number
      eve: number
      morn: number
    }
    wind_gust: number
    pop: number
  })[]
}

export type GetWeatherResponse = OpenWeatherError | OpenWeatherSuccess | string

const apiKey = '22f78270dfacbbcacda592d29726a7ce'

export default function requestHandler(
  req: NextApiRequest,
  res: NextApiResponse<GetWeatherResponse>
): void {
  const cityId =
    'id' in req.query && typeof req.query.id === 'string'
      ? req.query.id
      : undefined
  const city = cities.find(({ id }) => cityId === id.toString())

  if (cityId === undefined || !city) {
    res.status(400).json('"id" param is missing or invalid')
    return
  }

  void fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`
  )
    .then((r) =>
      r.json().then((json: OpenWeatherError | OpenWeatherSuccess) => ({
        json,
        status: r.status,
      }))
    )
    .then(({ json, status }) => res.status(status).json(json))
}
