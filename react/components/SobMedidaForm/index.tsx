import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCssHandles } from 'vtex.css-handles'
import ReactInputMask from 'react-input-mask'

import {
  Contato,
  SobMedidaMasterDataService,
} from './services/SobMedidaMasterData'

const HANDLES = [
  'SobMedidaForm',
  'InstitucionalForm_containerGeral',
  'InstitucionalForm_containerFlex',
  'InstitucionalForm_img',
  'InstitucionalForm_form',
  'InstitucionalForm_h2',
  'InstitucionalForm_p',
  'InstitucionalForm_span',
  'InstitucionalForm_container',
  'InstitucionalForm_label',
  'InstitucionalForm_input',
  'InstitucionalForm_button',
  'InstitucionalForm_textarea',
  'InstitucionalForm_formFeedback',
  'InstitucionalForm_formFeedbackContainer',
  'InstitucionalForm_containerForm',
  'InstitucionalForm_title',
] as const

export const SobMedidaForm = () => {
  const { handles } = useCssHandles(HANDLES)

  const [valueChange, setValueChange] = useState(false)
  const [feedback, setFeedback] = useState('')

  const { register, handleSubmit, reset } = useForm<Contato>({
    defaultValues: {
      nome: '',
      email: '',
      celular: '',
      mensagem: '',
    },
  })

  const handleMasterDataFormSubmit = async (data: Contato) => {
    const saveUserAjuda = new SobMedidaMasterDataService()

    const newAjudaField = {
      nome: data.nome,
      email: data.email,
      celular: data.celular,
      mensagem: data.mensagem,
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
              "conversion_identifier": "sob-medida",
              "name": data.nome,
              "email": data.email,
              "mobile_phone": data.celular,
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
    <div className={handles.SobMedidaForm} id="SobMedidaForm">
      <div className={handles.InstitucionalForm_containerGeral}>
        <div className={handles.InstitucionalForm_containerFlex}>
          <div className={handles.InstitucionalForm_containerForm}>
            <div>
              <h2 className={handles.InstitucionalForm_title}>
                agende agora sua visita
              </h2>
              <p className={handles.InstitucionalForm_p}>
                informe seus dados e entraremos em contato para agendarmos o seu dia!
              </p>
              <span className={handles.InstitucionalForm_span}>
                *rua bandeira paulista, 600 conjunto 84 - itaim bibi - são paulo - sp
              </span>
            </div>
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
              <label
                className={handles.InstitucionalForm_label}
                htmlFor="email"
              >
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
                htmlFor="celular"
              >
                whatsapp:
                <ReactInputMask
                  mask="(99) 99999-9999"
                  placeholder="(00) 01010-0101"
                  className={handles.InstitucionalForm_input}
                  type="text"
                  id="telefone"
                  {...register('celular')}
                  onChange={() => {
                    setValueChange(true)
                  }}
                />
              </label>

              <label
                className={handles.InstitucionalForm_label}
                htmlFor="nascimento"
              >
                data de nascimento:
                <ReactInputMask
                  mask="99/99/9999"
                  placeholder="00/00/00"
                  className={handles.InstitucionalForm_input}
                  type="text"
                  id="nascimento"
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
                <div
                  className={handles.InstitucionalForm_formFeedbackContainer}
                >
                  <h1 className={handles.InstitucionalForm_formFeedback}>
                    {feedback}
                  </h1>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
