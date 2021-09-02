import { OpenWeatherSharedWeatherData } from '../pages/api/getWeather'
import { isOneOf } from '../utils'
import { Icon } from './Icon'

export const WeatherIcon = (props: {
  type: OpenWeatherSharedWeatherData['weather'][number]['main'] | undefined
  width?: number
  className?: string
}): JSX.Element => {
  const iconsMap = {
    Rain: 'weatherRain',
    Clouds: 'weatherClouds',
    Clear: 'weatherSun',
  } as const
  const iconId = isOneOf(
    props.type,
    Object.keys(iconsMap) as (keyof typeof iconsMap)[]
  )
    ? iconsMap[props.type]
    : undefined
  return iconId ? (
    <Icon id={iconId} width={props.width} className={props.className} />
  ) : (
    <></>
  )
}
