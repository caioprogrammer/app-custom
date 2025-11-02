import React, { useState } from 'react'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'
import { useDevice } from 'vtex.device-detector'
import { MenuItem } from './components/MenuItem'
import { MainMenuProps } from './typings/MainMenuTypes'
import { Link } from 'vtex.render-runtime'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
// import { useRuntime } from 'vtex.render-runtime'

export const HANDLES_MAIN_MENU = [
  'mainMenu',
  'mainMenuContainer',
  'mainMenuItem',
  'mainMenuItemLink',
  'mainMenuItemLinkOpen',
  'subMenu',
  'subMenuOpen',
  'subMenuContainer',
  'subMenuContainerLinks',
  'subMenuChildrenContainerLinks',
  'subMenuItem',
  'subMenuItemToggler',
  'subMenuItemLink',
  'seeAll',
  'imageMenuContainer',
  'imageMenuLink',
  'imageMenu',
  'imageMenuName',
  'blur',
  'mainMenu_mobileHeader',
  'mainMenu_mobileHeaderLogin',
  'mainMenu_mobileLogo',
  'mainMenu_mobileFooter',
  'mainMenu_mobileFooterWishlist',
  'mainMenu_mobileHamburguer',
  'mainMenu_mobileItem',
  'mainMenu_mobileHamburguerIcon',
] as const

export const MainMenu = ({ customLinks }: MainMenuProps) => {
  const { handles } = useCssHandles(HANDLES_MAIN_MENU)
  const { isMobile } = useDevice()
  const [openMenu, setOpenMenu] = useState(false)

  const { orderForm } = useOrderForm()

  //esse trecho de código faz com que o menu desktop reverbere no mobile e em todas outras páginas
  // const { extensions }: any = useRuntime()
  // const key = Object.keys(extensions).find(item =>
  //   item.includes('menu-logo/cg-main-menu')
  // ) as string
  // customLinks = extensions[key].props.customLinks

  if (isMobile) {
    return (
      <>
        <button
          className={handles.mainMenu_mobileHamburguer}
          onClick={() => setOpenMenu(true)}
        >
          <span className={handles.mainMenu_mobileHamburguerIcon}></span>
          <span className={handles.mainMenu_mobileHamburguerIcon}></span>
          <span className={handles.mainMenu_mobileHamburguerIcon}></span>
        </button>
        <span
          className={applyModifiers(handles.blur, openMenu ? 'active' : '')}
          onClick={() => setOpenMenu(false)}
        ></span>
        <nav
          className={applyModifiers(handles.mainMenu, openMenu ? 'active' : '')}
        >
          <div className={handles.mainMenu_mobileHeader}>
            <button
              className={handles.mainMenu_mobileItem}
              onClick={() => setOpenMenu(false)}
            >
              <img
                src={require('./assets/icon-close.png')}
                alt="Fechar Menu Hamburger"
              />
            </button>
            <img
              title=""
              sizes=""
              alt=""
              className={handles.mainMenu_mobileLogo}
              loading="lazy"
              crossOrigin="anonymous"
              data-src="https://atelierjuliafantin.vtexassets.com/assets/vtex.file-manager-graphql/images/6872cbb5-f764-4ce0-a1ba-1a5467d5c126___c7a041af9a2fd2a06a81734d9cdaace6.png"
              src="https://atelierjuliafantin.vtexassets.com/assets/vtex.file-manager-graphql/images/6872cbb5-f764-4ce0-a1ba-1a5467d5c126___c7a041af9a2fd2a06a81734d9cdaace6.png"
            />
          </div>
          {orderForm.loggedIn ? (
              <Link to="/account" className={handles.mainMenu_mobileHeaderLogin}>
                Olá, {orderForm.clientProfileData.email.split('@')[0]}
              </Link>
            ) : (
              <Link to="/account" className={handles.mainMenu_mobileHeaderLogin}>
                Cadastro / Login
              </Link>
            )
          }
          <ul className={handles.mainMenuContainer}>
            {customLinks?.map((item: any) => {
              return (
                <MenuItem
                  name={item.name}
                  href={item.href}
                  key={item.name}
                  order={item.order}
                  banners={item.banners}
                  children={item.children}
                  hasChildren={item.hasChildren}
                  setOpenMenu={setOpenMenu}
                />
              )
            })}
          </ul>
        </nav>
      </>
    )
  }

  return (
    <nav className={handles.mainMenu}>
      <ul className={handles.mainMenuContainer}>
        {customLinks?.map((item: any, i: number) => {
          return (
            <MenuItem
              name={item.name}
              href={item.href}
              key={i}
              order={item.order}
              banners={item.banners}
              children={item.children}
              hasChildren={item.hasChildren}
              setOpenMenu={setOpenMenu}
            />
          )
        })}
      </ul>
    </nav>
  )
}

MainMenu.schema = {
  title: 'HEADER - Menu Principal',
}
