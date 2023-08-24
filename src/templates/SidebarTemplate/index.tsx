import * as S from './styles'
import React, { useState, useEffect, useRef, useContext } from 'react'

import { Button, Avatar, Typography, Icon } from '@alirok.com/rok-ui'
import { PopupModal } from '../../components/PopupModal'
import { useRouter } from 'next/router'
import { parseCookies, setCookie } from 'nookies'
import ReactTooltip from 'react-tooltip'
import Navbar from '../../components/Navbar'
import { UserMenu } from '../../components/UserMenu'
import { PopupActions } from 'reactjs-popup/dist/types'
import { Context } from '../../context'
import { useProduction } from 'hooks/useProduction'
import { useMediaQuery } from 'hooks/useWindowSize'
import useLogout from '../../hooks/useLogout'
import useInvitationsCount from '../../hooks/useInvitationsCount'
import { NOT_ALLOWED_PARCEL_RATE, COMPANY_TYPES } from '../../helpers/constants'
import rokApiV2 from 'services/rokApiV2'
import {
  ratesAppRoutes,
  vendorAppRoutes,
  customerAppRoutes,
  invitationsAppRoutes,
  dropOffLocationsAppRoutes
} from '../../helpers/appRoutes'
import { User } from 'services/rokApiV2.declarations'

interface IProps {
  children: React.ReactNode
  isMobileMode?: boolean
}

export const RatesOptions = [
  { label: 'Add new rates', location: ratesAppRoutes.RATES },
  {
    label: 'Value Services rates',
    location: ratesAppRoutes.VALUE_SERVICES_VIEW
  },
  { label: 'Parcel rates', location: ratesAppRoutes.PARCEL_RATE_LIST }
]

export const AccountsOptions = [
  { label: 'Payables', location: 'payables' },
  { label: 'Receivables', location: 'receivables' }
]

export default function SidebarTemplate({ children }: IProps) {
  // Variables
  const actualDate = Date.now()
  const { selectedCompanyUuid } = parseCookies()

  const [hasCompany, setHasCompany] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)
  const [hiddenSheet, setHiddenSheet] = useState<boolean>(false)
  const userMenuRef = useRef<PopupActions>(null)
  const profileMenuRef = useRef<PopupActions>(null)
  const [handleLogout] = useLogout()
  const { dispatch, state } = useContext(Context)
  const { refreshInvitationsCount } = useInvitationsCount()
  const [isSelectUser, setIsSelectUser] = useState<boolean>(false)

  const { push } = useRouter()

  const isProduction = useProduction()

  const ref = useRef<HTMLDivElement>(null)

  const currentCompanyType = state.general.currentCompany?.company_types
    ?.name as COMPANY_TYPES

  const { useQuery: isMobile } = useMediaQuery(
    '(max-width: 1024px)',
    true,
    false
  )

  const invitationsSent = state.general.invitationsSent || 0
  const invitationsReceived = state.general.invitationsReceived || 0
  const totalInvitationsCount = invitationsSent + invitationsReceived

  // Fetch the current user data
  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await rokApiV2().get<User>(
          'customer/accounts/users/currentUser'
        )
        setUser(data)
      } catch (error) {
        handleLogout()
      }
    })()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.general.currentUser])

  useEffect(() => {
    if (selectedCompanyUuid) {
      refreshInvitationsCount()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompanyUuid])

  // Trigger mobile menu
  useEffect(() => {
    if (state.general.triggerMobileMenu) {
      userMenuRef.current?.open()

      // Reset the trigger
      dispatch({
        type: 'SET_TRIGGER_MOBILE_MENU',
        value: false
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.general.triggerMobileMenu])

  useEffect(() => {
    if (user) {
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

        dispatch({
          type: 'SET_IS_COMPANY_SELECTED',
          value: true
        })

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

          if (!isSelectUser) {
            dispatch({
              type: 'SET_IS_COMPANY_SELECTED',
              value: true
            })
          } else {
            dispatch({
              type: 'SET_IS_COMPANY_SELECTED',
              value: false
            })
          }

          return setHasCompany(true)
        } else {
          dispatch({
            type: 'SET_IS_COMPANY_SELECTED',
            value: false
          })
          return setHasCompany(false)
        }
      } else {
        dispatch({
          type: 'SET_IS_COMPANY_SELECTED',
          value: false
        })
        return setHasCompany(false)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, dispatch])

  const profileMenuOnClick = (menu: string) => {
    if (menu === 'company-wizard') {
      push('/dashboard/company-wizard#legal_name')
    } else if (menu === 'company-profile') {
      push('/dashboard/company-profile')
    } else if (menu === 'users') {
      push('/dashboard/users')
    } else if (menu === 'drop-off-locations') {
      push(dropOffLocationsAppRoutes.DROP_OFF_LOCATIONS_LIST)
    } else if (menu === 'profile') {
      push('/dashboard/profile')
    } else if (menu === 'logout') {
      handleLogout()
    }

    profileMenuRef?.current?.close()
  }

  const sidebarMenu = (
    <S.UserMiniature>
      <PopupModal
        className="user-account-popup"
        key="login"
        ref={profileMenuRef}
        onOpen={() => setHiddenSheet(true)}
        onClose={() => setHiddenSheet(false)}
        isMobileMode={isMobile}
        dynamicHeight={true}
        dynamicPadding={true}
        maxHeight="39rem"
        maxWidth={hasCompany ? '62.2rem' : '35.3rem'}
        rightPosition={!isMobile ? true : false}
        trigger={
          <S.AvatarWrapper>
            {state.general.isCompanySelected ? (
              [state.general.currentCompany].map((owner) =>
                owner?.logo ? (
                  <Avatar
                    elevation="card"
                    size={46}
                    src={`${owner.logo}?${actualDate}`}
                  />
                ) : (
                  <Avatar
                    elevation="card"
                    size={46}
                    background="default"
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
              )
            ) : user?.photo ? (
              <Avatar
                elevation="card"
                size={46}
                src={`${user.photo}?${actualDate}` || 'undefined'}
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
                    data-tip={user ? user.first_name : 'User'}
                    onClick={() => {
                      setIsSelectUser(true)
                      dispatch({ type: 'SET_CURRENT_USER', value: user })
                      dispatch({
                        type: 'SET_IS_COMPANY_SELECTED',
                        value: false
                      })
                      profileMenuRef.current?.close()
                    }}
                  >
                    <Avatar
                      elevation="card"
                      size={46}
                      src={`${user.photo}?${actualDate}`}
                    />
                  </div>
                ) : user ? (
                  <div
                    data-tip={user ? user.first_name : 'User'}
                    onClick={() => {
                      setIsSelectUser(true)
                      dispatch({ type: 'SET_CURRENT_USER', value: user })
                      dispatch({
                        type: 'SET_IS_COMPANY_SELECTED',
                        value: false
                      })
                      profileMenuRef.current?.close()
                    }}
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
                ) : (
                  ''
                )}
                {hasCompany &&
                  user?.companies &&
                  user.companies.length > 0 &&
                  user.companies.map((company) =>
                    company?.logo ? (
                      <div
                        onClick={() => {
                          setIsSelectUser(false)
                          dispatch({
                            type: 'SET_CURRENT_COMPANY',
                            value: company
                          })

                          setCookie(
                            null,
                            'selectedCompanyUuid',
                            company.company_uuid || '',
                            {
                              maxAge: 86400 * 7,
                              path: '/',
                              domain: '.alirok.com'
                            }
                          )

                          dispatch({
                            type: 'SET_IS_COMPANY_SELECTED',
                            value: true
                          })

                          profileMenuRef.current?.close()
                        }}
                        key={company.legal_name}
                        data-tip={company.legal_name || 'undefined'}
                      >
                        <Avatar
                          elevation="card"
                          size={46}
                          src={`${company.logo}?${actualDate}`}
                        />
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          setIsSelectUser(false)
                          dispatch({
                            type: 'SET_CURRENT_COMPANY',
                            value: company
                          })

                          setCookie(
                            null,
                            'selectedCompanyUuid',
                            company.company_uuid || '',
                            {
                              maxAge: 86400 * 7,
                              path: '/',
                              domain: '.alirok.com'
                            }
                          )

                          dispatch({
                            type: 'SET_IS_COMPANY_SELECTED',
                            value: true
                          })
                          profileMenuRef.current?.close()
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
                  onClick={() => profileMenuOnClick('company-wizard')}
                >
                  <Button size="large" circle={true} data-tip="Add company">
                    <Icon name="plus-icon" color="white" hoverColor="white" />
                  </Button>
                </S.PlusBtnWrapper>
              </S.SideNav>
              <S.MainContainer hasCompany={hasCompany}>
                {hasCompany &&
                  state.general.currentCompany &&
                  [state.general.currentCompany].length > 0 &&
                  [state.general.currentCompany].map((company) => (
                    <S.CompanyContent key={company.legal_name}>
                      <S.ProfileTitle>
                        {company?.logo ? (
                          <Avatar
                            elevation="card"
                            size={46}
                            src={`${company.logo}?${actualDate}`}
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
                          {company.legal_name}
                        </Typography>
                      </S.ProfileTitle>
                      <S.OptionsContainer>
                        <S.Options>
                          <div
                            onClick={() =>
                              profileMenuOnClick('company-profile')
                            }
                          >
                            <Typography variant="h3">My account</Typography>
                          </div>
                          <div onClick={() => profileMenuOnClick('users')}>
                            <Typography variant="h3">Users</Typography>
                          </div>
                          {!isProduction && state.general.isCompanySelected && (
                            <div
                              onClick={() =>
                                profileMenuOnClick('drop-off-locations')
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
                  ))}
                <S.ProfileContent>
                  <S.ProfileTitle>
                    {user?.photo ? (
                      <Avatar
                        elevation="card"
                        size={46}
                        src={`${user.photo}?${actualDate}` || 'undefined'}
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
                      {user?.first_name}
                    </Typography>
                  </S.ProfileTitle>
                  <S.OptionsContainer>
                    <S.Options>
                      <div onClick={() => profileMenuOnClick('profile')}>
                        <Typography variant="h3">My settings</Typography>
                      </div>
                      <div onClick={() => profileMenuOnClick('logout')}>
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
    </S.UserMiniature>
  )

  return (
    <S.Section>
      <ReactTooltip place="right" effect="solid" />
      <S.Sidebar>
        <PopupModal
          key="login"
          ref={userMenuRef}
          onOpen={() => setHiddenSheet(true)}
          onClose={() => setHiddenSheet(false)}
          isMobileMode={isMobile}
          dynamicHeight={true}
          dynamicPadding={true}
          marginAdmin={true}
          maxHeight="39rem"
          maxWidth={hasCompany ? '62.2rem' : '40.3rem'}
          rightPosition={!isMobile ? true : false}
          trigger={
            <S.SidebarMenu>
              <Icon name="menu2" color="white" width="23px" height="23px" />
            </S.SidebarMenu>
          }
        >
          {() => {
            return (
              <UserMenu
                logo={
                  state.general.isCompanySelected
                    ? state.general.currentCompany?.logo
                    : user?.photo
                }
                user={
                  state.general.isCompanySelected
                    ? state.general.currentCompany?.fantasy_name
                      ? state.general.currentCompany.fantasy_name
                      : null
                    : user
                    ? user.first_name
                    : 'User'
                }
                onPush={() => userMenuRef?.current?.close()}
                invitationsSent={invitationsSent}
                invitationsReceived={invitationsReceived}
              />
            )
          }}
        </PopupModal>
        <S.SidebarOptions>
          <S.SideMenu>
            <S.MenuUL>
              <S.MenuWrapper>
                <S.MenuItem
                  onClick={() => push('/dashboard')}
                  className={
                    location.pathname === '/dashboard' ? 'active-menu' : ''
                  }
                >
                  <Icon name="menu2" color="white" width="30px" height="30px" />
                </S.MenuItem>
                <S.MenuItemWrapper>
                  <S.MenuLI>
                    <S.SubMenuItem
                      onClick={() => {
                        dispatch({
                          type: 'SET_SHIPMENT_TAB',
                          value: 'parcel'
                        })
                        push('/dashboard')
                      }}
                    >
                      Parcel shipments
                    </S.SubMenuItem>
                    <S.SubMenuItem
                      onClick={() => {
                        dispatch({
                          type: 'SET_SHIPMENT_TAB',
                          value: 'land'
                        })
                        push('/dashboard')
                      }}
                    >
                      Land shipments
                    </S.SubMenuItem>
                    <S.SubMenuItem
                      onClick={() => {
                        dispatch({
                          type: 'SET_SHIPMENT_TAB',
                          value: 'air'
                        })
                        push('/dashboard')
                      }}
                    >
                      Air shipments
                    </S.SubMenuItem>
                  </S.MenuLI>
                </S.MenuItemWrapper>
              </S.MenuWrapper>
              {!isProduction &&
                state.general.isCompanySelected &&
                !NOT_ALLOWED_PARCEL_RATE.includes(currentCompanyType) && (
                  <S.MenuWrapper>
                    <S.MenuItem
                      onClick={() => push(ratesAppRoutes.RATES)}
                      className={
                        [
                          ratesAppRoutes.RATES,
                          ratesAppRoutes.VALUE_SERVICES_VIEW,
                          ratesAppRoutes.PARCEL_RATE_LIST
                        ].includes(location.pathname)
                          ? 'active-menu'
                          : ''
                      }
                    >
                      <Icon
                        name="analysis"
                        color="white"
                        width="30px"
                        height="30px"
                      />
                    </S.MenuItem>
                    <S.MenuItemWrapper>
                      {RatesOptions.map((row, key) => (
                        <S.MenuLI key={key}>
                          <S.SubMenuItem onClick={() => push(row.location)}>
                            {row.label}
                          </S.SubMenuItem>
                        </S.MenuLI>
                      ))}
                    </S.MenuItemWrapper>
                  </S.MenuWrapper>
                )}
              {!isProduction && state.general.isCompanySelected && (
                <S.MenuWrapper>
                  <S.MenuItem
                    onClick={() => push('/accounts/payables')}
                    className={
                      ['/accounts/payables', '/accounts/receivables'].includes(
                        location.pathname
                      )
                        ? 'active-menu'
                        : ''
                    }
                  >
                    <Icon
                      className="cursor-pointer"
                      name="dollar-alt"
                      color="white"
                      width="30px"
                      height="30px"
                    />
                  </S.MenuItem>
                  <S.MenuItemWrapper>
                    {AccountsOptions.map((row, key) => (
                      <S.MenuLI key={key}>
                        <S.SubMenuItem
                          onClick={() => push(`/accounts/${row.location}`)}
                        >
                          {row.label}
                        </S.SubMenuItem>
                      </S.MenuLI>
                    ))}
                  </S.MenuItemWrapper>
                </S.MenuWrapper>
              )}
              <S.MenuWrapper className="ml-3">
                <S.MenuItem
                  onClick={() => push('/dashboard/members')}
                  className={
                    ['/dashboard/members', '/vendors', '/customers'].includes(
                      location.pathname
                    )
                      ? 'active-menu'
                      : ''
                  }
                >
                  <Icon name="users" color="white" width="24px" height="20px" />
                </S.MenuItem>
                <S.MenuItemWrapper>
                  <S.MenuLI>
                    {!isProduction && state.general.isCompanySelected && (
                      <>
                        <S.SubMenuItem
                          onClick={() => push(vendorAppRoutes.LIST)}
                        >
                          Vendors
                        </S.SubMenuItem>
                        <S.SubMenuItem
                          onClick={() => push(customerAppRoutes.LIST)}
                        >
                          Customers
                        </S.SubMenuItem>
                      </>
                    )}
                    <S.SubMenuItem onClick={() => push('/dashboard/members')}>
                      Members
                    </S.SubMenuItem>
                  </S.MenuLI>
                </S.MenuItemWrapper>
              </S.MenuWrapper>
              <S.MenuWrapper>
                <S.MenuItem
                  onClick={() => push('/dashboard/invite-friends  ')}
                  className={
                    location.pathname === '/dashboard/invite-friends'
                      ? 'active-menu'
                      : ''
                  }
                >
                  <Icon
                    name="add-group"
                    color="gradient"
                    width="30px"
                    height="30px"
                  />
                  {!isProduction &&
                    state.general.isCompanySelected &&
                    totalInvitationsCount > 0 && (
                      <S.MenuItemBadge>{totalInvitationsCount}</S.MenuItemBadge>
                    )}
                </S.MenuItem>
                <S.MenuItemWrapper>
                  <S.MenuLI>
                    {!isProduction && state.general.isCompanySelected && (
                      <>
                        <S.SubMenuItem
                          onClick={() =>
                            push(invitationsAppRoutes.INVITATIONS_SENT)
                          }
                        >
                          Invitations Sent{' '}
                          <S.SubMenuItemBadge>
                            {invitationsSent}
                          </S.SubMenuItemBadge>
                        </S.SubMenuItem>
                        <S.SubMenuItem
                          onClick={() =>
                            push(invitationsAppRoutes.INVITATIONS_RECEIVED)
                          }
                        >
                          Invitations Received
                          <S.SubMenuItemBadge>
                            {invitationsReceived}
                          </S.SubMenuItemBadge>
                        </S.SubMenuItem>
                      </>
                    )}
                    <S.SubMenuItem
                      onClick={() => push('/dashboard/invite-friends')}
                    >
                      Invite Friends
                    </S.SubMenuItem>
                  </S.MenuLI>
                </S.MenuItemWrapper>
              </S.MenuWrapper>
            </S.MenuUL>
          </S.SideMenu>
        </S.SidebarOptions>
        {sidebarMenu}
      </S.Sidebar>
      <Navbar hiddenSheet={hiddenSheet} />
      <S.Children ref={ref}>{children}</S.Children>
    </S.Section>
  )
}
