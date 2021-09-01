import cloud from '../../public/icons/cloud.svg'
import settings from '../../public/icons/settings.svg'

// NextJs resolves SVG as any
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const icons = {
  cloud: ['Cloud icon', cloud as StaticImageData],
  settings: ['Gear icon', settings as StaticImageData],
} as const
/* eslint-enable @typescript-eslint/no-unsafe-assignment */

export const Icon = (props: {
  id: keyof typeof icons
  width?: number
}): JSX.Element => {
  return (
    <img
      src={icons[props.id][1].src}
      width={props.width ?? icons[props.id][1].width}
      alt={icons[props.id][0]}
    />
  )
}
