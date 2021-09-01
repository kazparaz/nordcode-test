import { isDefined } from '../../utils'
import styles from './ClearButton.module.scss'

export const ClearButton = (props: {
  className?: string
  children: React.ReactNode
  onClick?: () => void
}): JSX.Element => {
  return (
    <button
      className={[styles.clearButton, props.className]
        .filter(isDefined)
        .join(' ')}
      onClick={props.onClick}
      disabled={props.onClick === undefined}
    >
      {props.children}
    </button>
  )
}
