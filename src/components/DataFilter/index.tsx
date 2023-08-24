import * as S from './styles'
import { ReactElement, useState } from 'react'
import { Box, Select, Button } from '@alirok.com/rok-ui'
import {
  IDataFilter,
  IDataFilteredOptions,
  NUMBER_OPERATOR,
  STRING_OPERATOR,
  DATE_OPERATOR
} from './dataFilter.interface'

export interface Options {
  value: string
  label: string
}

interface IDataFilterProps {
  options?: Array<IDataFilter>
  onFilterSubmit: () => void
}

const DataFilter = ({
  options
}: // onFilterSubmit
IDataFilterProps): ReactElement => {
  const [open, setOpen] = useState(false)
  const [filterRows, setFilterRows] = useState<IDataFilteredOptions[]>([
    {
      key: '',
      operator: '',
      value: ''
    }
  ])

  const handleUpdateFilter = (rowNo: number, selected: string, key: string) => {
    setFilterRows((prevProps) => {
      const oldData = prevProps[rowNo]

      if (oldData) {
        return prevProps.map((row1, key1) => {
          if (rowNo === key1) {
            return {
              ...oldData,
              [key]: selected as string
            }
          }

          return row1
        })
      }

      return prevProps
    })
  }

  const fetchOperatorOptions = (filterRow: IDataFilteredOptions) => {
    if (filterRow.key) {
      const operatorType =
        options?.find((row) => row.value === filterRow.key)?.type || ''

      if (operatorType === 'string') {
        return STRING_OPERATOR
      } else if (operatorType === 'number') {
        return NUMBER_OPERATOR
      } else if (operatorType === 'date') {
        return DATE_OPERATOR
      } else {
        return []
      }
    } else {
      return []
    }
  }

  const fetchSelectValueOptions = (filterRow: IDataFilteredOptions) => {
    if (filterRow.key) {
      const selectValue = options?.find((row) => row.value === filterRow.key)

      console.log(selectValue)

      // if (operatorType === 'string') {
      //   return STRING_OPERATOR
      // } else if (operatorType === 'number') {
      //   return NUMBER_OPERATOR
      // } else if (operatorType === 'date') {
      //   return DATE_OPERATOR
      // } else {
      //   return []
      // }
      return []
    } else {
      return []
    }
  }

  return (
    <S.Wrapper>
      <button>
        <p onClick={() => setOpen(!open)}>Filter</p>
      </button>
      {open && (
        <S.BoxWrapper>
          <Box
            elevation="card"
            width="max-content"
            height="auto"
            borderRadius="30px"
          >
            <S.ContentWrapper>
              <div>
                <h3>Filter</h3>
              </div>
              {filterRows.map((filterRow: IDataFilteredOptions, index) => (
                <S.Row key={index}>
                  When
                  <Select
                    secondary
                    options={options?.map((row) => ({
                      label: row.label,
                      value: row.value
                    }))}
                    selected={filterRows[index]?.key || ''}
                    onSelect={(selected) =>
                      handleUpdateFilter(index, selected as string, 'key')
                    }
                    displayIcon
                  />
                  <Select
                    options={fetchOperatorOptions(filterRow)}
                    selected={filterRows[index]?.operator || ''}
                    onSelect={(selected) =>
                      handleUpdateFilter(index, selected as string, 'operator')
                    }
                    displayIcon
                  />
                  <Select
                    secondary
                    options={fetchSelectValueOptions(filterRow)}
                    selected={filterRows[index]?.value || ''}
                    onSelect={(selected) =>
                      handleUpdateFilter(index, selected as string, 'value')
                    }
                    displayIcon
                  />
                </S.Row>
              ))}

              <S.ButtonWrapper>
                <Button
                  variant="text"
                  onClick={() =>
                    setFilterRows((prevState) => [
                      ...prevState,
                      { key: '', operator: '', value: '' }
                    ])
                  }
                >
                  + Add Rule
                </Button>
                <Button
                  variant="text"
                  onClick={() =>
                    setFilterRows([{ key: '', operator: '', value: '' }])
                  }
                >
                  Clear
                </Button>
                <Button variant="text">Done</Button>
              </S.ButtonWrapper>
            </S.ContentWrapper>
          </Box>
        </S.BoxWrapper>
      )}
    </S.Wrapper>
  )
}

export default DataFilter
