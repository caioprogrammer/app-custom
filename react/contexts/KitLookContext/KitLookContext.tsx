import React, {
  createContext,
  FC,
  Reducer,
  useContext,
  useReducer,
  useState,
  useEffect,
} from 'react'
import { useProduct } from 'vtex.product-context'

import {
  Action,
  KitLookActions,
  KitLookProduct,
  KitLookProviderType,
  KitLookTypes,
} from './types'
import ProductService from '../../services/ProductService'
import { ProductContextState } from '../../typings/Product'

const initialValues: KitLookTypes = {
  topProduct: {
    available: false,
    dimensions: [''],
    name: '',
    skus: [
      {
        available: false,
        image: '',
        bestPriceFormated: '',
        seller: '',
        sellerId: '',
        skuname: '',
        sku: 0,
        bestPrice: 0,
        installmentsValue: 0,
      },
    ],
  },
  bottomProduct: {
    available: false,
    dimensions: [''],
    name: '',
    skus: [
      {
        available: false,
        image: '',
        bestPriceFormated: '',
        seller: '',
        sellerId: '',
        skuname: '',
        sku: 0,
        bestPrice: 0,
        installmentsValue: 0,
      },
    ],
  },
  topToCart: {
    id: 0,
    seller: 0,
    quantity: 0,
  },

  bottomToCart: {
    id: 0,
    seller: 0,
    quantity: 0,
  },
  valueTop: 0,
  valueBottom: 0,
}

const reducer: Reducer<KitLookTypes, Action> = (
  state: KitLookTypes,
  action: Action
) => {
  switch (action.type) {
    case 'SET_TOP': {
      return {
        ...state,
        topProduct: {
          available: action.available,
          dimensions: action.dimensions,
          name: action.name,
          skus: action.skus,
        },
      }
    }
    case 'SET_BOTTOM': {
      return {
        ...state,
        bottomProduct: {
          available: action.available,
          dimensions: action.dimensions,
          name: action.name,
          skus: action.skus,
        },
      }
    }
    case 'SET_TOPTOCART': {
      return {
        ...state,
        topToCart: action.value,
      }
    }
    case 'SET_BOTTOMTOCART': {
      return {
        ...state,
        bottomToCart: action.value,
      }
    }
    case 'SET_TOP_VALUE': {
      return {
        ...state,
        valueTop: action.value,
      }
    }
    case 'SET_BOTTOM_VALUE': {
      return {
        ...state,
        valueBottom: action.value,
      }
    }
    default: {
      return state
    }
  }
}

const KitLookContext = createContext<KitLookActions>({} as KitLookActions)

const KitLookProvider: FC<KitLookProviderType> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValues)
  const defaultValue = {
    name: '',
    available: false,
    dimensions: [''],
    skus: [
      {
        available: false,
        bestPriceFormated: '',
        image: '',
        seller: '',
        sellerId: '',
        skuname: '',
        sku: 0,
        bestPrice: 0,
        installmentsValue: 0,
      },
    ],
  }
  const { selectedItem } = useProduct() as Partial<ProductContextState>
  const service = new ProductService()

  const [topProduct, setTopProduct] = useState<KitLookProduct>(defaultValue)
  const [bottomProduct, setBottomProduct] = useState<KitLookProduct>(
    defaultValue
  )
  const [topProductID, setTopProductID] = useState('')
  const [bottomProductID, setBottomProductID] = useState('')

  useEffect(() => {
    const topItemId = selectedItem?.kitItems?.[0].product.productId
    setTopProductID(topItemId ?? '')
    if (
      selectedItem?.kitItems !== undefined &&
      selectedItem?.kitItems.length > 0
    ) {
      const bottomItemId =
        selectedItem?.kitItems[selectedItem?.kitItems.length - 1].product
          .productId
      setBottomProductID(bottomItemId)
    }
  }, [])

  async function getProduct() {
    const responseTop = await service.GetProductSkus(topProductID)
    const responseBottom = await service.GetProductSkus(bottomProductID)
    setTopProduct(responseTop)
    setBottomProduct(responseBottom)
  }

  useEffect(() => {
    if (topProductID !== '') {
      getProduct()
    }
  }, [topProductID])

  useEffect(() => {
    dispatch({
      type: 'SET_TOP',
      available: topProduct.available,
      dimensions: topProduct.dimensions,
      name: topProduct.name,
      skus: topProduct.skus,
    })
  }, [topProduct])

  useEffect(() => {
    dispatch({
      type: 'SET_BOTTOM',
      available: bottomProduct.available,
      dimensions: bottomProduct.dimensions,
      name: bottomProduct.name,
      skus: bottomProduct.skus,
    })
  }, [bottomProduct])

  return (
    <KitLookContext.Provider value={{ state, dispatch }}>
      {children}
    </KitLookContext.Provider>
  )
}

const useKitLookContext = () => {
  const context = useContext(KitLookContext)

  if (!context) {
    throw new Error('useKitLookContext must be used within a state')
  }

  return context
}

export { KitLookProvider, useKitLookContext }
