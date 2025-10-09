/* eslint-disable default-case */
import { useState, useEffect } from 'react'

import CrossSellingService from './CrossSellingRestService'
import { ICrossSellingService, IProducts } from './ICrosselingService'

const crossSellingService: ICrossSellingService = new CrossSellingService()

type CrossSellingTypes = 'similars' | 'suggestions' | 'showtogether'

export function useCrossSelling(
  type: CrossSellingTypes,
  productId: string | undefined
): [IProducts[] | null, boolean] {
  const [products, setProducts] = useState<null | IProducts[]>(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    async function getSimilars() {
      setLoading(true)
      switch (type) {
        case 'similars':
          setProducts(await crossSellingService.similars(productId))
          break
        case 'suggestions':
          setProducts(await crossSellingService.suggestions(productId))
          break
        case 'showtogether':
          setProducts(await crossSellingService.showtogether(productId))
          break
      }
      setLoading(false)
    }

    getSimilars()
  }, [crossSellingService])

  return [products, loading]
}
