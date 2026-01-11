import type { Event } from '@/payload-types'

type Props = Pick<Event, 'isFree' | 'minPrice' | 'maxPrice'>

export const getPriceDisplay = ({ isFree, minPrice, maxPrice }: Props): string => {
  if (isFree) {
    return 'Keine Preisangabe'
  }

  if (minPrice === null || minPrice === undefined) {
    return 'Keine Preisangabe'
  }

  const minPriceEuro = (minPrice / 100).toFixed(2)
  //   const maxPriceEuro = maxPrice ? (maxPrice / 100).toFixed(2) : null

  if (minPrice === maxPrice) {
    return `€${minPriceEuro}`
  }

  return `Ab €${minPriceEuro}`
}
