import { useHookstate } from '@hookstate/core'
import { globalState } from '../../state'
import commonStyles from '../../styles/common.module.scss'
import { Flex } from '../Flex'
import styles from './DayForecast.module.scss'

export const DayForecast = (): JSX.Element => {
  const city = useHookstate(globalState.city)
  const weather = useHookstate(globalState.weather)
  const weatherData =
    !weather.promised &&
    typeof weather.value === 'object' &&
    'current' in weather.value
      ? weather.value
      : undefined

  return (
    <Flex as='section' className={commonStyles.flexGrow} flexDirection='column'>
      <h2 className={commonStyles.sectionTitle}>
        <Flex justifyContent='space-between'>
          <span>Day Forecast</span>
          <span>
            <span className={styles.tempDay}>
              {weatherData?.daily[0]?.temp.day
                ? Math.round(weatherData?.daily[0]?.temp.day)
                : undefined}
            </span>
            <span className={styles.tempNight}>
              {weatherData?.daily[0]?.temp.night
                ? Math.round(weatherData?.daily[0]?.temp.night)
                : undefined}
            </span>
          </span>
        </Flex>
      </h2>

      <Flex
        className={[commonStyles.flexGrow, styles.wrapper].join(' ')}
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
      >
        <div className={styles.tempCurrent}>
          {weatherData?.current.temp
            ? `${Math.round(weatherData?.current.temp)}°`
            : undefined}
        </div>
        <div className={styles.city}>{city.value.name}</div>
        <div>{weatherData?.current.weather[0]?.main}</div>
      </Flex>
    </Flex>
  )
}
