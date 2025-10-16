import React, { useEffect, useRef } from 'react'
import Swiper from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'
import { Helmet } from 'vtex.render-runtime'
import { useProduct } from 'vtex.product-context'
import { useCssHandles } from 'vtex.css-handles'

export const HANDLES_SLIDER = [
  'slider',
  'slider__wrapper',
  'slider__slide',
  'slider__image',
  'slider__next',
  'slider__prev',
  'slider__dots',
] as const

export function SliderProduct() {
  const swiperRef: any = useRef(null)
  const product: any = useProduct()
  const { handles } = useCssHandles(HANDLES_SLIDER)

  useEffect(() => {
    Swiper.use([Navigation, Pagination])
    const next = swiperRef.current.querySelector('.swiper-next')
    const prev = swiperRef.current.querySelector('.swiper-prev')
    const dots = swiperRef.current.querySelector('.swiper-dots')
    new Swiper(swiperRef.current, {
      speed: 100,
      spaceBetween: 0,
      slidesPerView: 1,
      loop: true,
      navigation: {
        nextEl: next,
        prevEl: prev,
      },
      pagination: {
        el: dots,
        type: 'bullets',
      },

      breakpoints: {
        1025: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
      },
      on: {
        init: function () {
          swiperRef.current
            .querySelector('.swiper-wrapper')
            .classList.remove('vtex-slider-initialized')
        },
      },
    })
  }, [])
  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/10.0.4/swiper-bundle.min.css"
        />
      </Helmet>
      <div className={handles.slider + ' swiper'} ref={swiperRef}>
        <div
          className={
            handles.slider__wrapper + ' swiper-wrapper vtex-slider-initialized'
          }
        >
          {product.selectedItem.images.map(function (item: any) {
            return (
              <div
                key={item.imageId}
                className={handles.slider__slide + ' swiper-slide'}
              >
                <img
                  src={
                    `https://atelierjuliafantin.vtexassets.com/arquivos/ids/` +
                    item.imageId +
                    '/produto.webp'
                  }
                  className={handles.slider__image}
                />
              </div>
            )
          })}
        </div>
        <button className={handles.slider__prev + ' swiper-prev'}>
          <img
            src={require('./images/icon-arrow-left.png')}
            alt="próximo slide"
          />
        </button>
        <button className={handles.slider__next + ' swiper-next'}>
          <img
            src={require('./images/icon-arrow-right.png')}
            alt="slide anterior"
          />
        </button>
        <div className={handles.slider__dots + ' swiper-dots'}></div>
      </div>
    </>
  )
}
