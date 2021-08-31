import { SearchCitiesResponse } from './pages/api/searchCities'

export const api = {
  searchCities:
    (searchQuery: string) => async (): Promise<SearchCitiesResponse> =>
      fetch(`/api/searchCities?query=${searchQuery}`).then(
        (r): Promise<SearchCitiesResponse> => (r.ok ? r.json() : r.text())
      ),
}
