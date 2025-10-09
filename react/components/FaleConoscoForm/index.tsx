import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCssHandles } from 'vtex.css-handles'
import ReactInputMask from 'react-input-mask'

import {
  Contato,
  FaleConoscoMasterDataService,
} from './services/FaleConoscoMasterData'

const HANDLES = [
  'FaleConoscoForm_containerGeral',
  'FaleConoscoForm_containerFlex',
  'InstitucionalForm_form',
  'FaleConoscoForm_container',
  'InstitucionalForm_label',
  'InstitucionalForm_input',
  'InstitucionalForm_button--fale-conosco',
  'InstitucionalForm_textarea',
  'InstitucionalForm_formFeedback',
  'InstitucionalForm_formFeedbackSpan',
  'FaleConoscoForm_containerForm',
  'InstitucionalForm_formFeedbackContainer',
] as const

export const FaleConoscoForm = () => {
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
    const saveUserAjuda = new FaleConoscoMasterDataService()

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
              "conversion_identifier": "fale-conosco",
              'cf_assunto': data.assunto,
              'cf_mensagem': data.mensagem,
              "mobile_phone": data.telefone,
              "email": data.email,
              "name": data.nome
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
    <div className={handles.FaleConoscoForm_containerGeral}>
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

        <label className={handles.InstitucionalForm_label} htmlFor="celular">
          telefone:
          <ReactInputMask
            mask="(99) 99999-9999"
            placeholder="(00) 00000-0000"
            className={handles.InstitucionalForm_input}
            type="text"
            id="telefone"
            {...register('celular')}
            onChange={() => {
              setValueChange(true)
            }}
          />
        </label>

        <label className={handles.InstitucionalForm_label} htmlFor="mensagem">
          mensagem:
          <textarea
            className={handles.InstitucionalForm_textarea}
            id="mensagem"
            placeholder="digite aqui sua mensagem"
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
          className={handles['InstitucionalForm_button--fale-conosco']}
          type="submit"
        >
          ENVIAR
        </button>
        {feedback !== '' && (
          <div className={handles.InstitucionalForm_formFeedbackContainer}>
            <h1 className={handles.InstitucionalForm_formFeedback}>
              {feedback}
              <br />
              {feedback === 'Menssagem enviada com sucesso!' && (
                <p className={handles.InstitucionalForm_formFeedbackSpan}>
                  Em breve retornaremos o contato
                </p>
              )}
            </h1>
          </div>
        )}
      </form>
    </div>
  )
}
