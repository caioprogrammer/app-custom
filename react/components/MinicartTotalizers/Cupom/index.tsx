import React, { useState, useEffect } from 'react'
import OrderFormService from '../services/orderFormService'
import { CommonForm } from '../CommonForm'
// @ts-ignore
import OrderFormQuery from 'vtex.checkout-resources/QueryOrderForm'
import { useMinicartContext } from '../context'
const service = new OrderFormService()

export const Cupom = () => {
  const { orderForm, updateOrderForm }: any = useMinicartContext()
  const [data, setData] = useState({
    error: false,
    message: '',
    value: '',
    result: '',
  })

  useEffect(() => {
    if (orderForm.marketingData.coupon) {
      setData(() => ({
        ...data,
        success: true,
        error: false,
        result: orderForm.marketingData.coupon,
      }))
    } else {
      setData(() => ({
        ...data,
        success: false,
        error: false,
        result: '',
      }))
    }

  }, [orderForm])

  const onChange = (ev: any) => {
    const value = ev.target.value || ''
    setData(() => ({ ...data, value: value }))
  }

  const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    if (!data.value.length) {
      setData(() => ({ ...data, error: true, message: 'digite um código' }))
      return
    }

    const req = await service.addCoupon(orderForm, data.value)
    if (!req.marketingData.coupon) {
      setData(() => ({ ...data, error: true, message: 'cupom inválido' }))
    } else {
      setData(() => ({
        ...data,
        success: true,
        error: false,
        result: req.marketingData.coupon,
      }))
      updateOrderForm()
    }
  }

  const onRemove = async function () {
    await service.removeCoupon(orderForm)
    setData(() => ({
      ...data,
      error: false,
      message: '',
      result: '',
      success: false,
      value: '',
    }))
    updateOrderForm()
  }

  return (
    <CommonForm
      onSubmit={onSubmit}
      label="cupom"
      id="coupon-minicart"
      placeholder="cupom"
      onChange={onChange}
      data={data}
      onRemove={onRemove}
    />
  )
}
