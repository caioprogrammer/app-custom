import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

interface CommonFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onRemove: (event: React.MouseEvent<HTMLButtonElement>) => void
  data: any
  label: string
  id: string
  placeholder: string
}

const HANDLES_FORM = [
  'CommonForm',
  'CommonForm_label',
  'CommonForm_input',
  'CommonForm_inputContainer',
  'CommonForm_button',
  'CommonForm_buttonRemove',
  'CommonForm_errorMessage',
  'CommonForm_errorButton',
  'CommonForm_Success',
  'CommonForm_SuccessText',
] as const

export const CommonForm = ({
  onSubmit,
  onChange,
  label,
  id,
  placeholder,
  data,
  onRemove,
}: CommonFormProps) => {
  const { handles } = useCssHandles(HANDLES_FORM)
  return (
    <form className={handles.CommonForm} onSubmit={onSubmit}>
      <label className={handles.CommonForm_label} htmlFor={id}>
        {label}
      </label>
      {data.success ? (
        <div className={handles.CommonForm_Success}>
          <span className={handles.CommonForm_SuccessText}>{data.result}</span>
          <button
            className={handles.CommonForm_buttonRemove}
            type="button"
            onClick={onRemove}
          >
            <img src={require('../assets/close-x-button.svg')} alt="Limpar" />
          </button>
        </div>
      ) : (
        <div className={handles.CommonForm_inputContainer}>
          <input
            className={handles.CommonForm_input}
            type="text"
            id={id}
            placeholder={placeholder}
            onChange={onChange}
            value={data.value}
          />
          <button className={handles.CommonForm_button} type="submit">
            ok
          </button>

          {data.error && (
            <span className={handles.CommonForm_errorMessage}>
              {data.message}
            </span>
          )}
        </div>
      )}
    </form>
  )
}
