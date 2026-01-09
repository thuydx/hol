import {CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle,} from '@coreui/react-pro'

type DropdownCellProps = {
  value: number
  options: Record<number, string>
  labels: Record<string, string>
  onChange: (value: number) => void
}

export function DropdownCell({
                               value,
                               options,
                               labels,
                               onChange,
                             }: DropdownCellProps) {
  const currentLabel =
    options[value] && labels[options[value]]
      ? labels[options[value]]
      : value

  const maxLabelLength = Math.max(
    ...Object.values(options).map(
      key => (labels[key]?.length ?? 0),
    ),
  )

  const widthPx = Math.max(60, maxLabelLength * 8 + 24)

  return (
    <CDropdown style={{width: widthPx}}>
      <CDropdownToggle color="light" size="sm">
        {currentLabel}
      </CDropdownToggle>
      <CDropdownMenu style={{minWidth: widthPx}}>
        {Object.entries(options).map(([num, key]) => (
          <CDropdownItem
            key={num}
            onClick={() => onChange(Number(num))}
          >
            {labels[key]}
          </CDropdownItem>
        ))}
      </CDropdownMenu>
    </CDropdown>
  )
}
