import { useHookstate } from '@hookstate/core'
import { useEffect } from 'react'
import { api } from '../api'
import { globalState } from '../state'
import commonStyles from '../styles/common.module.scss'
import { DayForecast } from './DayForecast/DayForecast'
import { DocumentHead } from './DocumentHead'
import { Flex } from './Flex'
import { Header } from './Header/Header'
import { WeekForecast } from './WeekForecast/WeekForecast'

export const WeatherApp = (): JSX.Element => {
  const city = useHookstate(globalState.city)
  const weather = useHookstate(globalState.weather)

  useEffect(() => {
    weather.set(api.getWeather(city.value.id))
  }, [city.value.id])

  return (
    <Flex flexDirection='column'>
      <DocumentHead pageTitle='Weather Forecast' />
      <Header />

      <Flex as='main' flexDirection='column' className={commonStyles.flexGrow}>
        <DayForecast />
        <WeekForecast />
      </Flex>
    </Flex>
  )
}
