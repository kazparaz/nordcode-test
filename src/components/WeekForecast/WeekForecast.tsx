import { useHookstate } from '@hookstate/core'
import { globalState } from '../../state'
import commonStyles from '../../styles/common.module.scss'
import { Flex } from '../Flex'
import { WeatherIcon } from '../WeatherIcon'
import styles from './WeekForecast.module.scss'

export const WeekForecast = (): JSX.Element => {
  const weather = useHookstate(globalState.weather)
  const weatherData =
    !weather.promised &&
    typeof weather.value === 'object' &&
    'current' in weather.value
      ? weather.value
      : undefined
  const dailyWeather = weatherData?.daily.slice(1).map((item) => ({
    ...item,
    dayName: new Date(item.dt * 1000).toLocaleDateString('en', {
      weekday: 'short',
    }),
  }))
  const highestTemp = dailyWeather?.reduce(
    (acc, item) =>
      Math.max(acc, Math.round(item.temp.day), Math.round(item.temp.night)),
    0
  )
  const lowestTemp = dailyWeather?.reduce(
    (acc, item) =>
      Math.min(acc, Math.round(item.temp.day), Math.round(item.temp.night)),
    0
  )
  // (hTemp - lTemp) = 100%
  // (0 - lTemp) = x%
  const positionZeroTemp =
    highestTemp !== undefined && lowestTemp !== undefined
      ? ((0 - lowestTemp) * 100) / (highestTemp - lowestTemp)
      : undefined

  return (
    <section>
      <h2 className={commonStyles.sectionTitle}>Week Forecast</h2>

      <Flex className={styles.itemsWrapper}>
        {highestTemp !== undefined &&
          lowestTemp !== undefined &&
          positionZeroTemp !== undefined &&
          dailyWeather?.map((item) => (
            <div key={item.dt} className={styles.item}>
              <h3 className={styles.itemDay}>{item.dayName}</h3>

              <div className={styles.itemWeatherIconWrapper}>
                <WeatherIcon
                  className={styles.itemWeatherIcon}
                  type={item.weather[0]?.main}
                />
              </div>

              <p className={styles.itemTemperatures}>
                <span className={styles.itemTempDay}>
                  {Math.round(item.temp.day)}
                </span>
                <span className={styles.itemTempNight}>
                  {Math.round(item.temp.night)}
                </span>
              </p>

              <div className={styles.itemBarsWrapper}>
                <div
                  className={styles.itemBarZeroLine}
                  style={{ bottom: `${positionZeroTemp}%` }}
                />
                {[
                  {
                    className: styles.itemBarDay,
                    value: Math.round(item.temp.day),
                  },
                  {
                    className: styles.itemBarNight,
                    value: Math.round(item.temp.night),
                  },
                ].map((bar) => {
                  // (hTemp - lTemp) = 100%
                  // (v - lTemp) = x%
                  const positionBarTemp =
                    ((bar.value - lowestTemp) * 100) /
                    (highestTemp - lowestTemp)
                  return (
                    <div
                      key={bar.className}
                      className={`${bar.className} ${
                        bar.value > 0
                          ? styles.itemBarTipTop
                          : bar.value < 0
                          ? styles.itemBarTipBottom
                          : ''
                      }`}
                      style={
                        bar.value > 0
                          ? {
                              top: `${100 - positionBarTemp}%`,
                              bottom: `${positionZeroTemp}%`,
                            }
                          : {
                              top: `${100 - positionZeroTemp}%`,
                              bottom: `${positionBarTemp}%`,
                            }
                      }
                    />
                  )
                })}
              </div>
            </div>
          ))}
      </Flex>
    </section>
  )
}
