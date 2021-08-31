import Fuse from 'fuse.js'
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

type SearchableItems = {
  id: number
  name: string
  country: string
}

type ApiResponse = Fuse.FuseResult<SearchableItems>[] | string

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cities = require('./cities.json') as CityItem[]

const searchableItems = cities.map<SearchableItems>(
  ({ id, name, country }) => ({ id, name, country })
)

const searchIndex = new Fuse(searchableItems, {
  includeMatches: true,
  threshold: 0.2,
  keys: ['name', 'country'],
})

const maxResults = 20

export default function requestHandler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
): void {
  const searchQuery =
    'query' in req.query && typeof req.query.query === 'string'
      ? req.query.query
      : undefined

  if (!searchQuery) {
    res.status(400).send('Invalid "query" param')
    return
  }

  const searchResults = searchIndex.search(searchQuery).slice(0, maxResults)
  res.status(200).json(searchResults)
}
