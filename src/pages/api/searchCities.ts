import { Search } from 'js-search'
import type { NextApiRequest, NextApiResponse } from 'next'

type CityItem = {
  id: number
  name: string
  state: string
  country: string
  coord: {
    lon: number
    lat: number
  }
}

export type SearchCityItem = {
  id: number
  name: string
  country: string
}

export type SearchCitiesResponse = SearchCityItem[] | string

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cities = require('./cities.json') as CityItem[]

const searchableItems = cities.map<SearchCityItem>(({ id, name, country }) => ({
  id,
  name,
  country,
}))
const searchInstance = new Search('id')
searchInstance.addIndex('name')
searchInstance.addIndex('country')
searchInstance.addDocuments(searchableItems)

const maxResults = 20

export default function requestHandler(
  req: NextApiRequest,
  res: NextApiResponse<SearchCitiesResponse>
): void {
  console.time('search')
  const searchQuery =
    'query' in req.query && typeof req.query.query === 'string'
      ? req.query.query
      : undefined

  if (searchQuery === undefined) {
    res.status(400).send('Invalid "query" param')
    return
  }

  const searchResults = searchInstance
    .search(searchQuery)
    .slice(0, maxResults) as SearchCityItem[]

  res.status(200).json(searchResults)
  console.timeEnd('search')
}
