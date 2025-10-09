import React, { useState } from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'

import { newsletterFactory } from '../NewsletterFactory'

export const HANDLES_POPUPNEWSLETTER = [
  'newsletterform',
  'newsletterform__wrapper',
  'newsletterform__image',
  'newsletterform__close',
  'newsletterform__form',
  'newsletterform__formTitle',
  'newsletterform__formSubtitle',
  'newsletterform__formInputEmail',
  'newsletterform__formInputName',
  'newsletterform__formSubmit',
  'newsletterform__success',
] as const

export function NewsletterForm() {
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

  return (
    <div
      className={applyModifiers(
        handles.newsletterform,
        data.success ? 'success' : ''
      )}
    >
      <div className={handles.newsletterform__wrapper}>
        <span className={handles.newsletterform__formTitle}>
          ASSINE NOSSA NEWSLETTER
        </span>
        <form className={handles.newsletterform__form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="seu nome"
            required
            className={handles.newsletterform__formInputName}
          />
          <input
            type="email"
            name="email"
            placeholder="seu e-mail"
            required
            className={handles.newsletterform__formInputEmail}
          />
          <input
            type="phone"
            name="phone"
            placeholder="whatsapp"
            required
            className={handles.newsletterform__formInputEmail}
          />
          <button className={handles.newsletterform__formSubmit} type="submit">
            cadastrar
          </button>
        </form>
        <div className={handles.newsletterform__success}>
          e-mail cadastrado!
        </div>
      </div>
    </div>
  )
}
