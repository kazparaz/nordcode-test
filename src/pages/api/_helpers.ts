type City = {
  id: number
  name: string
  state: string
  country: string
  coord: {
    lon: number
    lat: number
  }
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const cities = require('./cities.json') as City[]
