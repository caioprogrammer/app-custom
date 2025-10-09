import React, { useEffect, useRef } from 'react'
// import Slider from 'react-slick'
import Swiper from 'swiper'
import { useCssHandles } from 'vtex.css-handles'
import { useDevice } from 'vtex.device-detector'
import './styles.css'
import { Helmet } from 'vtex.render-runtime'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

interface BannerHomeProps {
  items: Banners[]
  time: number
}

type Banners = {
  imageDesktop?: string
  imageMobile?: string
  videoDesktop?: string
  videoMobile?: string
  buttons?: Buttons[]
  link?: string
}

type Buttons = {
  text: string
  link: string
}

const HANDLES_BANNER_CAROUSEL = [
  'bannercarousel',
  'bannercarousel__wrapper',
  'bannercarousel__dots',
  'bannercarousel__item',
  'bannercarousel__item__prev',
  'bannercarousel__item__next',
  'bannercarousel__item__image',
  'bannercarousel__item__video',
  'bannercarousel__item__link',
]

export const BannerCarousel = ({ items, time }: BannerHomeProps) => {
  const { handles } = useCssHandles(HANDLES_BANNER_CAROUSEL)
  const { isMobile } = useDevice()
  const swiperRef: any = useRef(null)

  useEffect(() => {
    Swiper.use([Navigation, Pagination, Autoplay])
    const next = swiperRef.current.querySelector('.swiper-next')
    const prev = swiperRef.current.querySelector('.swiper-prev')
    const dots = swiperRef.current.querySelector('.swiper-dots')
    
    new Swiper(swiperRef.current, {
      speed: 1000,
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
        clickable: true,
      },
      autoplay:{
        delay: time * 1000,
        disableOnInteraction: true,
        pauseOnMouseEnter: true
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
    <div style={{ width: '100%' }}>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/10.0.4/swiper-bundle.min.css"
        />
      </Helmet>
      
      <div className={handles.bannercarousel + ' swiper'} ref={swiperRef}>
        <div
            className={
              handles.bannercarousel__wrapper + ' swiper-wrapper vtex-slider-initialized'
            }
        >
          {items?.map((item, i) => {
            return(
              <div
                key={i}
                className={handles.bannercarousel__item + ' swiper-slide'}
              >
                <a
                href={item.link || '#'}
                className={handles.bannercarousel__item__link}
                >
                  {item.videoDesktop && item.videoMobile ? (
                  <iframe
                    src={`https://player.vimeo.com/video/${
                      !isMobile ? item.videoDesktop : item.videoMobile
                    }?title=0&muted=1&autoplay=1&autopause=0&controls=0&loop=1&background=1`}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowTransparency
                    className={handles.bannercarousel__item__video}
                  ></iframe>
                  ) : (
                    <img
                      src={!isMobile ? item.imageDesktop : item.imageMobile}
                      alt="banner"
                      key={i}
                      className={handles.bannercarousel__item__image}
                    />
                  )}
                </a>
              </div>
            )
          })}
        </div>
        {/* <button className={handles.bannercarousel__item__prev + ' swiper-prev'}>
          <img
            src={require('./images/icon-arrow-left.png')}
            alt="próximo slide"
          />
        </button>
        <button className={handles.bannercarousel__item__next + ' swiper-next'}>
          <img
            src={require('./images/icon-arrow-right.png')}
            alt="slide anterior"
          />
        </button> */}
        <div className={handles.bannercarousel__dots + ' swiper-dots'}></div>
      </div>
    </div>
  )
}

BannerCarousel.schema = {
  title: 'BannerCarousel',
}
