// Global state
import { createState } from '@hookstate/core'
import { SearchCityItem } from './pages/api/searchCities'

export const globalState = {
  city: createState<SearchCityItem>({
    id: 593116,
    name: 'Vilnius',
    country: 'LT',
  }),
}
