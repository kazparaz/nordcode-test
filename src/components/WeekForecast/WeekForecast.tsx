import { useHookstate } from '@hookstate/core'
import { globalState } from '../../state'
import commonStyles from '../../styles/common.module.scss'
import { Flex } from '../Flex'
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
  const highestTemperature = dailyWeather?.reduce(
    (acc, item) => Math.max(acc, item.temp.day, item.temp.night),
    0
  )
  return (
    <section>
      <h2 className={commonStyles.sectionTitle}>Week Forecast</h2>

      <Flex className={styles.itemsWrapper}>
        {highestTemperature !== undefined &&
          dailyWeather?.map((item) => (
            <div key={item.dt} className={styles.item}>
              <h3 className={styles.itemDay}>{item.dayName}</h3>

              <p className={styles.itemTemperatures}>
                <span className={styles.itemTempDay}>
                  {item.temp.day.toFixed()}
                </span>
                <span className={styles.itemTempNight}>
                  {item.temp.night.toFixed()}
                </span>
              </p>

              <Flex
                className={styles.itemBarsWrapper}
                alignItems='flex-end'
                gap='1px'
              >
                {[
                  { className: styles.itemBarDay, value: item.temp.day },
                  { className: styles.itemBarNight, value: item.temp.night },
                ].map((bar) => (
                  <div
                    key={bar.className}
                    className={bar.className}
                    style={{
                      height: `${(bar.value / highestTemperature) * 100}%`,
                    }}
                  />
                ))}
              </Flex>
            </div>
          ))}
      </Flex>
    </section>
  )
}
