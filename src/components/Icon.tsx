import clear from '../../public/icons/clear.svg'
import cloud from '../../public/icons/cloud.svg'
import search from '../../public/icons/search.svg'
import settings from '../../public/icons/settings.svg'

// NextJs resolves SVG as any
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const icons = {
  clear: ['Clear icon', clear as StaticImageData],
  cloud: ['Cloud icon', cloud as StaticImageData],
  search: ['Search icon', search as StaticImageData],
  settings: ['Gear icon', settings as StaticImageData],
} as const
/* eslint-enable @typescript-eslint/no-unsafe-assignment */

export const Icon = (props: {
  id: keyof typeof icons
  className?: string
  width?: number
}): JSX.Element => {
  return (
    <img
      className={props.className}
      src={icons[props.id][1].src}
      width={props.width ?? icons[props.id][1].width}
      alt={icons[props.id][0]}
    />
  )
}
