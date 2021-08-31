import { useHookstate } from '@hookstate/core'
import { useRef, useState } from 'react'
import { globalState } from '../../state'
import { Autocomplete } from '../Autocomplete/Autocomplete'
import { Flex } from '../Flex'
import styles from './Header.module.scss'

export const Header = (): JSX.Element => {
  const city = useHookstate(globalState.city)
  const [isConfiguring, setIsConfiguring] = useState(false)
  const headerElem = useRef<HTMLElement>(null)

  return (
    <header ref={headerElem}>
      {isConfiguring ? (
        <>
          <Flex
            as='nav'
            className={styles.nav}
            alignItems='center'
            justifyContent='space-between'
            gap='1rem'
          >
            <button onClick={() => setIsConfiguring(false)}>Done</button>
            <Flex
              className={styles.labels}
              flexDirection='column'
              justifyContent='center'
            >
              <h1>Location</h1>
              <h3 className={styles.city}>{city.get()}</h3>
            </Flex>
          </Flex>
          <Autocomplete headerElem={headerElem} />
        </>
      ) : (
        <Flex
          as='nav'
          className={styles.nav}
          alignItems='center'
          justifyContent='space-between'
          gap='1rem'
        >
          <button disabled>Logo</button>
          <Flex
            className={styles.labels}
            flexDirection='column'
            justifyContent='center'
          >
            <h1>Weather Forecast</h1>
            <h3 className={styles.city}>{city.get()}</h3>
          </Flex>
          <button onClick={() => setIsConfiguring(true)}>Settings</button>
        </Flex>
      )}
    </header>
  )
}
