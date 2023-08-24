import { useState } from 'react'

import * as S from './styles'

import { CustomerType, MultiSelect, Select, Customer } from '@alirok.com/rok-ui'

import TravelSelect from 'components/TravelSelect'
import { DropdownDatePicker } from 'components/DropdownDatePicker'

import { MODAL_OPTIONS } from './mock/mockData'

const CARRIERS_OPTION = [
  {
    label: 'Fedex',
    value: 'Fedex',
    avatar:
      'https://shipmondo.com/assets/logos/carrier/round/fedex-8dc5644bc8661088eac3e0c2fcf007f18f0863b21585382469e21bd763f45127.png'
  },
  {
    label: 'DHL',
    value: 'DHL',
    avatar:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAxlBMVEX/////ywXYFjX/0wD/yAD/1ADgSi7WADf/yQDXDTbcNTHYFjTUADj2qhf/zgD/zATynBvuiyD/8tL/+/L/+u3/1lz/6Kr/7sL/00f/45b/6a//7Lz/23X/1E76ug///vr/0Tz/9dz/3X7/2Wr/zSH/4I3/5J3/2Gf/9dr/0Db/8Mv/4IneQDDodSb9wgv5tBLaKTPkYirmainvkh/3rRXhUS3thiL10MreOxbSACLSABX/3U7keYXuqqbbJiLjWizocyfxmRwsCaL1AAAIkUlEQVR4nO2dbUOqTBCGD7EIli6laaZWZmbnHLXs9bw/1f//U88uKwq7C0oKMxDXx1WUvZ2ZnRkW+fKlJN9cMKDPATfHje5pvzUwHLLAMQat/mm3cQx9Zri47A4HXB2OEcAbYC8Mht1L6HNEQWN85slkxOBJdjZuQJ8rKBe9Ky5UnE5BxQi56n3WWNZr8biUCKZXqwd93tnT6CdWaqlX/3P5Y3v0MaV8vUZt6BlkRfN64zgVKZdDrpvQ88iA5nAbowqa17Docl1MdiOVkGtS6LVxvDuphFxj6BmlxomxU6k8uYwT6FmlQrNFdi0Vh7QKGLrau/XAFQ4pWh7R7KRiVgLSKZRx9dIyK4FDClQD9VM0KwHpQ89xRzRHqZqVwBkVwhUb6brgUi1SgPK6nboL+uR/VZxkphVTawI92+24yVArptYN9Hy34SyTcLXCOYOe8cfpZKwVU6sDPeePkr1W+VUrax9cqJVLT2yBaMXUakHPPDnplzhR5K/0OQXTiql1Cj37ZPQAtWJq5aoJcQmqFVMrR/tILmCl4uTnug9M0hAkPwkEZHD3yUuQ/4pAK6bWV2gdNgJaJh9oHTZhCB6wBM4QWon1NFA4IScHfWZoiYJAa7GOUyROyHGQr4jHaJyQQ3BvoYfqy+jB3a3BE90FqGP8N1SGxUzrG7Qi0ZwgMyxmWnj3umWxqSEZzghakyjwGRZi08IWsThYoxa2pVCAdEHElWP54My1cCXvK1Cm8dcoDYuZ1jW0MhqQasXUglZGBWPeIECYPdzgtSx8W9zQGhYzLWhtZGCv18eD7mo+Xi9E6IeIDQudH37HLdZ3aH1CTBB7IfNDXBvk8XWyguDqajVReyHzQ0x3QeFN3wWoknisRbQPqmIafvdaPKj2tiH3QlSZFta+3wpEHUB9fHdNax2maVL5MPkoM2rc5aNU+UhXKxaeCD/WhSz3tnqwlunDIQ3LZb2GD9ubL8YfpPEDwmQxZ9KX7FVvdWo5eP6HRbvZz9yv7q2lWrWrj1bwqEc7/A77zhOTHkrjtSc2Tus16QNrdcVUPbHwbAPULYbWmzS7SOxXc3kUPZe1OjKFmcrjMzbuEvk77DdTPRUD1XKoOTta31SrxcQ9XDoPm2P12dKaaXXKD7GmkvFW9/VaGYh2AarxXf3N46idL+KM9SAfZnivmDPZsHhkMl8Uw9IGLA6a3EFTGSq/eSz2TAQafWDShCb7kAesO0Wrd23A8sTCUh2qtzWpv3ks1eeYwMTNVFLefmDO6bqK5veWfCIrsbDc+qRscmCWYMcjRaCKJ4oamCzqui61KtK4F5msZzlgzWmUEyLa8qC2SV0zHmn6Yg1TA1P9zkM2UxGw5Bxjzz6PdEJEzdKYKzvcMgIsElDZ32p3ri5n2vPtUBp9NDU5hp9kRImF5QpPL7LnYD2H/bEmIrDkb4ucacMlwX61NDnGMsmIwMEiVjdKLMVVqrxEkf1tkTNVNhTrgEcm615ZQYzogMXF6kKrtKAdIZbiKqIWkfPViJwpAq/8UXIMP8mIFgvLXyBFiKW4isgEZH+LyJmitHoxNTmGGM6FZUW4oewqwt0MOgvFsZqXM5E1qcaSCo9MdC4PT2MDFiax9AFecRW/eeI+1YPwQfe8viE86Lm3ynBkmbMUC0uA71ElkXJVV6nOLD/LCuAlE64pdfZMKlA6ezy4K+8WXUQJGs72KBaxfvysSEyJq7az7Kn8tkpln4d8ei69MhUZhnsrjz9yCYjmcxSmDzT0sT9/QKu04MevmsQ7VdJxblsK9oOXus+lUVH9GObUDo+LMqcSHtXDl9hq4Ix+YRHr0qFhDKpJx3VLm1dAK30ZkY1t3JfRwZIUyguGJQ6WQrr5fhjkvU43S8ftV351Qe3LiM4wfdL1ZdSsQfvJbya9C53VO5YWzZffYSe8U/oE+l9/ZhkxfRlD15cxqFI/a6jum+55+Jx+Q2u05ChEnW7iKvZeXfRlprr+i9qBqc6Fvb1vIBbzV3oYPqkjaI2W/AknAxuk47Y9c2l0YGLjR/K4aMC49GCt0drvlMrZxR9ojZb8PQi09Yjr7sXMhy1Utj1/IYtrpPWapvjh5Y88/rioZ9zbCvuSOMHse0vpPh78hdZoyb//9n3mT5Q+zPdjeH57PLcWPU3XkV6cv4m6hU6lF1YdY9e6e7mXXw4yZeuLPPbfP2iNlpzQUOasJvRSch2oTTSJt3Y8WCe7a77AVTu1FM/l+3JjSBLwiwWtUIByM1sCym2SCSg34Cag3NqdhPKmgQSUt6MkoLzRKQm4xYJWR6K8OTMB5W2/ScAsFrQ2Cnj9EJ0XYk7iUaXvC/BaFrQyGrAW06iKaB+sHUBMfb8V5Z+NJaD8G7sklH+QmACM2QPGvEGAr6uFrJMVBJ9p4TUsfFELbcTiYFsQsS6FAly5FtIcywdXGo8zeV9RPvAjCdAKBYHWYi14Yjzu6C4oH3+VBGiVfKB12IjykX1JKB8GmQT4vW2odq/FUz7ANgnlo5GTUD50Ownl49yT0AdTi/Sh554cqG4N8r5MBDAJRI6ShhAdALWcDvSsP0r2auVXq+w9Ma8+KLjJdE0k+LatJWKSoVoE13b3D9DOTC2C5V+ftqBBMglcTh66yOtpZrEFwhmhupdpC9IvffJY4kTRS9cVnby1GeJpdlI0LtIpigv6tNMyLqcIq6BMs5WKcZFW0cxKcGLs3LgcA/FutS0Z79YXHYLn0RQpcDHZnVwOmeToGs6HaA53I5dDhsUMVmGa18TZUi/HIdefQSqP9mgb83LIqIDZQgyNPvmYXg4h/UKUzMnotRLrxZRqFaqyScBF74psHL9YnCJXvaKvf/E0xmdcsFjFHC7U2fgTep+Gy+5wQDzJwqJ5A+yFwbCbq50e6XPc6J72WwMelwSOMWj1T7sN5JvZoblgQJ9DyZb8D83v3nKavJ64AAAAAElFTkSuQmCC'
  },
  {
    label: 'Skypostal',
    value: 'Skypostal',
    avatar:
      'https://www.ordertracker.com/app/template/img/couriers/skypostal.png'
  }
]

export default function ValueServicesTemplate() {
  const today = new Date()

  const [time, setTime] = useState<{
    effective: Date | null
    expires: Date | null
  }>({
    effective: today,
    expires: null
  })

  function effectiveCannotBeAfterThan(date: Date) {
    const result = new Date(date)
    result.setDate(result.getDate() - 1)
    return result
  }

  function expiresOnMinDate(date: Date) {
    const result = new Date(date)
    result.setDate(result.getDate() + 1)
    return result
  }

  const [selectedCarrierVendor, setSelectedCarrierVendor] = useState<string[]>(
    []
  )
  const [allCarrierVendors, setAllCarrierVendors] = useState<boolean>(false)
  const [allModals, setAllModals] = useState<boolean>(false)
  const [onClose, setOnClose] = useState<boolean>(false)
  const [modals, setModals] = useState<string[]>([])

  return (
    <S.StyledValueServicesTemplate>
      <S.StyledNav>
        <img
          src="https://static.alirok.io/collections/illustrations/logistics-safekeeping.svg"
          alt="Containers with a list"
          style={{ width: '100%' }}
        />
      </S.StyledNav>
      <S.StyledContent.Container>
        <S.StyledContent.Navbar>
          <DropdownDatePicker
            label="Effective on"
            maxDate={
              time.expires
                ? effectiveCannotBeAfterThan(time.expires)
                : undefined
            }
            value={time.effective}
            onChangeDateValue={(date: Date) => {
              setTime({ ...time, effective: date })
            }}
          />

          {time.effective && (
            <>
              <div
                style={{
                  borderRight: '1px solid grey',
                  height: '22px',
                  marginRight: '32px'
                }}
              />
              <DropdownDatePicker
                label="Expires on"
                minDate={expiresOnMinDate(time.effective)}
                value={time.expires}
                onChangeDateValue={(date: Date) => {
                  setTime({ ...time, expires: date })
                  setOnClose(true)
                }}
                closeCalendar={onClose}
              />
            </>
          )}
        </S.StyledContent.Navbar>
        {time.expires ? (
          <>
            <S.StyledContent.Content padding={32} height={105}>
              <MultiSelect
                label="Modal"
                toggleLabel="All Modals"
                toggleAllItems={setAllModals}
                allItems={allModals}
                selected={modals}
                data={MODAL_OPTIONS}
                onSelect={(selectedModals) => {
                  setModals(selectedModals)
                }}
                maxWidth="250px"
              />

              <MultiSelect
                avatar={true}
                maxWidth="200px"
                label="Carrier . Vendor"
                toggleLabel="All Carriers, Vendors"
                data={CARRIERS_OPTION}
                toggleAllItems={setAllCarrierVendors}
                allItems={allCarrierVendors}
                selected={selectedCarrierVendor}
                onSelect={(newSelectedCarrierVendor) => {
                  setSelectedCarrierVendor(newSelectedCarrierVendor)
                }}
              />

              <TravelSelect label="Origin" />

              <TravelSelect label="Destination" />
            </S.StyledContent.Content>
            <S.StyledContent.Header>
              <Select
                disabled
                options={[
                  {
                    code: 'USD',
                    value: '7c0a1c21-fe05-400f-830d-d919a0865cd8'
                  }
                ].map((currency) => ({
                  label: currency.code,
                  value: currency.value,
                  avatar: `https://static.alirok.io/collections/icons/flags/${currency.code
                    .slice(0, 2)
                    .toLowerCase()}.svg`
                }))}
                searchable
                selected={'7c0a1c21-fe05-400f-830d-d919a0865cd8'}
                onSelect={() => {
                  //to define
                }}
              />
              <Select
                options={[
                  {
                    label: 'KG',
                    value: 'kg'
                  },
                  {
                    label: 'LB',
                    value: 'lb'
                  }
                ]}
                displayIcon
                selected={'kg'}
                // eslint-disable-next-line
                onSelect={(selected) => {
                  //to define
                }}
              />
              <CustomerType
                options={[
                  {
                    label: 'ABC Corp',
                    value: 'ABC Corp'
                  },
                  {
                    label: 'XYZ Logistics',
                    value: 'XYZ Logistics'
                  }
                ]}
              />
              <Customer />
            </S.StyledContent.Header>
          </>
        ) : (
          <></>
        )}
      </S.StyledContent.Container>
    </S.StyledValueServicesTemplate>
  )
}
