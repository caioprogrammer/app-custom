import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import { useCssHandles } from 'vtex.css-handles'
import InstagramService from './services/instagramService'

interface Props {
  token: string
}

export const HANDLES = [
  'InstagramWrapper',
  'picture',
  'Instagram',
  'videoWrapper',
  'video',
  'instagram__posts',
  'instagram__posts__item',
  'instagram__posts__item__link',
  'instagram__posts__item__video',
  'instagram__posts__item__image',
] as const


export const Instagram = ({ token }: Props) => {
  const { handles } = useCssHandles(HANDLES)
  const [instagramPosts, setInstagramPosts] = useState([])
  const service = new InstagramService()

  handles

  async function getInstagramPosts() {
    // @ts-ignore
    const response = await service.GetPosts(token)
    const posts = response.data.map(function (item: any) {   
      let imageUrl
      let imageLink
      let imageCaption
      
      if(item.media_type != "VIDEO"){
        imageUrl = item.media_url,
        imageLink = item.permalink,
        imageCaption = item.caption
        
        return {
          image: imageUrl,
          link: imageLink,
          caption: imageCaption,
        }
      }

      return
    })

    setInstagramPosts(posts.filter((element: any) => element !== undefined))
  }

  useEffect(function () {
    getInstagramPosts()
  }, [])

  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    cssEase: 'linear',
    pauseOnHover: true,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
    ]
  }

  if (!token) {
    return <></>
  }
  
  return (
    <>
      <Slider {...settings} className={handles.instagram__posts}>
        {instagramPosts.slice(0, 6)?.map((post: any, i: any) => {
          return (
            <div className={handles.instagram__posts__item} key={i}>
              <a
                href={post?.link}
                className={handles.instagram__posts__item__link}
                target="_blank"
              >
                  <img
                    src={post?.image}
                    alt={post?.caption}
                    key={i}
                    className={handles.instagram__posts__item__image}
                  />
              </a>
            </div>
          )
        })}
      </Slider>
    </>
  )
}

Instagram.schema = {
  title: 'HOME - Instagram',
}
