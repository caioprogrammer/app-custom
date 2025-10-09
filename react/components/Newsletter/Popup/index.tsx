import React, { useState, useEffect } from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { newsletterFactory } from '../NewsletterFactory'

export const HANDLES_POPUPNEWSLETTER = [
  'newsletterpopup',
  'newsletterpopup__wrapper',
  'newsletterpopup__overlay',
  'newsletterpopup__image',
  'newsletterpopup__close',
  'newsletterpopup__form',
  'newsletterpopup__formTitle',
  'newsletterpopup__formSubtitle',
  'newsletterpopup__formInputEmail',
  'newsletterpopup__formInputName',
  'newsletterpopup__formSubmit',
  'newsletterpopup__success',
  'newsletterpopup__successTitle',
  'newsletterpopup__successButton',
] as const

export const NewsletterPopup = function () {
  const { handles } = useCssHandles(HANDLES_POPUPNEWSLETTER)
  const [data, setData] = useState({
    active: false,
    success: false,
  })

  const handleSubmit = function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const newsletterData = {
      name: form.get('name') as string,
      email: form.get('email') as string,
      cel: form.get('phone') as string,
    }
    const newsletter = newsletterFactory()
    newsletter.send(newsletterData).then(function () {
      setData(() => ({ ...data, success: true }))
    })
  }

  const TEN_SECONDS = 10000
  useEffect(function () {
    setTimeout(function () {
      const newsletter = sessionStorage.getItem('newsletterpopup')
      if (!newsletter) {
        sessionStorage.setItem('newsletterpopup', 'true')
        setData(() => ({ ...data, active: true }))
      }
    }, TEN_SECONDS)
  }, [])

  return (
    <>
      <div
        className={applyModifiers(
          handles.newsletterpopup__wrapper,
          data.active ? 'active' : ''
        )}
      >
        <div
          className={handles.newsletterpopup__overlay}
          onClick={() => setData({ ...data, active: false })}
        ></div>
        <div
          className={applyModifiers(
            handles.newsletterpopup,
            data.success ? 'success' : ''
          )}
        >
          <img
            src="https://via.placeholder.com/432x432"
            className={handles.newsletterpopup__image}
          />
          <button
            className={handles.newsletterpopup__close}
            onClick={() => setData({ ...data, active: false })}
          >
            <img src={require('../assets/close-x-button.svg')} alt="Limpar" />
          </button>
          <form
            className={handles.newsletterpopup__form}
            onSubmit={handleSubmit}
          >
            <span className={handles.newsletterpopup__formTitle}>
              fique por dentro
            </span>
            <span className={handles.newsletterpopup__formSubtitle}>
              receba nossas novidades e descontos exclusivos ♥
            </span>
            <input
              type="text"
              name="name"
              placeholder="seu nome"
              required
              className={handles.newsletterpopup__formInputName}
            />
            <input
              type="email"
              name="email"
              placeholder="seu e-mail"
              required
              className={handles.newsletterpopup__formInputEmail}
            />
            <button className={handles.newsletterpopup__formSubmit}>
              cadastrar
            </button>
          </form>
          <div className={handles.newsletterpopup__success}>
            <span className={handles.newsletterpopup__successTitle}>
              e-mail cadastrado!
            </span>
            <button
              className={handles.newsletterpopup__successButton}
              onClick={() => setData({ ...data, active: false })}
            >
              ir às compras
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

NewsletterPopup.schema = {
  title: 'HEADER - Popup Newsletter',
  properties: {
    image: {
      title: 'Imagem',
      type: 'string',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    titulo: {
      type: 'string',
      title: 'titulo',
    },
    subtitulo: {
      type: 'string',
      title: 'subtitulo',
    },
  },
}
