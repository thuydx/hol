type InputCellProps<T> = {
  value: any
  type?: 'text' | 'number'
  onChange: (value: any) => void
  disabled: boolean
}

export function InputCell<T>({
                               value,
                               type,
                               onChange,
                               disabled = false,
                             }: InputCellProps<T>) {
  return (
    <input
      type={type ?? 'text'}
      value={value ?? ''}
      disabled={disabled}
      onChange={e =>
        onChange(
          type === 'number'
            ? Number(e.target.value)
            : e.target.value,
        )
      }
      style={{width: '100%'}}
    />
  )
}
