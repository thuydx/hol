'use client'

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardSubtitle,
  CCardTitle,
  CCol,
  CFormInput,
  CFormSelect,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'

import {useI18nClient} from '@/lib/i18nClient'

import {useFarm} from '@/hooks/farms'
import {useZhuangTou} from '@/hooks/zhuangTou'
import {FarmParsed} from '@/models/farms'

/* =============================
 * COLUMN CONFIG (UI ONLY)
 * ============================= */
type Column =
  | { key: keyof FarmParsed; type: 'text' | 'number'; width?: number }
  | { key: keyof FarmParsed; type: 'select'; options: string[]; width?: number }
  | { key: 'farmerCount' | 'farmerRatio'; type: 'compound'; sub: number; width?: number }
  | { key: 'belongToClan'; type: 'status'; width?: number }
  | { key: 'farmHeadId'; type: 'farm-head'; width?: number }

const COLUMNS: Column[] = [
  {key: 'farmName', type: 'text', width: 160},
  {key: 'area', type: 'select', options: ['4', '9', '16', '25'], width: 90},
  {key: 'maxFarmers', type: 'number', width: 80},
  {key: 'environment', type: 'number', width: 100},
  {key: 'security', type: 'number', width: 90},
  {key: 'convenience', type: 'number', width: 90},
  {key: 'farmHeadId', type: 'farm-head', width: 220},
  {key: 'farmerCount', type: 'compound', sub: 3},
  {key: 'farmerRatio', type: 'compound', sub: 3},
  {key: 'belongToClan', type: 'status', width: 110},
]

/* =============================
 * PAGE
 * ============================= */
export default function FarmPage() {
  const {farms, updateFarm, loading} = useFarm()
  const {groups: zhuangTouGroups} = useZhuangTou()

  const {t} = useI18nClient<{
    farm: {
      title: string
      instruction: string
      columns: Record<string, string>
      actions: {
        OWNER: string
        ABANDONED: string
        OCCUPIED: string
      }
    }
  }>()

  /* =============================
   * RENDER HELPERS
   * ============================= */

  const renderTextInput = (
    farm: FarmParsed,
    rowIndex: number,
    key: keyof FarmParsed,
    type: 'text' | 'number'
  ) => (
    <CFormInput
      size="sm"
      type={type}
      value={String(farm[key] ?? '')}
      onChange={e =>
        updateFarm(rowIndex, {[key]: e.target.value} as any)
      }
    />
  )

  const renderSelect = (
    farm: FarmParsed,
    rowIndex: number,
    key: keyof FarmParsed,
    options: string[]
  ) => (
    <CFormSelect
      size="sm"
      value={String(farm[key] ?? '')}
      onChange={e =>
        updateFarm(rowIndex, {[key]: e.target.value} as any)
      }
    >
      <option value="">—</option>
      {options.map(o => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </CFormSelect>
  )

  const renderCompound = (
    farm: FarmParsed,
    rowIndex: number,
    key: 'farmerCount' | 'farmerRatio',
    sub: number
  ) => {
    const values = farm[key]

    return (
      <div className="d-flex gap-1">
        {Array.from({length: sub}).map((_, i) => (
          <CFormInput
            key={i}
            size="sm"
            type="text"
            style={{width: '60px', textAlign: 'center'}}
            value={values[i] ?? '0'}
            onChange={e => {
              const next = [...values] as any
              next[i] = String(
                Math.max(0, Math.min(10000, Number(e.target.value || 0)))
              )
              updateFarm(rowIndex, {[key]: next} as any)
            }}
          />
        ))}
      </div>
    )
  }

  const renderFarmHead = (
    farm: FarmParsed,
    rowIndex: number
  ) => {
    const options = zhuangTouGroups[rowIndex] ?? []

    return (
      <CFormSelect
        size="sm"
        value={farm.farmHeadId ?? ''}
        onChange={e =>
          updateFarm(rowIndex, {farmHeadId: e.target.value})
        }
      >
        <option value="">—</option>
        {options.map(o => (
          <option key={o.id} value={o.id}>
            {o.name}
          </option>
        ))}
      </CFormSelect>
    )
  }

  const renderBelongToClan = (
    farm: FarmParsed,
    rowIndex: number
  ) => {
    const value = Number(farm.belongToClan)

    if (value > 0) {
      return (
        <CButton style={{width: '100px'}} size="sm" color="secondary" disabled>
          {t.farm.actions.OCCUPIED}
        </CButton>
      )
    }

    if (value === -1) {
      return (
        <CButton
          style={{width: '100px'}}
          size="sm"
          color="danger"
          onClick={() =>
            updateFarm(rowIndex, {belongToClan: '0'})
          }
        >
          {t.farm.actions.OWNER}
        </CButton>
      )
    }

    return (
      <CButton
        style={{width: '100px'}}
        size="sm"
        color="success"
        onClick={() =>
          updateFarm(rowIndex, {belongToClan: '-1'})
        }
      >
        {t.farm.actions.ABANDONED}
      </CButton>
    )
  }

  /* =============================
   * RENDER
   * ============================= */

  if (loading) return null

  return (
    <CRow>
      <CCol md={12}>
        <CCard>
          <CCardHeader>
            <CCardTitle>{t.farm.title}</CCardTitle>
            <CCardSubtitle>{t.farm.instruction}</CCardSubtitle>
          </CCardHeader>

          <CCardBody>
            <CTable striped hover small>
              <CTableHead>
                <CTableRow>
                  {COLUMNS.map(col => (
                    <CTableHeaderCell
                      key={col.key}
                      style={
                        col.width
                          ? {width: `${col.width}px`}
                          : undefined
                      }
                    >
                      {t.farm.columns[col.key] ?? col.key}
                    </CTableHeaderCell>
                  ))}
                </CTableRow>
              </CTableHead>

              <CTableBody>
                {farms.map((farm, idx) => (
                  <CTableRow key={idx}>
                    {COLUMNS.map(col => (
                      <CTableDataCell key={col.key}>
                        {col.type === 'text' || col.type === 'number'
                          ? renderTextInput(
                            farm,
                            idx,
                            col.key,
                            col.type
                          )
                          : col.type === 'select'
                            ? renderSelect(
                              farm,
                              idx,
                              col.key,
                              col.options
                            )
                            : col.type === 'compound'
                              ? renderCompound(
                                farm,
                                idx,
                                col.key,
                                col.sub
                              )
                              : col.type === 'farm-head'
                                ? renderFarmHead(farm, idx)
                                : renderBelongToClan(farm, idx)}
                      </CTableDataCell>
                    ))}
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
