import { useHookstate } from '@hookstate/core'
import { useRef, useState } from 'react'
import { SearchCityItem } from '../../pages/api/searchCities'
import { globalState } from '../../state'
import { Autocomplete } from '../Autocomplete/Autocomplete'
import { ClearButton } from '../ClearButton/ClearButton'
import { Flex } from '../Flex'
import { Icon } from '../Icon'
import styles from './Header.module.scss'

export const Header = (): JSX.Element => {
  const city = useHookstate(globalState.city)
  const [isConfiguring, setIsConfiguring] = useState(false)
  const headerElem = useRef<HTMLElement>(null)

  const onItemSelect = (item: SearchCityItem): void => {
    city.set({ ...item })
    setIsConfiguring(false)
  }

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
            <ClearButton
              className={styles.doneLink}
              onClick={() => setIsConfiguring(false)}
            >
              Done
            </ClearButton>
            <Flex
              className={styles.labels}
              flexDirection='column'
              justifyContent='center'
            >
              <h1>Location</h1>
              <h3 className={styles.city}>{city.value.name}</h3>
            </Flex>
          </Flex>
          <Autocomplete headerElem={headerElem} onItemSelect={onItemSelect} />
        </>
      ) : (
        <Flex
          as='nav'
          className={styles.nav}
          alignItems='center'
          justifyContent='space-between'
          gap='1rem'
        >
          <ClearButton>
            <Icon id='cloud' width={25} />
          </ClearButton>
          <Flex
            className={styles.labels}
            flexDirection='column'
            justifyContent='center'
          >
            <h1>Weather Forecast</h1>
            <h3 className={styles.city}>{city.value.name}</h3>
          </Flex>
          <ClearButton onClick={() => setIsConfiguring(true)}>
            <Icon id='settings' width={25} />
          </ClearButton>
        </Flex>
      )}
    </header>
  )
}
