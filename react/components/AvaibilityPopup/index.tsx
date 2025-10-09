import React, { ReactChildren, useEffect, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useProduct } from 'vtex.product-context'
import { ProductContextState } from 'vtex.product-context/react/ProductTypes'

interface AvaibilityPopupProps {
  children: ReactChildren
}

const HANDLES = [
  'AvaibilityPopup_container',
  'AvaibilityPopup_container--open',
  'AvaibilityPopup_container--close',
] as const

export const AvaibilityPopup = ({ children }: AvaibilityPopupProps) => {
  const { handles } = useCssHandles(HANDLES)
  const [open, setOpen] = useState(true)
  const product = useProduct() as Partial<ProductContextState>

  useEffect(() => {
    setOpen(true)
  }, [product.loadingItem])

  return (
    <div
      className={`${handles.AvaibilityPopup_container} ${
        open && handles['AvaibilityPopup_container--open']
      }`}
    >
      <button
        onClick={() => {
          setOpen(false)
        }}
        className={handles['AvaibilityPopup_container--close']}
      ></button>
      {children}
    </div>
  )
}
