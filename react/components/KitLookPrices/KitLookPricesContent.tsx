import React, { useEffect, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import getFormattedPrice from '../utils/getFormatedPrice'
import { KitInfo, KitValue } from '../ShelfVariations/typings/Sku'

const HANDLES_CSS = [
  'KitLookPricesContent__container',
  'KitLookPricesContent__container--text',
] as const

interface KitLookPricesContentProps {
  kitInfo: KitInfo
}

interface Sku {
  sku: string
  dimensions: { Tamanho: string }
  available: boolean
  bestPrice: number
}
interface Product {
  skus: Sku[]
}
interface KitDataState {
  top: Sku[]
  bottom: Sku[]
}

interface ResponseKit {
  name: KitValue
  product: Product
}

export const KitLookPricesContent = ({
  kitInfo,
}: KitLookPricesContentProps) => {
  const { handles } = useCssHandles(HANDLES_CSS)

  const [kitData, setKitData] = useState<KitDataState>({
    top: [],
    bottom: [],
  })

  const renderKit = async function () {
    const requests = kitInfo.specifications.map(item => {
      return fetch(
        `/api/catalog_system/pub/products/variations/${item.values[0]}`
      )
        .then(r => r.json())
        .then(r => ({ name: item, product: r }))
    })

    await Promise.all(requests).then(function (data) {
      const kitskus: KitDataState = { top: [], bottom: [] }

      data.forEach(function (item) {
        const { name, product }: ResponseKit = item
        if (name.originalName === 'Top') {
          kitskus.top = product.skus
        }
        if (name.originalName === 'Bottom') {
          kitskus.bottom = product.skus
        }
      })
      setKitData(kitskus)
    })
  }

  useEffect(() => {
    renderKit()
  }, [])

  const getPriceTop = (): any => {
    if (!kitData.top) return 'Esgotado'

    return kitData.top && kitData.top[0]?.bestPrice > 9999876
      ? 'Esgotado'
      : getFormattedPrice(kitData?.top[0]?.bestPrice / 100)
  }
  const getPriceBottom = () => {
    if (!kitData.bottom) return 'Esgotado'

    return kitData.bottom[0]?.bestPrice > 9999876
      ? 'Esgotado'
      : getFormattedPrice(kitData?.bottom[0]?.bestPrice / 100)
  }

  return (
    <div className={handles.KitLookPricesContent__container}>
      <p className={handles['KitLookPricesContent__container--text']}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="16"
          viewBox="0 0 20 16"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.72973 13.4206C5.63267 12.6346 4.86325 10.9163 4.86325 7.77234V0.174324C4.52185 0.0869913 3.78785 -0.0352749 3.58302 0.174324C3.52175 0.237019 3.51077 0.478753 3.49293 0.871517C3.43622 2.12011 3.3102 4.895 1.2788 8.29634C-1.53775 13.0123 1.02935 15.242 2.04649 15.6323C3.86056 16.3284 6.61315 15.7008 8.87905 15.1841C9.17176 15.1174 9.45634 15.0525 9.72973 14.9925C10.0183 15.0525 10.3187 15.1174 10.6277 15.1841C13.0194 15.7008 15.925 16.3284 17.8398 15.6323C18.9135 15.242 21.6232 13.0123 18.6502 8.29634C16.5059 4.895 16.3729 2.12011 16.313 0.871518C16.2942 0.478753 16.2826 0.237019 16.2179 0.174324C16.0017 -0.0352748 15.2269 0.0869913 14.8666 0.174324V7.77234C14.8666 10.9163 14.0544 12.6346 9.72973 13.4206Z"
            fill="#34354C"
          />
        </svg>
        {getPriceTop()}
      </p>
      <p className={handles['KitLookPricesContent__container--text']}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="12"
          viewBox="0 0 20 12"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 0.707031H9.41177H10.5882H20V2.76585C19.2369 2.86389 17.1955 3.47174 15.1351 5.1188C13.0747 6.76585 11.6057 9.92272 11.1288 11.2953H10.5882H9.41177H8.87122C8.39428 9.92272 6.92528 6.76585 4.86486 5.1188C2.80445 3.47174 0.763116 2.86389 0 2.76585V0.707031Z"
            fill="#34354C"
          />
        </svg>
        {getPriceBottom()}
      </p>
    </div>
  )
}
