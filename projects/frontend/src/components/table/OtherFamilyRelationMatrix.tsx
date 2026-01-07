import {
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react-pro'
import { buildRelationMatrix } from '@/lib/services/buildRelationMatrix'
import type { OtherFamilyParsed } from '@/types/otherFamily'

type Props = {
  families: OtherFamilyParsed[]
}

export function OtherFamilyRelationMatrix({ families }: Props) {
  const matrix = buildRelationMatrix(families)

  return (
    <CCard className="mt-4">
      <CCardHeader>Ma trận quan hệ gia tộc</CCardHeader>
      <CCardBody style={{ overflowX: 'auto' }}>
        <CTable small bordered>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Tộc thị</CTableHeaderCell>
              {families.map(f => (
                <CTableHeaderCell key={f.id}>
                  {f.name}
                </CTableHeaderCell>
              ))}
            </CTableRow>
          </CTableHead>

          <CTableBody>
            {matrix.map((row, i) => (
              <CTableRow key={i}>
                <CTableHeaderCell>
                  {families[i].name}
                </CTableHeaderCell>
                {row.map((val, j) => (
                  <CTableDataCell
                    key={j}
                    className="text-center"
                  >
                    {val < 0 ? '—' : `${val}%`}
                  </CTableDataCell>
                ))}
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}
