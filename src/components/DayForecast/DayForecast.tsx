import { useHookstate } from '@hookstate/core'
import { globalState } from '../../state'
import commonStyles from '../../styles/common.module.scss'
import { Flex } from '../Flex'
import styles from './DayForecast.module.scss'

export const DayForecast = (): JSX.Element => {
  const city = useHookstate(globalState.city)

  return (
    <Flex as='section' className={commonStyles.flexGrow} flexDirection='column'>
      <h2 className={commonStyles.sectionTitle}>
        <Flex justifyContent='space-between'>
          <span>Day Forecast</span>
          <span>8 2</span>
        </Flex>
      </h2>

      <Flex
        className={[commonStyles.flexGrow, styles.wrapper].join(' ')}
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
      >
        <div className={styles.temperature}>6°</div>
        <div className={styles.city}>{city.value.name}</div>
        <div>Cloudy</div>
      </Flex>
    </Flex>
  )
}
