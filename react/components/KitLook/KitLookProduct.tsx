import React, { useEffect, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { canUseDOM } from 'vtex.render-runtime'

import { useKitLookContext } from '../../contexts/KitLookContext/KitLookContext'
import { HANDLES_KITLOOK } from './KitLookContent'
import { KitLookProduct, KitLookSkus } from './types'

interface KitLookProductProps {
  product?: KitLookProduct
  inputName: 'skuTop' | 'skuBottom'
}

export const Product = ({ product, inputName }: KitLookProductProps) => {
  if (!canUseDOM) {
    return <></>
  }
  const { dispatch, state } = useKitLookContext()
  const { handles } = useCssHandles(HANDLES_KITLOOK)
  const [selectedSku, setSelectedSku] = useState('')
  const [itemToCart, setItemToCart] = useState({
    id: 0,
    seller: 1,
    quantity: 1,
  })
  
  const filterAvailableSku = product?.available? product.skus.filter((item: KitLookSkus) => {
    return item.available === true
  }): false

  function handleSelectedSku(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target
    const item = {
      id: +value,
      seller: 1,
      quantity: 1,
    }

    setItemToCart(item)
  }

  useEffect(() => {
    const toCartCondition =
      inputName === 'skuTop' ? 'SET_TOPTOCART' : 'SET_BOTTOMTOCART'
    const valueCondition =
      inputName === 'skuTop' ? 'SET_TOP_VALUE' : 'SET_BOTTOM_VALUE'

    const bottomPrice = state.bottomProduct?.skus[0].bestPrice ?? 0
    const topPrice = state.topProduct?.skus[0].bestPrice ?? 0
    const priceCondition = inputName === 'skuTop' ? topPrice : bottomPrice

    dispatch({
      type: toCartCondition,
      value: itemToCart,
    })
    dispatch({
      type: valueCondition,
      value: priceCondition,
    })
  }, [selectedSku])

  return (
    <div className={handles.kitLookProduct_container}>
      {
        product?.available?
          <img 
            src={product.skus[0].image}
            alt={product.skus[0].skuname}
            className={handles.kitLookProduct_img}
          />
          :
          ''
      }

      <div>
        <p className={handles.kitLookProduct_name}>{product?.name}</p>
        <p className={handles.kitLookProduct_price}>
          {filterAvailableSku? filterAvailableSku?.[0]?.bestPriceFormated: ''}
        </p>
        {
          product?.available?
          <p className={handles.kitLookProduct_size}>tamanhos</p>
          : ''
        }
        <div className={handles.kitLookProduct_inputContainer}>
          {
            product?.available? 
              product.skus.map((item: KitLookSkus, i: number) => {
                const name = (function () {
                  if (item.skuname.split(' ').includes('PP')) return 'PP'
                  if (item.skuname.split(' ').includes('P')) return 'P'
                  if (item.skuname.split(' ').includes('M')) return 'M'
                  if (item.skuname.split(' ').includes('G')) return 'G'
                  if (item.skuname.split(' ').includes('GG')) return 'GG'

                  return null
                })()
                return (
                  <div data-skuid={item.sku} key={i}>
                    <label
                      className={`${handles.kitLookProduct_inputLabel} ${
                        selectedSku === item.skuname &&
                        handles.kitLookProduct_inputLabelSelected
                      } ${
                        !item.available && handles.kitLookProduct_inputLabelDisabled
                      }`}
                      onClick={() => {
                        if (!item.available) {
                          document
                            .querySelector(
                              '.vtex-availability-notify-1-x-notiferContainer'
                            )
                            ?.classList.add(handles.kitLookProduct_avaibility)
                        }
                      }}
                    >
                      {name}
                      <input
                        className={handles.kitLookProduct_input}
                        type="radio"
                        value={item.sku}
                        name={inputName}
                        disabled={!item.available ?? true}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleSelectedSku(e)
                          setSelectedSku(item.skuname)
                        }}
                      />
                    </label>
                  </div>
                )
              })
              : ''
          }
          {
            product?.available?
              <a
                target="_blank"
                href="https://api.whatsapp.com/send/?phone=5511911692266&text=Ol%C3%A1,+gostaria+de+saber+como+funciona+o+sob+medida"
                className={handles.SobMedida_pdp}
                id="SobMedidaPdpButton"
              >
                Sob Medida
              </a>
              : ''
          }
        </div>
      </div>
    </div>
  )
}
