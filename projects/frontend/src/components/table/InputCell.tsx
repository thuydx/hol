type InputCellProps<T> = {
  value: any
  type?: 'text' | 'number'
  onChange: (value: any) => void
  onBlur?: () => void
  disabled?: boolean
}

export function InputCell<T>({
                               value,
                               type,
                               onChange,
                               onBlur,
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
      onBlur={onBlur}
      style={{width: '100%'}}
    />
  )
}
