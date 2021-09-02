import { useHookstate } from '@hookstate/core'
import { Persistence } from '@hookstate/persistence'
import { useEffect } from 'react'
import { api } from '../api'
import { globalState } from '../state'
import commonStyles from '../styles/common.module.scss'
import { DayForecast } from './DayForecast/DayForecast'
import { DocumentHead } from './DocumentHead'
import { Flex } from './Flex'
import { Header } from './Header/Header'
import { Icon } from './Icon'
import { WeekForecast } from './WeekForecast/WeekForecast'

export const WeatherApp = (): JSX.Element => {
  const city = useHookstate(globalState.city)
  const weather = useHookstate(globalState.weather)

  if (process.browser) {
    city.attach(Persistence('weatherApp:city'))
  }

  useEffect(() => {
    weather.set(api.getWeather(city.value.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city.value.id])

  return (
    <Flex flexDirection='column'>
      <DocumentHead pageTitle='Weather Forecast' />
      <Header />

      {weather.promised ? (
        <Flex
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          className={commonStyles.flexGrow}
        >
          <Icon id='loader' width={50} />
        </Flex>
      ) : (
        <Flex
          as='main'
          flexDirection='column'
          className={commonStyles.flexGrow}
        >
          <DayForecast />
          <WeekForecast />
        </Flex>
      )}
    </Flex>
  )
}
