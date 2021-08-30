import React, { CSSProperties } from 'react'
import { isDefined } from '../utils'

export const Flex = (props: {
  as?: keyof JSX.IntrinsicElements
  className?: string
  flexWrap?: boolean
  flexDirection?: CSSProperties['flexDirection']
  justifyContent?: CSSProperties['justifyContent']
  justifyItems?: CSSProperties['justifyItems']
  alignContent?: CSSProperties['alignContent']
  alignItems?: CSSProperties['alignItems']
  gap?: string
  children: React.ReactNode
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
      }}
    >
      {props.children}
    </TagName>
  )
}
