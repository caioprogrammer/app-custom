import React, { useEffect, useState } from 'react'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'

export const HANDLES_LGPD = [
  'lgpd',
  'lgpd__wrapper',
  'lgpd__text',
  'lgpd__link',
  'lgpd__close',
  'lgpd__icon',
] as const

export function LGPD() {
  const { handles } = useCssHandles(HANDLES_LGPD)
  const [active, setActive] = useState(false)
  const FIVE_SECONDS = 5000
  useEffect(function () {
    setTimeout(function () {
      const lgpd = sessionStorage.getItem('lgpd')
      if (!lgpd) {
        setActive(true)
      }
    }, FIVE_SECONDS)
  }, [])
  return (
    <aside style={{display: 'none'}} className={applyModifiers(handles.lgpd, active ? 'active' : '')}>
      <div className={handles.lgpd__wrapper}>
        <svg
          className={handles.lgpd__icon}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 7.00999V7M12 17L12 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className={handles.lgpd__text}>
          Usamos cookies para melhorar sua expriência de navegação em nosso
          site, para te mostrar conteúdos personalizados e analisar o tráfego em
          nosso site.{' '}
          <a
            className={handles.lgpd__link}
            href="/institucional/politica-de-privacidade"
          >
            Ver política e privacidade
          </a>
        </p>
        <button
          className={handles.lgpd__close}
          onClick={() => {
            sessionStorage.setItem('lgpd', 'true')
            setActive(false)
          }}
        >
          aceitar
        </button>
      </div>
    </aside>
  )
}
