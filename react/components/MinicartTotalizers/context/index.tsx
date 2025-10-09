import React, { ReactNode, createContext, useContext, useState } from 'react'
//@ts-ignore
import { useOrderForm } from 'vtex.order-manager/OrderForm'
//@ts-ignore
import OrderFormQuery from 'vtex.checkout-resources/QueryOrderForm'
import { useQuery } from 'react-apollo'

interface IProps {
  children: ReactNode
}

export const MinicartContext = createContext({})

export const useMinicartContext = () => useContext(MinicartContext)

let debouceTimeout: any = setTimeout(function () {})

export const MincartContextProvider = ({ children }: IProps) => {
  const { orderForm, setOrderForm }: OrderFormContext = useOrderForm()
  const [data, setData] = useState(orderForm)

  const { refetch } = useQuery<{
    orderForm: OrderForm
  }>(OrderFormQuery, {
    ssr: false,
    fetchPolicy: 'no-cache',
  })

  const dispatchUpdate = async function () {
    const newD: any = await refetch()

    setData(() => (newD.data.orderForm))
    setOrderForm(newD.data.orderForm)
    
  }
  
  const updateOrderForm = async function () {
    clearTimeout(debouceTimeout)
    debouceTimeout = setTimeout(function () {
      dispatchUpdate()
    }, 1500)
  }

  const orderShippingValue = orderForm.totalizers.find(
    (item: any) => item.id == 'Shipping'
  )

  const contextShippinpValue = data.totalizers.find(
    (item: any) => item.id == 'Shipping'
  )

  if (
    orderForm.marketingData?.coupon?.length > 1 &&
    orderForm.marketingData?.coupon == data.marketingData?.coupon
  ) {
    if (orderForm.value != data.value) {
      updateOrderForm()
    }
  }

  if (
    orderShippingValue &&
    orderShippingValue?.value != contextShippinpValue?.value
  ) {
    updateOrderForm()
  }

  return (
    <MinicartContext.Provider value={{ updateOrderForm, orderForm }}>
      {children}
    </MinicartContext.Provider>
  )
}
