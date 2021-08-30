import { Flex } from '../Flex'
import styles from './Header.module.scss'

export const Header = (): JSX.Element => {
  return (
    <Flex
      as='header'
      className={styles.header}
      alignItems='center'
      justifyContent='space-between'
      gap={1}
    >
      <button disabled>Logo</button>

      <div className={styles.labels}>
        <h1>Weather Forecast</h1>
        <h3 className={styles.city}>City</h3>
      </div>

      <button>Settings</button>
    </Flex>
  )
}
