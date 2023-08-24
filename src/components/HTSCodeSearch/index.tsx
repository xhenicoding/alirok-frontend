import * as S from './styles'
import { debounce } from 'lodash'
import { htsApi } from 'services/htsApi'
import { IHtsCode } from 'services/htsApi.declarations'
import { Dispatch, SetStateAction, useState } from 'react'
import { Loader } from 'components/Loader'
import { Helper, Icon } from '@alirok.com/rok-ui'

export type ShowHTSModal = {
  show: boolean
  itemIndex: number | undefined
}
export interface IProps {
  modalState: string | undefined
  onChange: (htsCode: string, description: string) => void
  setShowHTSCodeModal: Dispatch<SetStateAction<ShowHTSModal>>
}

const HTSCodeSearch = ({
  onChange,
  modalState,
  setShowHTSCodeModal
}: IProps) => {
  const [description, setDescription] = useState(modalState)
  const [htsCodeList, setHtsCodeList] = useState<IHtsCode[]>()
  const [loading, setLoading] = useState(false)

  const handleSelectedOption = (htsCode: IHtsCode) => {
    onChange(htsCode.htsno, description || htsCode.description)
  }

  const getDebouncedCodes = debounce((inputValue) => {
    setLoading(true)
    htsApi.get(`/hts/search?query=${inputValue}`).then((res) => {
      const filterResults = res.data.results.filter((item: IHtsCode) => {
        let filteredHts = item.htsno
        filteredHts = filteredHts.replace(/[^0-9]/g, '')

        return filteredHts.length >= 6
      })

      setHtsCodeList(filterResults)
      setLoading(false)
    })
  }, 1000)

  return (
    <S.HTSWrapper>
      <S.Wrapper>
        <S.CloseBtn
          onClick={() => {
            setShowHTSCodeModal({
              show: false,
              itemIndex: 0
            })
          }}
        >
          <Icon name="close" color="gradient" width="30px" height="30px" />
        </S.CloseBtn>
        <S.Header>
          <S.Title>Enter the item description in English language</S.Title>
          <S.HelperWrapper alignMobile={true}>
            <Helper
              placement="left"
              width={'270px'}
              trigger={
                <S.HelperTrigger>
                  <S.HelperTriggerContent>?</S.HelperTriggerContent>
                </S.HelperTrigger>
              }
            >
              <S.HelperContent>
                This description will be used for export and import customs
                declaration, you will be able to print the shipping label,
                invoice and customs forms at the end of this flow.
              </S.HelperContent>
            </Helper>
          </S.HelperWrapper>
        </S.Header>
        <S.InputWrapper>
          <S.Input
            value={description}
            onChange={(e) => {
              setDescription(e.target.value)
              getDebouncedCodes(e.target.value)
            }}
            type="text"
            placeholder="type your description"
          />
          <S.Link href="https://hts.usitc.gov/" target="_blank" />
        </S.InputWrapper>
      </S.Wrapper>
      <S.Wrapper>
        <S.Header>
          <S.Title>Enter the HTS Code</S.Title>
          <S.HelperWrapper>
            <Helper
              placement={window.innerWidth <= 768 ? 'left' : 'right'}
              width={'270px'}
              trigger={
                <S.HelperTrigger>
                  <S.HelperTriggerContent>?</S.HelperTriggerContent>
                </S.HelperTrigger>
              }
            >
              <S.HelperContent>
                Harmonized Code - HTS code is required for customs clearance
                when shipping internationally.
              </S.HelperContent>
            </Helper>
          </S.HelperWrapper>
        </S.Header>
        <S.HtsInputWrapper>
          <S.Input
            onChange={(e) => {
              getDebouncedCodes(e.target.value)
            }}
            type="text"
            placeholder="type the 8 digits HTS Code"
          />
          <S.HtsLink href="https://hts.usitc.gov/" target="_blank">
            Search HTS Code
          </S.HtsLink>
        </S.HtsInputWrapper>
      </S.Wrapper>
      <S.Wrapper>
        <S.Title>Possible matches</S.Title>
        <S.ResultsList>
          {loading && <Loader />}
          {htsCodeList && !loading && htsCodeList.length < 1 && (
            <S.Empty>
              No matches found. Type HTS above or try another description
            </S.Empty>
          )}
          {htsCodeList &&
            !loading &&
            htsCodeList.map((htsCode, index) => (
              <S.Result
                key={index}
                onClick={() => handleSelectedOption(htsCode)}
              >
                <S.Code>{htsCode.htsno}</S.Code>
                <S.Description>{htsCode.description}</S.Description>
              </S.Result>
            ))}
        </S.ResultsList>
      </S.Wrapper>
    </S.HTSWrapper>
  )
}

export default HTSCodeSearch
