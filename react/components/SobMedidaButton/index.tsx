import React from 'react'
import { canUseDOM } from 'vtex.render-runtime'

export const SobMedidaButton = () => {
  if (!canUseDOM) {
    return <></>
  }
  const skuList = document.querySelector(
    '.vtex-flex-layout-0-x-flexRow--product__wrapper .vtex-store-components-3-x-skuSelectorSubcontainer--tamanho .vtex-store-components-3-x-skuSelectorOptionsList'
  )

  const sobMedidaButton = document.querySelector('#SobMedidaPdpButton')

  if (!sobMedidaButton) {
    skuList?.insertAdjacentHTML(
      'beforeend',
      `<a target="_blank" href="/institucional/sob-medida" class="suntime-commercegrowth-custom-0-x-SobMedida_pdp" id="SobMedidaPdpButton">
      Sob Medida
    </a>`
    )
  }

  return <></>
}
