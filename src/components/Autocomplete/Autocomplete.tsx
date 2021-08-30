import { RefObject, useEffect, useState } from 'react'
import { Flex } from '../Flex'
import styles from './Autocomplete.module.scss'

const cities = ['Kaunas', 'Vilnius', 'Klaipeda', 'Siauliai', 'Panevezys']

export const Autocomplete = (props: {
  headerElem: RefObject<HTMLElement>
}): JSX.Element => {
  const [inputValue, setInputValue] = useState('')
  const [headerBottom, setHeaderBottom] = useState<number>()

  useEffect(() => {
    if (props.headerElem.current) {
      setHeaderBottom(props.headerElem.current.getBoundingClientRect().bottom)
    }
  }, [props.headerElem])

  return (
    <>
      <Flex className={styles.autocomplete} alignItems='center'>
        {/* TODO: search icon */}
        <input
          value={inputValue}
          onInput={(e) => setInputValue((e.target as HTMLInputElement).value)}
        />
        <button onClick={() => setInputValue('')}>X</button>
      </Flex>

      <div
        className={styles.suggestions}
        style={{ top: headerBottom ? `${headerBottom}px` : undefined }}
      >
        {cities.map((city) => (
          <div key={city}>{city}</div>
        ))}
      </div>
    </>
  )
}
