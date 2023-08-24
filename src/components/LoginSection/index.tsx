import { useState, useEffect, useContext } from 'react'
import * as S from './styles'

import { Button, Avatar, Typography, Icon } from '@alirok.com/rok-ui'
import { PopupModal } from '../PopupModal'
import { useRouter } from 'next/router'
import { useAuth } from '../../hooks/useAuth'
import { useProduction } from 'hooks/useProduction'
import { parseCookies, setCookie } from 'nookies'
import ReactTooltip from 'react-tooltip'
import { useLocale } from '../../hooks/useLocale'
import { Context } from 'context'
import useLogout from '../../hooks/useLogout'
import { dropOffLocationsAppRoutes } from 'helpers/appRoutes'

interface IProps {
  isMobileMode?: boolean
}

export interface Company {
  company_uuid?: string | null
  legal_name?: string | null
  fantasy_name?: string | null
  tax_id?: string | null
  email?: string | null
  logo?: string | null
  isAddressComplete?: boolean
  address?: {
    city: string
    state: string
    country: string
    postal_code: string
    street: string
    street_number: string
  }
}

const LoginSection = ({ isMobileMode }: IProps) => {
  const { t } = useLocale()
  const [handleLogout] = useLogout()
  const isProduction = useProduction()
  const [hasCompany, setHasCompany] = useState<boolean>(false)
  const [selectedCompany, setSelectedCompany] = useState<Company>()
  const { push } = useRouter()
  const { user } = useAuth()
  const { state, dispatch } = useContext(Context)

  useEffect(() => {
    if (user) {
      const { selectedCompanyUuid } = parseCookies()

      if (!selectedCompanyUuid && user.companies && user.companies.length > 0) {
        dispatch({ type: 'SET_CURRENT_COMPANY', value: user.companies[0] })

        if (user.companies[0].company_uuid) {
          setCookie(
            null,
            'selectedCompanyUuid',
            user.companies[0].company_uuid,
            {
              maxAge: 86400 * 7,
              path: '/',
              domain: '.alirok.com'
            }
          )
        }

        return setHasCompany(true)
      } else if (
        selectedCompanyUuid &&
        user.companies &&
        user.companies.length > 0
      ) {
        const comp = user.companies.find(
          (e) => e.company_uuid === selectedCompanyUuid
        )

        if (comp) {
          dispatch({ type: 'SET_CURRENT_COMPANY', value: comp })
          setSelectedCompany(comp)
          return setHasCompany(true)
        } else {
          return setHasCompany(false)
        }
      } else {
        setSelectedCompany(user.companies[0])
        return setHasCompany(false)
      }
    }
  }, [user, dispatch])

  return (
    <>
      <S.LoginSection>
        {!user ? (
          isMobileMode ? (
            <S.MobileMenuButton onClick={() => push('/access?section=login')}>
              <Icon name="menu-mobile" color="gradient" />
            </S.MobileMenuButton>
          ) : (
            <S.AccessButtons>
              <Button
                floating
                width={110}
                variant="clean"
                onClick={() => push('/access?section=login')}
              >
                <S.ButtonText>{t.loginSection.login}</S.ButtonText>
              </Button>
              <Button
                floating
                width={110}
                variant="default"
                onClick={() => push('/access?section=joinUs')}
              >
                <S.ButtonText>{t.loginSection.register}</S.ButtonText>
              </Button>
            </S.AccessButtons>
          )
        ) : (
          <PopupModal
            key="login"
            isMobileMode={isMobileMode}
            className="login-section"
            dynamicHeight={true}
            dynamicPadding={true}
            maxHeight="39rem"
            maxWidth={hasCompany ? '62.2rem' : '40.3rem'}
            trigger={
              <S.AvatarWrapper>
                {state.general.isCompanySelected ? (
                  selectedCompany && selectedCompany.logo ? (
                    <Avatar
                      elevation="card"
                      size={46}
                      src={selectedCompany.logo}
                    />
                  ) : (
                    <Avatar
                      elevation="card"
                      size={46}
                      icon={
                        <Icon
                          name="vendors"
                          color="gradient"
                          width="20px"
                          height="20px"
                        />
                      }
                    />
                  )
                ) : user?.photo ? (
                  <Avatar elevation="card" size={46} src={user.photo} />
                ) : (
                  <Avatar
                    elevation="card"
                    size={46}
                    icon={
                      <Icon
                        name="user"
                        color="gradient"
                        width="20px"
                        height="20px"
                      />
                    }
                  />
                )}
              </S.AvatarWrapper>
            }
          >
            {() => {
              return (
                <S.Container>
                  <ReactTooltip place="bottom" effect="solid" />
                  <S.SideNav>
                    {user?.photo ? (
                      <div
                        onClick={() => {
                          dispatch({
                            type: 'SET_IS_COMPANY_SELECTED',
                            value: false
                          })
                        }}
                        key={user.first_name}
                        data-tip={user ? user.first_name : 'User'}
                      >
                        <Avatar elevation="card" size={46} src={user.photo} />
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          dispatch({
                            type: 'SET_IS_COMPANY_SELECTED',
                            value: false
                          })
                        }}
                        key={user.first_name}
                        data-tip={user ? user.first_name : 'User'}
                      >
                        <Avatar
                          elevation="card"
                          size={46}
                          icon={
                            <Icon
                              name="user"
                              color="gradient"
                              width="20px"
                              height="20px"
                            />
                          }
                        />
                      </div>
                    )}
                    {hasCompany &&
                      user.companies &&
                      user.companies.length > 0 &&
                      user.companies.map((company) =>
                        company?.logo ? (
                          <div
                            onClick={() => {
                              setSelectedCompany(company)
                              dispatch({
                                type: 'SET_IS_COMPANY_SELECTED',
                                value: true
                              })
                            }}
                            key={company.legal_name}
                            data-tip={company.legal_name || 'undefined'}
                          >
                            <Avatar
                              elevation="card"
                              size={46}
                              src={company.logo}
                            />
                          </div>
                        ) : (
                          <div
                            onClick={() => {
                              setSelectedCompany(company)
                              dispatch({
                                type: 'SET_IS_COMPANY_SELECTED',
                                value: true
                              })
                            }}
                            key={company.legal_name}
                            data-tip={company.legal_name || 'undefined'}
                          >
                            <Avatar
                              elevation="card"
                              size={46}
                              icon={
                                <Icon
                                  name="vendors"
                                  color="gradient"
                                  width="20px"
                                  height="20px"
                                />
                              }
                            />
                          </div>
                        )
                      )}
                    <S.PlusBtnWrapper
                      onClick={() =>
                        push('/dashboard/company-wizard#legal_name')
                      }
                      data-tip="Add company"
                    >
                      <Button size="large" circle={true}>
                        <Icon
                          name="plus-icon"
                          color="white"
                          hoverColor="white"
                        />
                      </Button>
                    </S.PlusBtnWrapper>
                  </S.SideNav>
                  <S.MainContainer hasCompany={hasCompany}>
                    {hasCompany && selectedCompany && (
                      <S.CompanyContent key={selectedCompany.legal_name}>
                        <S.ProfileTitle>
                          {selectedCompany?.logo ? (
                            <Avatar
                              elevation="card"
                              size={46}
                              src={selectedCompany.logo}
                            />
                          ) : (
                            <Avatar
                              elevation="card"
                              size={46}
                              icon={
                                <Icon
                                  name="vendors"
                                  color="gradient"
                                  width="20px"
                                  height="20px"
                                />
                              }
                            />
                          )}
                          <Typography variant="h3" fontWeight="bold">
                            {selectedCompany.legal_name}
                          </Typography>
                        </S.ProfileTitle>
                        <S.OptionsContainer>
                          <S.Options>
                            <div
                              onClick={() => push('/dashboard/company-profile')}
                            >
                              <Typography variant="h3">My account</Typography>
                            </div>
                            <div onClick={() => push('/dashboard/users')}>
                              <Typography variant="h3">Users</Typography>
                            </div>
                            {!isProduction && state.general.isCompanySelected && (
                              <div
                                onClick={() =>
                                  push(
                                    dropOffLocationsAppRoutes.DROP_OFF_LOCATIONS_LIST
                                  )
                                }
                              >
                                <Typography variant="h3">
                                  Warehouse address
                                </Typography>
                              </div>
                            )}
                          </S.Options>
                        </S.OptionsContainer>
                      </S.CompanyContent>
                    )}
                    <S.ProfileContent>
                      <S.ProfileTitle>
                        {user.photo ? (
                          <Avatar
                            elevation="card"
                            size={46}
                            src={user.photo || 'undefined'}
                          />
                        ) : (
                          <Avatar
                            elevation="card"
                            size={46}
                            icon={
                              <Icon
                                name="user"
                                color="gradient"
                                width="20px"
                                height="20px"
                              />
                            }
                          />
                        )}
                        <Typography variant="h3" fontWeight="bold">
                          {user.first_name}
                        </Typography>
                      </S.ProfileTitle>
                      <S.OptionsContainer>
                        <S.Options>
                          <div onClick={() => push('/dashboard/profile')}>
                            <Typography variant="h3">My settings</Typography>
                          </div>
                          <div onClick={() => handleLogout()}>
                            <Typography variant="h3">Log out</Typography>
                          </div>
                        </S.Options>
                        <S.Line />
                        <S.Options>
                          <a href="mailto: alirok@alirok.com">
                            <Typography variant="h3">Help</Typography>
                          </a>
                        </S.Options>
                      </S.OptionsContainer>
                    </S.ProfileContent>
                  </S.MainContainer>
                </S.Container>
              )
            }}
          </PopupModal>
        )}
      </S.LoginSection>
    </>
  )
}

export default LoginSection
