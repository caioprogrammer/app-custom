import React, { useState, useEffect, useRef } from 'react'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'

import { KitInfo, KitValue } from '../typings/Sku'
import { HANDLES_SHELF } from './DefaultProduct'

interface Props {
  kitInfo: KitInfo
  handleAddToCart: Function
}
interface Sku {
  sku: string
  dimensions: { Tamanho: string }
  available: boolean
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

export const KitProduct: React.FC<Props> = function ({
  kitInfo,
  handleAddToCart,
}) {
  const wrapperElement: any = useRef(null)
  const { handles } = useCssHandles(HANDLES_SHELF)

  const [skuSelected, setSkuSelected] = useState([
    { id: '0', seller: 1, quantity: 1 },
    { id: '0', seller: 1, quantity: 1 },
  ])
  const [feedback, setFeedback] = useState('')

  const [kitData, setKitData] = useState<KitDataState>({
    top: [],
    bottom: [],
  })

  const preventLink = function (e: any) {
    e.preventDefault()
    e.stopPropagation()
  }
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

  const hoverDelay = function (el: HTMLDivElement) {
    let delay: any
    el.addEventListener('mouseenter', function () {
      if (!el.classList.contains('loaded')) {
        delay = setTimeout(function () {
          el.classList.add('loaded')
          renderKit()
        }, 100)
      }
    })
    el.addEventListener('mouseleave', function () {
      clearInterval(delay)
    })
  }

  useEffect(function () {
    if (wrapperElement && wrapperElement.current) {
      const el = wrapperElement.current
      const hoverEventTarget = el.parentElement.parentElement
      hoverDelay(hoverEventTarget)
    }
  }, [])

  const getItemClass = function (
    availability: boolean,
    item: Sku,
    index: number
  ) {
    if (!availability) {
      return `${handles['shelf__skus--item']} ${handles['shelf__skus--item--unavailable']}`
    }
    return applyModifiers(
      handles['shelf__skus--item'],
      skuSelected[index].id === item.sku ? 'selected' : ''
    )
  }

  const selectSku = function (itemId: string, index: number) {
    const data = [...skuSelected]
    data[index].id = itemId
    setSkuSelected(() => data)
  }

  const addToCart = function () {
    const skus = skuSelected.filter(function (item) {
      return item.id !== '0'
    })
    if (!skus.length) {
      setFeedback('selecione um tamanho!')
    } else {
      handleAddToCart(skus)
    }
  }

  return (
    <div
      className={`${handles.shelf} vtex-shelf-variations`}
      onClick={preventLink}
      ref={wrapperElement}
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
      <div className={handles['shelf__skus--container']}>
        <ul className={handles.shelf__skus}>
          {kitData.top
            ? kitData.top.map(function (item) {
                return (
                  <li
                    key={item.sku}
                    className={getItemClass(item.available, item, 0)}
                    onClick={selectSku.bind('', item.sku, 0)}
                  >
                    {item.dimensions.Tamanho}
                  </li>
                )
              })
            : 'Esgotado'}
        </ul>
        <ul className={handles.shelf__skus}>
          {kitData.bottom
            ? kitData.bottom.map(function (item) {
                return (
                  <li
                    key={item.sku}
                    onClick={selectSku.bind('', item.sku, 1)}
                    className={getItemClass(item.available, item, 1)}
                  >
                    {item.dimensions.Tamanho}
                  </li>
                )
              })
            : 'Esgotado'}
        </ul>
      </div>
      <button className={handles.shelf__buybutton} onClick={addToCart}>
        adicionar à sacola
      </button>
    </div>
  )
}
