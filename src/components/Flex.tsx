import { isDefined } from '../utils'

export const Flex = (props: {
  as?: keyof JSX.IntrinsicElements
  className?: string
  flexWrap?: boolean
  flexDirection?: React.CSSProperties['flexDirection']
  justifyContent?: React.CSSProperties['justifyContent']
  justifyItems?: React.CSSProperties['justifyItems']
  alignContent?: React.CSSProperties['alignContent']
  alignItems?: React.CSSProperties['alignItems']
  gap?: string
  children: React.ReactNode
  style?: React.CSSProperties
}): JSX.Element => {
  const TagName = props.as ?? 'div'

  return (
    <TagName
      className={['flex', props.className].filter(isDefined).join(' ')}
      style={{
        display: 'flex',
        flexWrap: props.flexWrap ? 'wrap' : undefined,
        flexDirection: props.flexDirection,
        justifyContent: props.justifyContent,
        justifyItems: props.justifyItems,
        alignContent: props.alignContent,
        alignItems: props.alignItems,
        gap: props.gap ? props.gap : undefined,
        ...props.style,
      }}
    >
      {props.children}
    </TagName>
  )
}
