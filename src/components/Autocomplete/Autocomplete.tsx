import { useHookstate } from '@hookstate/core'
import { RefObject, useEffect, useLayoutEffect, useState } from 'react'
import { api } from '../../api'
import {
  SearchCitiesResponse,
  SearchCityItem,
} from '../../pages/api/searchCities'
import commonStyles from '../../styles/common.module.scss'
import { ClearButton } from '../ClearButton/ClearButton'
import { Flex } from '../Flex'
import { Icon } from '../Icon'
import styles from './Autocomplete.module.scss'

const searchQueryMinLength = 2

const Highlight = (props: {
  fullValue: string
  searchValue: string
}): JSX.Element => {
  const regex = RegExp(`(${props.searchValue})`, 'gi')
  const replacement = '<strong>$1</strong>'
  const newHTML = props.fullValue.replace(regex, replacement)
  return <span dangerouslySetInnerHTML={{ __html: newHTML }} />
}

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

  useEffect(() => {
    if (inputValue.length < searchQueryMinLength) {
      searchResults.set(undefined)
    } else if (!searchResults.promised) {
      searchResults.set(api.searchCities(inputValue))
    }
  }, [inputValue])

  return (
    <>
      <Flex className={styles.autocomplete} alignItems='center'>
        <Icon className={styles.searchIcon} id='search' width={13} />
        <input
          className={styles.input}
          value={inputValue}
          onInput={(e) => setInputValue((e.target as HTMLInputElement).value)}
        />
        {inputValue && (
          <ClearButton
            className={styles.clearIcon}
            onClick={() => setInputValue('')}
          >
            <Icon id='clear' width={15} />
          </ClearButton>
        )}
      </Flex>

      <Flex
        flexDirection='column'
        className={styles.suggestions}
        style={{ top: headerBottom ? `${headerBottom}px` : undefined }}
      >
        {searchResults.promised ? (
          <Flex
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            className={commonStyles.flexGrow}
          >
            <Icon id='loader' width={50} />
          </Flex>
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
              <Highlight fullValue={item.name} searchValue={inputValue} />,{' '}
              <Highlight fullValue={item.country} searchValue={inputValue} />
            </a>
          ))
        )}
      </Flex>
    </>
  )
}
