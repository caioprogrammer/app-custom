import React, { useState, useEffect } from 'react'
import OrderFormService from '../services/orderFormService'
import { CommonForm } from '../CommonForm'
import { useMinicartContext } from '../context'
const service = new OrderFormService()

interface Vendedores {
  name: string
  cod: string
  ativo: boolean
}

export const SellerCode = () => {
  const { orderForm, updateOrderForm }: any = useMinicartContext()

  const [data, setData] = useState({
    error: false,
    success: false,
    message: '',
    value: '',
    result: '',
  })

  useEffect(() => {
    if (orderForm.marketingData.utmiCampaign == 'vendedoraslny') {
      setData(() => ({
        ...data,
        success: true,
        error: false,
        result: orderForm.marketingData.utmiPage,
      }))
    }
  }, [orderForm])

  const onChange = (ev: any) => {
    const value = ev.target.value || ''
    setData(() => ({ ...data, value: value }))
  }

  const getSeller = async function (cod: string) {
    let result: Vendedores[] = []
    await fetch(
      `/api/dataentities/VD/search/?_fields=ativo,cod,name&cod=${cod}`
    )
      .then(function (item) {
        return item.json()
      })
      .then(r => {
        result = r
      })
    return result
  }

  const onSubmit = async (evt?: React.FormEvent<HTMLFormElement>) => {
    if (evt) {
      evt.preventDefault()
    }
    if (!data.value.length) {
      setData(() => ({ ...data, error: true, message: 'digite um código' }))
      return
    }

    const seller = await getSeller(data.value)

    if (seller.length && seller[0].ativo) {
      setData(() => ({
        ...data,
        success: true,
        error: false,
        result: seller[0].name,
      }))
      service.marketingDataPost(
        orderForm,
        'vendedorsuntime',
        seller[0].cod,
        seller[0].name
      )
      updateOrderForm()
    } else {
      setData(() => ({ ...data, error: true, message: 'código inválido' }))
    }
  }

  const onRemove = async function () {
    await service.marketingDataPost(
      orderForm,
      'sem vendedor',
      'sem vendedor',
      ''
    )
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
      label="Código da Vendedora"
      id="seller-code"
      placeholder="código"
      onChange={onChange}
      data={data}
      onRemove={onRemove}
    />
  )
}
