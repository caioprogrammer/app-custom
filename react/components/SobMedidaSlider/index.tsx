import React, { useRef } from 'react'
import Slider from 'react-slick'
import { useCssHandles } from 'vtex.css-handles'
import { useDevice } from 'vtex.device-detector'

interface SobMedidaSliderProps {
  sliderItems: SliderItem[]
}

type SliderItem = {
  image: string
  title: string
  text: string
  prevArrow?: string
  nextArrow?: string
  class?: string
}

const CSS_HANDLES = [
  'SobMedidaSlider',
  'SobMedidaSlider__container',
  'SobMedidaSlider__container--arrows',
  'SobMedidaSlider__container--item',
  'SobMedidaSlider__container--image',
  'SobMedidaSlider__container--title',
  'SobMedidaSlider__container--text',
  'SobMedidaSlider__container--prevArrow',
  'SobMedidaSlider__container--nextArrow',
] as const

export const SobMedidaSlider = ({ sliderItems }: SobMedidaSliderProps) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { isMobile } = useDevice()
  const sliderRef = useRef<Slider | null>(null)

  const next = () => {
    sliderRef?.current?.slickNext()
  }

  const previous = () => {
    sliderRef?.current?.slickPrev()
  }

  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: isMobile ? 1 : 2,
    slidesToScroll: 1,
  }

  return (
    <div className={handles.SobMedidaSlider}>
      <Slider ref={sliderRef} {...settings}>
        {sliderItems.map((item: SliderItem) => {
          return (
            <div
              key={`${item.title}-${Math.random()}`}
              className={`${handles.SobMedidaSlider__container} atelierjuliafantin-commercegrowth-custom-0-x-SobMedidaSlider__${item.class}`}
            >
              <img
                className={handles['SobMedidaSlider__container--image']}
                src={item.image}
                alt={item.title}
              />
              <div className={handles['SobMedidaSlider__container--item']}>
                <h1 className={handles['SobMedidaSlider__container--title']}>
                  {item.title}
                </h1>
                <p className={handles['SobMedidaSlider__container--text']}>
                  {item.text}
                </p>

                <div className={handles['SobMedidaSlider__container--arrows']}>
                  {item.prevArrow && (
                    <button
                      className={
                        handles['SobMedidaSlider__container--prevArrow']
                      }
                      onClick={() => {
                        previous()
                      }}
                    >
                      {item.prevArrow}
                    </button>
                  )}

                  {item.nextArrow === 'link' ? (
                    <a
                      href="#SobMedidaForm"
                      className={
                        handles['SobMedidaSlider__container--nextArrow']
                      }
                    >
                      agende agora
                    </a>
                  ) : (
                    <button
                      className={
                        handles['SobMedidaSlider__container--nextArrow']
                      }
                      onClick={() => {
                        next()
                      }}
                    >
                      {item.nextArrow}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </Slider>
    </div>
  )
}
