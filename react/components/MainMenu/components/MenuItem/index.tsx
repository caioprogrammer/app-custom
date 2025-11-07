/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'
import { useDevice } from 'vtex.device-detector'
import { Link } from 'vtex.render-runtime'

import { HANDLES_MAIN_MENU } from '../..'
import {
  CustomLinksItem,
  CustomLinks,
  MenuBanners,
} from '../../typings/MainMenuTypes'
import { SubmenuItem } from '../SubMenu'

export const MenuItem = ({
  name,
  href,
  order,
  banners,
  children,
  hasChildren,
  setOpenMenu,
}: CustomLinks) => {
  const { handles } = useCssHandles(HANDLES_MAIN_MENU)
  const { isMobile } = useDevice()
  const [open, setOpen] = useState(false)

  const buttonMobile = (
    <button
      onClick={() => setOpen(!open)}
      className={applyModifiers(handles.mainMenuItemLink, open ? 'active' : '')}
    >
      {name}
      {hasChildren && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="6"
          viewBox="0 0 12 6"
          className="vtex-menu-icon"
        >
          <g>
            <g transform="rotate(90 6 3)">
              <path
                fill="currentColor"
                d="M7.06 3.242a.34.34 0 0 0 0-.485L2.919-1.385a.762.762 0 0 1-.225-.542.767.767 0 0 1 1.308-.542l4.144 4.143c.354.353.548.824.548 1.326 0 .501-.194.972-.548 1.326L4.002 8.47a.762.762 0 0 1-.542.224.768.768 0 0 1-.542-1.308z"
              />
            </g>
          </g>
        </svg>
      )}
    </button>
  )

  const linkMobile = (
    <Link
      to={href}
      className={handles.mainMenuItemLink}
      onClick={() => setOpenMenu(false)}
    >
      {name}
    </Link>
  )

  if (isMobile) {
    return (
      <li style={{ order }} className={handles.mainMenuItem}>
        {hasChildren ? buttonMobile : linkMobile}

        {hasChildren && (
          <div
            className={applyModifiers(handles.subMenu, open ? 'active' : '')}
          >
            <ul className={handles.subMenuContainer}>
              <div className={`${handles.subMenuContainerLinks} ${banners?.length <= 0 ? 'justify-start' : ''}` }>
                {children?.map((item: CustomLinksItem, i: number) => {
                  return (
                    <SubmenuItem
                      name={item.name}
                      href={item.href}
                      order={item.order}
                      children={item.children}
                      key={i}
                      setOpenMenu={setOpenMenu}
                    />
                  )
                })}
              </div>
              {!isMobile && banners?.length > 0 && (
                <div className={handles.imageMenuContainer}>
                  {banners?.map((item: MenuBanners) => {
                    return (
                      <a
                        className={handles.imageMenuLink}
                        href={item?.link}
                        key={`${item?.link}-${Math.random()}`}
                      >
                        <img
                          className={handles.imageMenu}
                          src={item?.image}
                          alt={item?.name}
                        />
                        <h2 className={handles.imageMenuName}>{item.name}</h2>
                      </a>
                    )
                  })}
                </div>
              )}
            </ul>
          </div>
        )}
      </li>
    )
  }

  return (
    <li style={{ order }} className={handles.mainMenuItem + ' vtex-menu-item'}>
      <Link className={handles.mainMenuItemLink} to={href}>
        {name}
      </Link>
      {hasChildren && (
        <div className={handles.subMenu}>
          <ul className={handles.subMenuContainer}>
            <div className={`${handles.subMenuContainerLinks} ${banners?.length <= 0 ? 'justify-center mr0' : ''}`}>
              {children?.map((item: CustomLinksItem, i: number) => {
                return (
                  <SubmenuItem
                    name={item.name}
                    href={item.href}
                    order={item.order}
                    children={item.children}
                    key={i}
                  />
                )
              })}
            </div>
            {banners?.length > 0 && (
              <div className={handles.imageMenuContainer}>
                {banners?.map((item: MenuBanners) => {
                  return (
                    <Link
                      className={handles.imageMenuLink}
                      to={item?.link}
                      key={`${item?.link}-${Math.random()}`}
                    >
                      <img
                        className={handles.imageMenu}
                        src={item?.image}
                        alt={item?.name}
                      />
                      <h2 className={handles.imageMenuName}>{item.name}</h2>
                    </Link>
                  )
                })}
              </div>
            )}
          </ul>
        </div>
      )}
    </li>
  )
}
