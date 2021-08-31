import { useHookstate } from '@hookstate/core'
import { RefObject, useLayoutEffect, useState } from 'react'
import { api } from '../../api'
import {
  SearchCitiesResponse,
  SearchCityItem,
} from '../../pages/api/searchCities'
import { globalState } from '../../state'
import { Flex } from '../Flex'
import styles from './Autocomplete.module.scss'

// make a call to initialize search API for performance
void api.searchCities('aaaaaa')()

export const Autocomplete = (props: {
  headerElem: RefObject<HTMLElement>
  onItemSelect: (city: SearchCityItem) => void
}): JSX.Element => {
  const searchResults = useHookstate<SearchCitiesResponse | undefined>(
    undefined
  )
  const [inputValue, setInputValue] = useState('')
  const [headerBottom, setHeaderBottom] = useState<number>()

  useLayoutEffect(() => {
    if (props.headerElem.current) {
      setHeaderBottom(props.headerElem.current.getBoundingClientRect().bottom)
    }
  }, [props.headerElem])

  const makeNewSearch = (searchQuery: string): void => {
    if (!searchResults.promised && searchQuery.length > 1) {
      searchResults.set(api.searchCities(searchQuery))
    }
  }

  return (
    <>
      <Flex className={styles.autocomplete} alignItems='center'>
        {/* TODO: search icon */}
        <input
          value={inputValue}
          onInput={(e) => {
            const value = (e.target as HTMLInputElement).value
            setInputValue(value)
            makeNewSearch(value)
          }}
        />
        <button onClick={() => setInputValue('')}>X</button>
      </Flex>

      <div
        className={styles.suggestions}
        style={{ top: headerBottom ? `${headerBottom}px` : undefined }}
      >
        {searchResults.promised ? (
          <div>Loading</div>
        ) : typeof searchResults.value === 'string' ? (
          <div>Error: {searchResults.value}</div>
        ) : (
          searchResults.value?.map((item) => (
            <a
              key={item.id}
              className={styles.suggestionsItem}
              href='javascript:void(0)'
              onClick={() => props.onItemSelect(item)}
            >
              {item.name}, {item.country}
            </a>
          ))
        )}
      </div>
    </>
  )
}
