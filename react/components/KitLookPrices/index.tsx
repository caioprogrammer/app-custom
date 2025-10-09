import React from 'react'
import { useProduct } from 'vtex.product-context'

import { KitLookPricesContent } from './KitLookPricesContent'

interface KitLookPricesProps {
  children: React.ReactNode
}

export const KitLookPrices = ({ children }: KitLookPricesProps) => {
  const { product }: any = useProduct()
  const kitInfo = product.specificationGroups.find(
    (item: any) => item.name === 'Variação Produto'
  )

  const kitSku = kitInfo?.specifications?.find(
    (item: any) => item.name === 'Top'
  )

  if (!kitSku) {
    return <>{children}</>
  }

  return <KitLookPricesContent kitInfo={kitInfo} />
}
