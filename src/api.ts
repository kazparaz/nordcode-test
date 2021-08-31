import { SearchCitiesResponse } from './pages/api/searchCities'

export const api = {
  searchCities:
    (searchQuery: string) => async (): Promise<SearchCitiesResponse> =>
      fetch(`/api/searchCities?query=${searchQuery}`).then(
        (r): Promise<SearchCitiesResponse> => r.json()
      ),

  getWeather: (cityId: number) => async (): Promise<unknown> =>
    fetch(`/api/getWeather?id=${cityId}`).then(
      (r): Promise<unknown> => r.json()
    ),
}
