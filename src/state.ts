import { createState } from '@hookstate/core'
import { GetWeatherResponse } from './pages/api/getWeather'
import { SearchCityItem } from './pages/api/searchCities'

export const globalState = {
  city: createState<SearchCityItem>({
    id: 593116,
    name: 'Vilnius',
    country: 'LT',
  }),
  weather: createState<GetWeatherResponse | undefined>(undefined),
}
