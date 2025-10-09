import React, { useEffect, useState } from 'react'
import OrderFormService from '../services/orderFormService'
import { CommonForm } from '../CommonForm'
import { MASK_CEP } from '../../utils/mask'
import { toMoney } from '../../utils/toMoney'
import { useMinicartContext } from '../context'

const service = new OrderFormService()

export const Shipping = () => {
  const { updateOrderForm, orderForm }: any = useMinicartContext()

  const [data, setData] = useState({
    error: false,
    message: '',
    value: '',
    result: '',
  })

  useEffect(() => {
    if (
      orderForm.shipping?.selectedAddress?.postalCode &&
      orderForm.shipping?.selectedAddress?.postalCode.length
    ) {
      setData(() => ({
        ...data,
        success: true,
        error: false,
        result: orderForm.shipping.selectedAddress.postalCode,
      }))
    }
  }, [orderForm])

  const onChange = (ev: any) => {
    const value = MASK_CEP(ev)
    setData(() => ({ ...data, value: value }))
  }

  const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()


    if (!data || !data.value.length) {
      setData(() => ({ ...data, error: true, message: 'digite um cep' }))
      return
    }

    const req = await service.shippingCalc(orderForm.id, data.value)
    if (
      req.error ||
      (req.messages[0] && req.messages[0].code == 'cannotBeDelivered')
    ) {
      setData(() => ({ ...data, error: true, message: 'cep inválido' }))
    } else {
      const shippingValue = req.totalizers.find(
        (item: any) => item.id == 'Shipping'
      )

      setData(() => ({
        ...data,
        success: true,
        error: false,
        result:
          req.shippingData.address.postalCode +
          ' | ' +
          (shippingValue.value > 1
            ? toMoney(shippingValue.value)
            : 'frete grátis'),
      }))
      updateOrderForm()
    }
  }

  const onRemove = async function () {
    setData(() => ({
      ...data,
      error: false,
      message: '',
      result: '',
      success: false,
      value: '',
    }))
  }

  const shippingValue = orderForm.totalizers.find(
    (item: any) => item.id == 'Shipping'
  )

  if (data.result.length) {
    let text = data.result.split('|')[0]
    text +=
      ' | ' +
      (shippingValue?.value > 1
        ? toMoney(shippingValue?.value)
        : 'frete grátis')
    data.result = text
  }

  return (
    <CommonForm
      onSubmit={onSubmit}
      label="frete"
      id="shipping-code"
      placeholder="cep"
      onChange={onChange}
      data={data}
      onRemove={onRemove}
    />
  )
}
