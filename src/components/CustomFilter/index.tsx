import * as S from './styles'
import { useState } from 'react'
import { Box, Select, Button } from '@alirok.com/rok-ui'

export interface Options {
  value: string
  label: string
}

interface IProps {
  options?: Array<Options>
  filteredOptions?: Array<string>
  handleFilterOption: (option: string) => void
  handleExpression: (option: string, condition: string, value: string) => void
  onFinish: () => void
}

export const CONDITIONS = [
  { label: 'Is', value: '===' },
  { label: 'Is not', value: '!==' }
]

export function CustomFilter({
  options,
  filteredOptions,
  handleFilterOption,
  handleExpression,
  onFinish
}: IProps) {
  const [open, setOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<string>('')
  const [selectedCustomOption, setSelectedCustomOption] = useState<string>('')
  const [condition, setCondition] = useState<string>(CONDITIONS[0].value)

  function handleFilters() {
    return { selectedType, condition, selectedCustomOption }
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
              <S.Row>
                Where
                <Select
                  secondary
                  options={options}
                  selected={selectedType}
                  onSelect={(selected) => {
                    setSelectedType(selected || '')
                    handleFilterOption(selected || '')
                  }}
                  displayIcon
                />
                <Select
                  options={CONDITIONS}
                  selected={condition ?? CONDITIONS[0].value}
                  onSelect={(selected) => {
                    setCondition(selected || '')
                  }}
                  displayIcon
                />
                <Select
                  secondary
                  options={filteredOptions?.map((option) => ({
                    label: option,
                    value: option
                  }))}
                  selected={selectedCustomOption}
                  onSelect={(selected) => {
                    setSelectedCustomOption(selected || '')
                  }}
                  displayIcon
                />
              </S.Row>
              <S.ButtonWrapper>
                <Button
                  variant="text"
                  onClick={() => {
                    setOpen(!open)
                    handleFilters()
                    handleExpression(
                      selectedType,
                      condition,
                      selectedCustomOption
                    )
                    onFinish()
                  }}
                >
                  Done
                </Button>
              </S.ButtonWrapper>
            </S.ContentWrapper>
          </Box>
        </S.BoxWrapper>
      )}
    </S.Wrapper>
  )
}
