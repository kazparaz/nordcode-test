import { NextApiRequest, NextApiResponse } from 'next'
import { cities } from './_helpers'

type OpenWeatherError = {
  cod: number
  message: string
}

const apiKey = '22f78270dfacbbcacda592d29726a7ce'

export default function requestHandler(
  req: NextApiRequest,
  res: NextApiResponse<OpenWeatherError | string | unknown>
): void {
  const cityId =
    'id' in req.query && typeof req.query.id === 'string'
      ? req.query.id
      : undefined
  const city = cities.find(({ id }) => cityId)

  if (cityId === undefined || !city) {
    res.status(400).json('"id" param is missing or invalid')
    return
  }

  void fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`
  )
    .then((r) => r.json().then((json: unknown) => ({ json, status: r.status })))
    .then(({ json, status }) => res.status(status).json(json))
}
