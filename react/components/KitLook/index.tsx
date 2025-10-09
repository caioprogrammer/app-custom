import React from 'react'
import { useProduct } from 'vtex.product-context'

import { KitLookProvider } from '../../contexts/KitLookContext/KitLookContext'
import { KitLookContent } from './KitLookContent'
import { ProductContextState } from '../../typings/Product'

export interface KitLookProps {
  children: React.ReactChildren
}

export const KitLook = ({ children }: KitLookProps) => {
  const prod = useProduct() as Partial<ProductContextState>
  if (prod?.selectedItem?.kitItems.length === 0) {
    return null
  }

  return (
    <KitLookProvider>
      <KitLookContent children={children} />
    </KitLookProvider>
  )
}
