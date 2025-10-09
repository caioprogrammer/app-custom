import React, { useState } from 'react'
import { useProduct } from 'vtex.product-context'
import { ProductContextState } from 'vtex.product-context/react/ProductTypes'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'

const HANDLES = [
  'productdescription',
  'productdescription__toggler',
  'productdescription__wrapper',
  'productdescription__specification',
  'productdescription__specification__item',
  'productdescription__toggler',
] as const

export const ProductDescription = () => {
  const { product } = useProduct() as ProductContextState
  const { handles } = useCssHandles(HANDLES)
  const [vdescription, setVDescription] = useState(false)
  const [vcuidadocomapeca, setVCuidadoComAPeca] = useState(false)
  const [vcomposicao, setVComposicao] = useState(false)

  if (!product) {
    return <></>
  }

  const specificationGroup = product.specificationGroups.find(
    (item: any) => item.name == 'allSpecifications'
  )
  const cuidadocomapeca = specificationGroup?.specifications.find(
    (item: any) => item.name == 'Cuidado com a peça'
  )
  const composicao = specificationGroup?.specifications.find(
    (item: any) => item.name == 'Composição'
  )

  // console.log('vapo', product)

  return (
    <>
      <div
        className={applyModifiers(
          handles.productdescription,
          vdescription ? 'active' : ''
        )}
      >
        <button
          className={handles.productdescription__toggler}
          onClick={() => setVDescription(!vdescription)}
        >
          DESCRIÇÃO
        </button>
        <p className={handles.productdescription__wrapper} dangerouslySetInnerHTML={{ __html: product.description}}></p>
      </div>
      {cuidadocomapeca ? (
        <div
          className={applyModifiers(
            handles.productdescription,
            vcuidadocomapeca ? 'active' : ''
          )}
        >
          <button
            className={handles.productdescription__toggler}
            onClick={() => setVCuidadoComAPeca(!vcuidadocomapeca)}
          >
            cuidados com a peça
          </button>
          <div
            className={applyModifiers(
              handles.productdescription__wrapper,
              'details'
            )}
          >
            {cuidadocomapeca?.values[0]}
          </div>
        </div>
      ) : (
        ''
      )}
      {composicao ? (
        <div
          className={applyModifiers(
            handles.productdescription,
            vcomposicao ? 'active' : ''
          )}
        >
          <button
            className={handles.productdescription__toggler}
            onClick={() => setVComposicao(!vcomposicao)}
          >
            composicão
          </button>
          <div
            className={applyModifiers(
              handles.productdescription__wrapper,
              'details'
            )}
          >
            {composicao?.values[0]}
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}
