import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { canUseDOM } from 'vtex.render-runtime'
import getFormattedPrice from '../utils/getFormatedPrice'
import { Cupom } from './Cupom'
import { Shipping } from './Shipping'
import { useMinicartContext, MincartContextProvider } from './context'

const HANDLES_MINICART_FOOTER = [
  'minicartFooter',
  'minicartFooter_keepBuying',
  'minicartFooter_finish',
  'minicartFooter_totalizer_subtotalwrapper',
  'minicartFooter_totalizer_fretewrapper',
  'minicartFooter_totalizer_discountwrapper',
  'minicartFooter_totalizer_totalwrapper',
  'minicartFooter_totalizer_label',
  'minicartFooter_totalizer_value',
] as const

interface TotalizersProps {
  label: string
  price?: number
  className?: string
}

const Totalizers = function Totalizers({
  label,
  price,
  className,
}: TotalizersProps) {
  const { handles } = useCssHandles(HANDLES_MINICART_FOOTER)

  if (price === undefined) {
    return null
  }

  // if (price === 0) {
  //   return (
  //     <div className={className}>
  //       <span className={handles.minicartFooter_totalizer_label}>
  //         Frete Grátis
  //       </span>
  //     </div>
  //   )
  // }

  const formatPrice = price / 100

  return (
    <div className={className}>
      <span className={handles.minicartFooter_totalizer_label}>{label}</span>
      <span className={handles.minicartFooter_totalizer_value}>
        {getFormattedPrice(formatPrice)}
      </span>
    </div>
  )
}

const Minicart = () => {
  if (!canUseDOM) {
    return <></>
  }

  const { orderForm }: any = useMinicartContext()
  const { handles } = useCssHandles(HANDLES_MINICART_FOOTER)

  function handleCloseMinicart() {
    const closeMinicart = document.querySelector(
      '.vtex-minicart-2-x-closeIconButton'
    ) as HTMLElement
    closeMinicart.click()
  }

  const subtotalItemPrice = orderForm?.totalizers.find(
    (item: any) => item.id === 'Items'
  )

  const subtotalDiscounts = orderForm?.totalizers.find(
    (item: any) => item.id === 'Discounts'
  )

  return (
    <div className={handles.minicartFooter}>
      <Totalizers
        label="Subtotal"
        price={subtotalItemPrice?.value}
        className={handles.minicartFooter_totalizer_subtotalwrapper}
      />

      <Cupom />
      <Shipping />

      {subtotalDiscounts?.value !== 0 && (
        <Totalizers
          label="descontos"
          price={subtotalDiscounts?.value}
          className={handles.minicartFooter_totalizer_discountwrapper}
        />
      )}

      <Totalizers
        label="Total"
        price={orderForm?.value}
        className={handles.minicartFooter_totalizer_totalwrapper}
      />

      <a href="/checkout" className={handles.minicartFooter_finish}>
        Finalizar Compra
      </a>

      <button
        onClick={handleCloseMinicart}
        className={handles.minicartFooter_keepBuying}
      >
        Continuar comprando
      </button>
    </div>
  )
}

export const MinicartTotalizers = () => {
  return (
    <MincartContextProvider>
      <Minicart />
    </MincartContextProvider>
  )
}
