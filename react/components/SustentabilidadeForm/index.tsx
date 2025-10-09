import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCssHandles } from 'vtex.css-handles'

import {
  Contato,
  SustentabilidadeMasterDataService,
} from './services/SustentabilidadeMasterData'

const HANDLES = [
  'InstitucionalForm_containerGeral',
  'InstitucionalForm_containerFlex',
  'InstitucionalForm_img',
  'InstitucionalForm_form',
  'InstitucionalForm_h2',
  'InstitucionalForm_p',
  'InstitucionalForm_container',
  'InstitucionalForm_label',
  'InstitucionalForm_input',
  'InstitucionalForm_button',
  'InstitucionalForm_textarea',
  'InstitucionalForm_formFeedback',
  'InstitucionalForm_containerForm',
  'InstitucionalForm_formFeedbackContainer',
] as const

interface SustentabilidadeFormProps {
  image: string
}

export const SustentabilidadeForm = ({ image }: SustentabilidadeFormProps) => {
  const { handles } = useCssHandles(HANDLES)

  const [valueChange, setValueChange] = useState(false)
  const [feedback, setFeedback] = useState('')

  const { register, handleSubmit, reset } = useForm<Contato>({
    defaultValues: {
      assunto: '',
      celular: '',
      email: '',
      mensagem: '',
      nome: '',
      telefone: '',
    },
  })

  const handleMasterDataFormSubmit = async (data: Contato) => {
    const saveUserAjuda = new SustentabilidadeMasterDataService()

    const newAjudaField = {
      assunto: data.assunto,
      celular: data.celular,
      email: data.email,
      mensagem: data.mensagem,
      nome: data.nome,
      telefone: data.telefone,
    }

    const dataSaved = await saveUserAjuda.postRequest(newAjudaField)

    if (dataSaved) {

      fetch(`https://api.rd.services/platform/conversions?api_key=08fd99b7cca9605662afaddf473877a1`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            "event_type": "CONVERSION",
            "event_family": "CDP",
            "payload": {
              "conversion_identifier": "sustentabilidade",
              "name": data.nome,
              "email": data.email,
              'cf_mensagem': data.mensagem
            }
          }
        )
      })

      setFeedback('Menssagem enviada com sucesso!')
    } else {
      setFeedback('Ocorreu um erro. Tente novamente mais tarde')
    }

    await new Promise(r => setTimeout(r, 5000))

    reset()
  }

  if (feedback !== '') {
    setTimeout(() => {
      setFeedback('')
    }, 2000)
  }

  return (
    <div className={handles.InstitucionalForm_containerGeral}>
      <div className={handles.InstitucionalForm_containerFlex}>
        <div className={handles.InstitucionalForm_containerForm}>
          <p className={handles.InstitucionalForm_p}>
            queremos que você faça parte da construção da nossa marca, então
            conta pra gente como podemos fortalecer nosso trabalho em busca de
            uma Suntime mais sustentável e afetiva?
          </p>
          <form
            className={handles.InstitucionalForm_form}
            onSubmit={handleSubmit(handleMasterDataFormSubmit)}
          >
            <label className={handles.InstitucionalForm_label} htmlFor="nome">
              nome:
              <input
                className={handles.InstitucionalForm_input}
                required
                placeholder="digite o seu nome"
                type="text"
                id="nome"
                {...register('nome')}
                onChange={() => {
                  setValueChange(true)
                }}
              />
            </label>
            <label className={handles.InstitucionalForm_label} htmlFor="email">
              e-mail:
              <input
                className={handles.InstitucionalForm_input}
                required
                placeholder="email@email.com.br"
                type="email"
                id="email"
                {...register('email')}
                onChange={() => {
                  setValueChange(true)
                }}
              />
            </label>

            <label
              className={handles.InstitucionalForm_label}
              htmlFor="mensagem"
            >
              sugestões ou dúvidas
              <textarea
                className={handles.InstitucionalForm_textarea}
                id="mensagem"
                placeholder=""
                rows={5}
                cols={5}
                {...register('mensagem')}
                onChange={() => {
                  setValueChange(true)
                }}
              />
            </label>

            <button
              disabled={!valueChange}
              className={handles.InstitucionalForm_button}
              type="submit"
            >
              ENVIAR
            </button>
            {feedback !== '' && (
              <div className={handles.InstitucionalForm_formFeedbackContainer}>
                <h1 className={handles.InstitucionalForm_formFeedback}>
                  {feedback}
                </h1>
              </div>
            )}
          </form>
        </div>
        <img
          className={handles.InstitucionalForm_img}
          src={image}
          alt="Fale Conosco"
        />
      </div>
    </div>
  )
}
