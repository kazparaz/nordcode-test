import commonStyles from '../styles/common.module.scss'
import { DayForecast } from './DayForecast/DayForecast'
import { DocumentHead } from './DocumentHead'
import { Flex } from './Flex'
import { Header } from './Header/Header'
import { WeekForecast } from './WeekForecast/WeekForecast'

export const WeatherApp = (): JSX.Element => {
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
