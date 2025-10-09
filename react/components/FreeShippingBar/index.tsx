import React from 'react'
import { OrderForm } from 'vtex.order-manager'
import { toMoney } from '../utils/toMoney'

export const FreeShippingBar = () => {
  const { useOrderForm } = OrderForm
  const { loading, orderForm } = useOrderForm()

  const freteGratis = 59000
  let totalOfItems = orderForm.value
  let discount = 0

  orderForm.totalizers.forEach((item:any) => {
    if (item.id == 'Items') {
      totalOfItems = item.value
    } else if (item.id == 'Discounts') {
      discount = Math.abs(item.value)
    }
  })

  totalOfItems -= discount

  const calcTotalCart = freteGratis - totalOfItems
  const percent = (totalOfItems / freteGratis) * 100

  if (loading || !orderForm?.shipping?.selectedAddress?.postalCode) return null

  return (
    <div className="frete-bar-container" 
      style={{ 
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: '5px',
      }}
    >
      <div className="frete-bar-text"
        style={{
          width: "100%",
          position: "absolute",
          fontSize: "13px", 
          color:"#fff", 
          textAlign: "center",
          textTransform: 'uppercase'
        }}>
        
        {calcTotalCart > 0
          ? `Faltam ${toMoney(calcTotalCart)} para frete grátis`
          : 'Você ganhou frete grátis'}
      </div>
      <div
        style={{
          background: 'rgba(52, 53, 76, 0.5)',
          height: "25px",
          overflow: 'hidden',
        }}
      >
        <div
          id="barra-carregada"
          style={{
            width: `${percent}%`,
            height: '100%',
            background: 'rgba(52, 53, 76, 0.9)',
            transition: 'width 0.3s ease',
          }}
        />
      </div>
    </div>
  )
}

export default FreeShippingBar
