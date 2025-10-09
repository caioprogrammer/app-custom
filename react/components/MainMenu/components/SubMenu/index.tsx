import React, { useState } from 'react'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'
import { Link } from 'vtex.render-runtime'
import { HANDLES_MAIN_MENU } from '../..'
import { CustomLinksItem } from '../../typings/MainMenuTypes'
import { useDevice } from 'vtex.device-detector'

export const SubmenuItem = ({
  name,
  order,
  children,
  href,
  setOpenMenu,
}: CustomLinksItem) => {
  const { handles } = useCssHandles(HANDLES_MAIN_MENU)
  const [active, setActive] = useState(false)
  const { isMobile } = useDevice()
  return (
    <li
      style={{ order }}
      className={applyModifiers(handles.subMenuItem, active ? 'active' : '')}
    >
      <div
        className={handles.subMenuItemToggler}
        onClick={() => setActive(!active)}
      >
        {children?.length ? (
          <Link
            to={href}
            className={handles.subMenuItemLink}
            onClick={() => setOpenMenu && setOpenMenu(false)}
          >
            <span className={handles.subMenuItemLink}>{name}</span>
          </Link>
        ) : (
          <Link
            className={handles.subMenuItemLink}
            to={href}
            onClick={() => setOpenMenu && setOpenMenu(false)}
          >
            {name}
          </Link>
        )}

        {children?.length && isMobile && (
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
      </div>

      <ul className={handles.subMenuChildrenContainerLinks}>
        {children?.map(item => {
          return (
            <li
              style={{ order: item.order }}
              className={handles.subMenuItem}
              key={`${item.name}-${Math.random()}`}
            >
              <Link
                className={handles.subMenuItemLink}
                to={item.href}
                onClick={() => setOpenMenu && setOpenMenu(false)}
              >
                {item.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </li>
  )
}
