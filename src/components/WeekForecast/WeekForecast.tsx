import commonStyles from '../../styles/common.module.scss'
import { Flex } from '../Flex'
import styles from './WeekForecast.module.scss'

const forecast = [
  {
    day: 'FRI',
    temperature: [8, 4],
  },
  {
    day: 'SAT',
    temperature: [7, 2],
  },
  {
    day: 'SUN',
    temperature: [4, 3],
  },
  {
    day: 'MON',
    temperature: [7, 4],
  },
  {
    day: 'TUE',
    temperature: [8, 8],
  },
  {
    day: 'WED',
    temperature: [11, 5],
  },
  {
    day: 'THU',
    temperature: [7, 6],
  },
] as const

export const WeekForecast = (): JSX.Element => {
  const highestTemperature = forecast.reduce(
    (acc, item) => Math.max(acc, ...item.temperature),
    0
  )
  return (
    <section>
      <h2 className={commonStyles.sectionTitle}>Week Forecast</h2>

      <Flex className={styles.itemsWrapper}>
        {forecast.map((item) => (
          <div key={item.day} className={styles.item}>
            <h3 className={styles.itemDay}>{item.day}</h3>

            <p className={styles.itemTemperature}>
              {item.temperature[0]} {item.temperature[1]}
            </p>

            <Flex
              className={styles.itemBarsWrapper}
              alignItems='flex-end'
              gap='1px'
            >
              {[
                { className: styles.itemBarDay, value: item.temperature[0] },
                { className: styles.itemBarNight, value: item.temperature[1] },
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
