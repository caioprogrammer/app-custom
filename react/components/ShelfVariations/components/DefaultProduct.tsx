import React, { useState } from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'

import { Sku } from '../typings/Sku'

export const HANDLES_SHELF = [
  'shelf',
  'shelf__skus',
  'shelf__skus--item',
  'shelf__skus--item--unavailable',
  'shelf__buybutton',
  'shelf__skus--container',
] as const

interface Props {
  skus: Sku[]
  availability: boolean
  handleAddToCart: Function
}

interface IObjectKeys {
  [key: string]: string | number
}

export const DefaultProduct: React.FC<Props> = function ({
  skus,
  availability,
  handleAddToCart,
}) {
  const { handles } = useCssHandles(HANDLES_SHELF)
  const [skuSelected, setSkuSelected] = useState('')
  const [feedback, setFeedback] = useState('')

  const preventLink = function (e: any) {
    e.preventDefault()
    e.stopPropagation()
  }

  const getSizeOrder = function (name: string) {
    const sizes: IObjectKeys = {
      PP: '0',
      P: '1',
      M: '2',
      G: '3',
      GG: '4',
    }
    if (sizes[name]) {
      return sizes[name]
    }
    return ''
  }

  const renderSkus = function () {
    const getItemClass = function (availability: boolean, item: Sku) {
      if (!availability) {
        return `${handles['shelf__skus--item']} ${handles['shelf__skus--item--unavailable']}`
      }
      return applyModifiers(
        handles['shelf__skus--item'],
        skuSelected === item.itemId ? 'selected' : ''
      )
    }
    return (
      <ul className={handles.shelf__skus}>
        {skus.map(function (item: Sku) {
          const availabilitySku = !!item.sellers[0].commertialOffer
            .AvailableQuantity

          const name = (function () {
            if (item.name.split(' ').includes('PP')) return 'PP'
            if (item.name.split(' ').includes('P')) return 'P'
            if (item.name.split(' ').includes('M')) return 'M'
            if (item.name.split(' ').includes('G')) return 'G'
            if (item.name.split(' ').includes('GG')) return 'GG'

            return null
          })()

          return (
            <li
              className={getItemClass(availabilitySku, item)}
              key={item.name}
              onClick={selectSku.bind('', item.itemId)}
              style={{ order: getSizeOrder(item.name) }}
            >
              {name}
            </li>
          )
        })}
      </ul>
    )
  }

  const selectSku = function (itemId: string) {
    setSkuSelected(() => itemId)
  }

  const addToCart = function () {
    if (!skuSelected) {
      setFeedback('selecione um tamanho!')
    } else {
      setFeedback('')
      const item = { id: parseInt(skuSelected), seller: 1, quantity: 1 }
      handleAddToCart(item)
    }
  }

  return (
    <div
      className={`${handles.shelf} vtex-shelf-variations`}
      onClick={preventLink}
    >
      {feedback.length ? (
        <p
          style={{
            display: 'block',
            color: '#000',
            fontSize: '14px',
            margin: '10px 0 0',
          }}
        >
          {feedback}
        </p>
      ) : (
        ''
      )}

      {availability ? renderSkus() : 'indisponível'}
      <button className={handles.shelf__buybutton} onClick={addToCart}>
        adicionar à sacola
      </button>
    </div>
  )
}
