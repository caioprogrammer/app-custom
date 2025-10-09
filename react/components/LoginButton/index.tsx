import { compose } from 'ramda'
import React, { useEffect, useState } from 'react'
import { useLazyQuery } from 'react-apollo'
import { useCssHandles } from 'vtex.css-handles'
import { withRuntimeContext } from 'vtex.render-runtime'
import { useDevice } from 'vtex.device-detector'
import { Link } from 'vtex.render-runtime'
import GET_SESSION from '../../queries/GET_SESSION.graphql'
import getRedirectLogout from '../utils/getRedirectLogout'

const HANDLES = [
  'LoginButton',
  'LoginButton_container',
  'LoginButton_containerLinks',
  'LoginButton_mettings',
  'LoginButton_entrarCadastrar',
  'LoginButton_link',
  'LoginButton_logout',
  'LoginButton_containerLinksOpen',
  'LoginButton_mobileHeader',
  'LoginButton_blur',
  'LoginButton_blurOpen',
] as const

interface LoginProps {
  runtime: Runtime
  children: React.ReactNode
}

const LoginButton = ({ runtime, children }: LoginProps) => {
  const [loginOpen, setLoginOpen] = useState(false)
  const { isMobile } = useDevice()
  const { handles } = useCssHandles(HANDLES)

  const [getSession, { data }] = useLazyQuery(GET_SESSION, {
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    getSession()
  }, [])

  const session = data?.getSession.profile

  if (isMobile) {
    return (
      <div className={handles.LoginButton_container}>
        <button
          className={handles.LoginButton}
          onClick={() => {
            setLoginOpen(!loginOpen)
          }}
        ></button>

        <div
          onClick={() => {
            setLoginOpen(false)
          }}
          className={`${handles.LoginButton_blur} ${
            loginOpen && handles.LoginButton_blurOpen
          }`}
        ></div>
        <div
          onMouseLeave={() => {
            setLoginOpen(false)
          }}
          className={`${handles.LoginButton_containerLinks} ${
            loginOpen && handles.LoginButton_containerLinksOpen
          }`}
        >
          <div className={handles.LoginButton_mobileHeader}></div>
          {session ? (
            <p className={handles.LoginButton_mettings}>
              {session.firstName ? (
                <span>
                  oi, <strong>{session.firstName}</strong>
                </span>
              ) : (
                'oi'
              )}
            </p>
          ) : (
            <>{children}</>
          )}

          <Link
            className={handles.LoginButton_link}
            to={session ? '/account#/profile' : '/login'}
          >
            Minha Conta
          </Link>
          <Link
            className={handles.LoginButton_link}
            to={session ? '/account#/orders' : '/login'}
          >
            Meus Pedidos
          </Link>
          <Link
            className={handles.LoginButton_link}
            to="https://api.whatsapp.com/send?phone=5511911692266"
          >
            Atendimento
          </Link>
          <Link className={handles.LoginButton_link} to="/account#/wishlist">
            Wishlist
          </Link>
          {session && (
            <button
              className={handles.LoginButton_logout}
              onClick={getRedirectLogout(runtime)}
            >
              Sair
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={handles.LoginButton_container}>
      <button
        className={handles.LoginButton}
        onClick={() => {
          loginOpen? setLoginOpen(false): setLoginOpen(true)
          
        }}
      ></button>

      <div
        className={`${handles.LoginButton_containerLinks} ${
          loginOpen && handles.LoginButton_containerLinksOpen
        }`}
      >
        {session ? (
          <p className={handles.LoginButton_mettings}>
            {session.firstName ? (
              <span>
                oi, <strong>{session.firstName}</strong>
              </span>
            ) : (
              'oi'
            )}
          </p>
        ) : (
          <>{children}</>
        )}

        <a
          className={handles.LoginButton_link}
          href={session ? '/account#/profile' : '/login'}
        >
          Minha Conta
        </a>
        <a
          className={handles.LoginButton_link}
          href={session ? '/account#/orders' : '/login'}
        >
          Meus Pedidos
        </a>
        <a
          className={handles.LoginButton_link}
          href={
            session
              ? 'https://api.whatsapp.com/send?phone=5511911692266'
              : '/login'
          }
        >
          Atendimento
        </a>
        {session && (
          <button
            className={handles.LoginButton_logout}
            onClick={getRedirectLogout(runtime)}
          >
            Sair
          </button>
        )}
      </div>
    </div>
  )
}

export default compose(withRuntimeContext)(LoginButton)
