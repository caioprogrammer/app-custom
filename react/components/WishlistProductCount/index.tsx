import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Link } from 'vtex.render-runtime'

const HANDLES = [
  'WishlistProductCount',
  'WishlistProductCount__strong',
  'WishlistProductCount__button',
] as const

export const WishlistProductCount = () => {
  const { handles } = useCssHandles(HANDLES)
  const getProducts = window?.sessionStorage?.getItem('wishlist_wishlisted')
  const obj = JSON.parse(getProducts ?? '[]')

  if (obj.length === 0) {
    return (
      <div>
        <p className={handles.WishlistProductCount}>
          Navegue pelo site e clique no coração para adicionar
          <br />
          seus produtos favoritos à sua wishlist.
        </p>

        <Link className={handles.WishlistProductCount__button} to="/">
          escolher produtos
        </Link>
      </div>
    )
  }
  return (
    <p className={handles.WishlistProductCount}>
      você tem{' '}
      <strong className={handles.WishlistProductCount__strong}>
        {obj.length} produtos
      </strong>{' '}
      na sua lista
    </p>
  )
}
