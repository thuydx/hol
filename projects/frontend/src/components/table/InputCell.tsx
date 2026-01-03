type InputCellProps<T> = {
  value: any
  type?: 'text' | 'number'
  onChange: (value: any) => void
}

export function InputCell<T>({
                               value,
                               type,
                               onChange,
                             }: InputCellProps<T>) {
  return (
    <input
      type={type ?? 'text'}
      value={value ?? ''}
      onChange={e =>
        onChange(
          type === 'number'
            ? Number(e.target.value)
            : e.target.value,
        )
      }
      style={{ width: '100%' }}
    />
  )
}
