import React from 'react'
import { useMutation } from 'react-apollo'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { useCssHandles } from 'vtex.css-handles'
import { canUseDOM } from 'vtex.render-runtime'

import { useKitLookContext } from '../../contexts/KitLookContext/KitLookContext'
import ADD_ITEM from '../../queries/addToCartCustom.graphql'
import { Product } from './KitLookProduct'
import { KitLookProps } from '.'
import getFormattedPrice from '../utils/getFormatedPrice'

export const HANDLES_KITLOOK = [
  'kitLook_container',
  'kitLook_button',
  'kitLookProduct_container',
  'kitLookProduct_img',
  'kitLookProduct_name',
  'kitLookProduct_price',
  'kitLookProduct_priceStrong',
  'kitLookProduct_input',
  'kitLookProduct_inputContainer',
  'kitLookProduct_inputLabel',
  'kitLookProduct_inputLabelSelected',
  'kitLookProduct_inputLabelDisabled',
  'kitLookProduct_size',
  'kitLookProduct_selectedPrice',
  'kitLookProduct_selectedPriceInstalments',
  'kitLookProduct_avaibility',
  'SobMedida_pdp',
] as const

export const KitLookContent = ({ children }: KitLookProps) => {
  if (!canUseDOM) {
    return <></>
  }
  const { state } = useKitLookContext()
  const { handles } = useCssHandles(HANDLES_KITLOOK)
  const { topProduct, bottomProduct } = state
  const { setOrderForm } = useOrderForm()

  const [addToCart] = useMutation(ADD_ITEM, {
    onCompleted: (data: any) => {
      const orderFormData = data?.addToCart
      setOrderForm((prevOrderForm: any) => {
        return {
          ...prevOrderForm,
          ...orderFormData,
        }
      })
    },
  })

  const handleAddToCart = () => {
    if (state.topToCart.id === 0) {
      addToCart({
        variables: {
          items: [state.bottomToCart],
        },
      })
    } else if (state.bottomToCart.id === 0) {
      addToCart({
        variables: {
          items: [state.topToCart],
        },
      })
    } else {
      addToCart({
        variables: {
          items: [state.topToCart, state.bottomToCart],
        },
      })
    }

    const minicart = document.querySelector(
      '.vtex-minicart-2-x-minicartContainer .vtex-minicart-2-x-openIconContainer'
    ) as HTMLElement

    minicart?.click()
  }

  const totalPrice = (state.valueTop + state.valueBottom) / 100

  return (
    <section className={handles.kitLook_container}>
      <>
        <Product inputName={'skuTop'} product={topProduct} />
        <Product inputName={'skuBottom'} product={bottomProduct} />
      </>

      {children}

      {totalPrice > 0 && (
        <div style={{ width: '100%' }}>
          <p className={handles.kitLookProduct_selectedPrice}>
            por {getFormattedPrice(totalPrice)} <br />
            <span className={handles.kitLookProduct_selectedPriceInstalments}>
              ou 5x sem juros de {getFormattedPrice(totalPrice / 5)}
            </span>
          </p>
        </div>
      )}

      <div style={{ width: '100%' }}>
        <button
          className={handles.kitLook_button}
          onClick={handleAddToCart}
          disabled={!!(state.bottomToCart.id === 0 && state.topToCart.id === 0)}
        >
          {state.bottomToCart.id === 0 && state.topToCart.id === 0
            ? 'Selecione um tamanho'
            : 'adicionar à sacola'}
        </button>
      </div>
    </section>
  )
}
