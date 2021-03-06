import { Search } from 'js-search'
import type { NextApiRequest, NextApiResponse } from 'next'
import { cities } from './_cities'
import { isoCountries } from './_countries'

export type SearchCityItem = {
  id: number
  name: string
  country: string
}

export type SearchCitiesResponse = SearchCityItem[] | string

const searchableItems = cities.map<SearchCityItem>(({ id, name, country }) => ({
  id,
  name,
  country: isoCountries[country] ?? country,
}))

const searchInstance = new Search('id')

searchInstance.addIndex('name')
searchInstance.addIndex('country')
searchInstance.addDocuments(searchableItems)

const maxResults = 30

export default function requestHandler(
  req: NextApiRequest,
  res: NextApiResponse<SearchCitiesResponse>
): void {
  const searchQuery =
    'query' in req.query && typeof req.query.query === 'string'
      ? req.query.query
      : undefined

  if (searchQuery === undefined) {
    res.status(400).send('"query" param is missing')
    return
  }

  const searchResults = searchInstance
    .search(searchQuery)
    .slice(0, maxResults) as SearchCityItem[]

  res.status(200).json(searchResults)
}
