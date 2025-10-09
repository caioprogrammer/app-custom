import React from 'react'
import { useProduct } from 'vtex.product-context'

import { ProductContextState } from '../../typings/Product'

export function ConditionalKit(props: any) {
  const product = useProduct() as Partial<ProductContextState>
  const kitInfo = product?.selectedItem?.kitItems?.length === 0
  if (kitInfo) {
    return <>{props.Then && props.Then()}</>
  }
  return <>{props.Else && props.Else()}</>
}
