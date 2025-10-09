import { canUseDOM } from 'vtex.render-runtime'

const isCollectionPage = (COLLECTION_CLASS = 'collection'): boolean => {
  let collectionPage = false

  if (canUseDOM) {
    const renderContainer = document.querySelector('.render-container')

    if (renderContainer)
      Array.from(renderContainer.classList).map(el =>
        el.includes(COLLECTION_CLASS)
          ? (collectionPage = true)
          : (collectionPage = false)
      )
  }

  return collectionPage
}

export default isCollectionPage
