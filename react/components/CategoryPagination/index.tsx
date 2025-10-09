import React from 'react'
//@ts-ignore
import { useSearchPage } from 'vtex.search-page-context/SearchPageContext'
import { canUseDOM } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'

interface CategoryPaginationProps {
  maxPagesVisible?: number
}

const HANDLES = [
  'containerProducts',
  'pagination',
  'buttonPrevContainer',
  'buttonPrev',
  'buttonNextContainer',
  'buttonNext',
  'buttonDisabled',
  'pagination__item',
  'itens__itemActive',
  'itens_pagination',
] as const

export const CategoryPagination = ({
  maxPagesVisible,
}: CategoryPaginationProps) => {
  const { handles } = useCssHandles(HANDLES)
  const { searchQuery, page } = useSearchPage()

  if (!canUseDOM) {
    return <></>
  }

  const MAX_ITEMS = maxPagesVisible ?? 6
  const MAX_PER_PAGE = 32
  const MAX_LEFT = (MAX_ITEMS - 1) / 2
  const url = canUseDOM ? window.location.search : ''
  const numberOfProdutsFound = canUseDOM
    ? searchQuery.data.productSearch?.recordsFiltered
    : searchQuery?.recordsFiltered
  const pages = Math.ceil(numberOfProdutsFound / MAX_PER_PAGE)

  const firstPage = () => {
    if (pages < MAX_ITEMS) return 1
    if (Math.trunc(Math.max(page - MAX_LEFT, 1)) + MAX_ITEMS <= pages)
      return Math.trunc(Math.max(page - MAX_LEFT, 1))
    return Number(pages - MAX_ITEMS + 1)
  }

  const finalUrl = (toPage: number) => {
    // console.log(window, 'vapo')
    if (!window) return
    const searchParams = new window.URLSearchParams(url)
    searchParams.set('page', toPage.toString())
    return `${window.location.pathname}?${searchParams.toString()}`
  }

  function changePage(toPage: number): string {
    return finalUrl(toPage) as string
  }

  return (
    <div className={handles.containerProducts}>
      <ul className={handles.pagination}>
        <li className={handles.buttonPrevContainer}>
          <a
            href={page === 1 ? '#' : changePage(page - 1)}
            className={`${handles.buttonPrev} ${
              page === 1 && handles.buttonDisabled
            }`}
          ></a>
        </li>
        {Array.from({ length: Math.min(MAX_ITEMS, pages) })
          .map((_, index) => {
            return index + firstPage()
          })
          .map(pageNumber => {
            return (
              <li
                key={pageNumber}
                className={` ${handles.itens_pagination}  ${
                  pageNumber === page ? handles.itens__itemActive : ''
                }`}
              >
                <a
                  href={changePage(pageNumber)}
                  className={handles.pagination__item}
                >
                  {pageNumber}
                </a>
              </li>
            )
          })}
        <li className={handles.buttonNextContainer}>
          <a
            href={page === pages ? '#' : changePage(page + 1)}
            className={`${handles.buttonNext} ${
              page === 6 && handles.buttonDisabled
            }`}
          ></a>
        </li>
      </ul>
    </div>
  )
}
