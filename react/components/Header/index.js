import React from 'react'
import { Helmet, canUseDOM } from 'vtex.render-runtime'
import './styles/react-store-custom.css'

const headerScroll = function () {
  const header = document.querySelector(
    '.vtex-store-header-2-x-headerStickyRow--main-header'
  )
  if (header) {
    // console.log('window.pageYOffset -> ', window.pageYOffset)
    if (window.pageYOffset > 100) {
      // header.classList.remove(
      //   'vtex-store-header-2-x-headerStickyRow--transparent'
      // )
      header.classList.add('vtex-store-header-2-x-headerStickyRow--float')
    } else {
      // header.classList.add('vtex-store-header-2-x-headerStickyRow--transparent')
      header.classList.remove('vtex-store-header-2-x-headerStickyRow--float')
    }
  }
}
const closeSeachF = function (e) {
  if (e.key === 'Enter') {
    setTimeout(
      () =>
        document.querySelector(
          '.vtex-disclosure-layout-1-x-trigger--header__search--mobile--visible'
        ) &&
        document
          .querySelector(
            '.vtex-disclosure-layout-1-x-trigger--header__search--mobile--visible'
          )
          .click(),
      500
    )
  }
}

const handleBackgroundSearch = function(){
  console.log('click')
      
  document.querySelector(
    '.render-route-store-home .vtex-store-header-2-x-headerRowBackground'
  )?.classList.toggle('vtex-store-header-2-x-headerRowBackground--white')
}

export const Header = () => {
  const configHeader = function () {

    document.querySelector(
      '.vtex-store-header-2-x-headerStickyRow--main-header'
    )?.classList.remove('vtex-store-header-2-x-headerStickyRow--float')

    document.querySelector('.vtex-disclosure-layout-1-x-trigger--header__search--mobile')?.removeEventListener('click', handleBackgroundSearch)
    document.querySelector('.vtex-disclosure-layout-1-x-trigger--header__search--mobile')?.addEventListener('click', handleBackgroundSearch, true)

    window.removeEventListener('scroll', headerScroll)
    window.addEventListener('scroll', headerScroll, true)
  }

  if (canUseDOM) {
    window.addEventListener('popstate', event => {
      configHeader()
    })
    configHeader()

    const closeAvaibility = document.querySelector(
      '.vtex-availability-notify-1-x-title'
    )

    setTimeout(() => {
      const myAccountImage = document.querySelectorAll(
        '.vtex-my-orders-app-3-x-orderProduct img'
      )

      const betterImageAccount = () => {
        myAccountImage.forEach(function (item) {
          const src = item.getAttribute('src')
          if (window.innerWidth < 767) {
            const newSrc = src.replace('-50-50', '-105-115')
            item.setAttribute('src', newSrc)
          } else {
            const newSrc = src.replace('-50-50', '-105-115')
            item.setAttribute('src', newSrc)
          }
        })
      }

      betterImageAccount()
    }, 5000)

    const placeholderPdp = setInterval(() => {
      const addressInput = document.querySelector(
        '.vtex-address-form-4-x-input'
      )
      if (addressInput) {
        addressInput.placeholder = 'digite o seu cep'
        clearInterval(placeholderPdp)
      }
    }, 2000)

    setInterval(() => {
      if (closeAvaibility) {
        const handleCloseAvaibility = () => {
          document
            .querySelector('.vtex-availability-notify-1-x-notiferContainer')
            .classList.add('dn')
          document
            .querySelector('.vtex-availability-notify-1-x-notiferContainer')
            .classList.remove(
              'suntime-commercegrowth-custom-0-x-kitLookProduct_avaibility'
            )
        }
        closeAvaibility?.addEventListener('click', handleCloseAvaibility)
      }
    }, 2000)

    const closeSearch = setInterval(function () {
      const input = document.querySelector(
        '.vtex-store-components-3-x-autoCompleteOuterContainer--header__search input'
      )
      if (!input?.classList.contains('closeSearch')) {
        clearTimeout(closeSearch)
        input?.classList.add('closeSearch')
        input?.removeEventListener('keypress', closeSeachF)
        input?.addEventListener('keypress', closeSeachF.bind(this))
      }
    }, 1000)
  }

  return (
    <Helmet>
      <link
        rel="stylesheet"
        type="text/css"
        charset="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <meta name="viewport" content="width=device-width, user-scalable=no" />
    </Helmet>
  )
}
