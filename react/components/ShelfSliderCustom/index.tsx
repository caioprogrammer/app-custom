import React, { useRef } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useProduct } from 'vtex.product-context'
import { ProductContextState } from 'vtex.product-context/react/ProductTypes'
import Slider from 'react-slick'
import { useRuntime } from 'vtex.render-runtime'

const HANDLES = [
  'shelf',
  'shelf__images',
  'shelf__image',
  'shelf__buybutton',
  'shelf__arrow__prev',
  'shelf__arrow__next',
]

const captureClick = (e: any) => {
  e.preventDefault()
  e.stopPropagation()
}

const ShelfSliderCustom = () => {
  const { selectedItem, product } = useProduct() as ProductContextState
  const { handles } = useCssHandles(HANDLES)
  const slider = useRef() as any
  const { navigate } = useRuntime()
  const shelfREF = useRef(null)

  if (!product) {
    return <></>
  }

  const PrevArrow = function () {
    return (
      <button
        className={handles.shelf__arrow__prev}
        onClick={() => slider.current.slickPrev()}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g><g><g opacity=".75"><path fill="#fff" d="M13.69 7.9a.466.466 0 0 1 .313.811l-3.665 3.288 3.664 3.29a.466.466 0 1 1-.624.692L9.33 12.346a.466.466 0 0 1 0-.691l4.048-3.636a.467.467 0 0 1 .311-.12zM11.997 24c3.206 0 6.219-1.248 8.486-3.515A11.924 11.924 0 0 0 24 12a11.92 11.92 0 0 0-3.515-8.485A11.923 11.923 0 0 0 11.998 0a11.919 11.919 0 0 0-8.484 3.514A11.922 11.922 0 0 0-.001 12c0 3.206 1.25 6.22 3.515 8.486A11.916 11.916 0 0 0 11.998 24z"></path></g></g></g></svg>
      </button>
    )
  }

  const NextArrow = function () {
    return (
      <button
        className={handles.shelf__arrow__next}
        onClick={() => slider.current.slickNext()}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g><g><g opacity=".75" transform="rotate(-180 12 12)"><path fill="#fff" d="M13.69 16.1a.466.466 0 0 1-.311-.12L9.33 12.347a.464.464 0 0 1 0-.692L13.38 8.02a.464.464 0 0 1 .312-.118.463.463 0 0 1 .311.81L10.34 12l3.663 3.288a.465.465 0 0 1-.312.812zM11.998 0a11.919 11.919 0 0 0-8.484 3.515A11.925 11.925 0 0 0 0 12c0 3.206 1.248 6.219 3.514 8.485A11.92 11.92 0 0 0 11.998 24c3.207 0 6.22-1.248 8.487-3.514A11.92 11.92 0 0 0 24 12c0-3.205-1.248-6.22-3.515-8.486A11.924 11.924 0 0 0 11.998 0z"></path></g></g></g></svg>
      </button>
    )
  }

  let settings = {}

  if(window.innerWidth < 992){
    settings = {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
      infinity: false,
    }
  }
  else{
    settings = {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      dots: false,
      infinity: false,
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
    }
  }
  

  return (
    <>
      <div className={handles.shelf} onClick={captureClick} ref={shelfREF}>
        <Slider {...settings} className={handles.shelf__images} ref={slider}>
          {selectedItem?.images.map(function (image: any, index:number) {
            const imageID = image.imageUrl.split('/ids/')[1].split('/')[0]
            if (image.imageLabel != 'produto') {
              return (
                <img
                  key={index}
                  className={handles.shelf__image}
                  src={
                    'https://atelierjuliafantin.vtexassets.com/arquivos/ids/' +
                    imageID +
                    '-500-auto/' +
                    image.imageLabel +
                    '.webp'
                  }
                  onClick={() => {
                    navigate({
                      to: product.link,
                    })
                  }}
                />
              )
            } else {
              return null
            }
          })}
        </Slider>
      </div>
      {
        window.innerWidth < 1024? 
          (
            <button className={handles.shelf__buybutton}>
              Comprar
            </button>
          ): <></>
      }
    </>
  )
}

export default ShelfSliderCustom
