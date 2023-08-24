import * as S from './styles'
import { useRouter } from 'next/router'
import { Icon, Avatar } from '@alirok.com/rok-ui'
import { useProduction } from '../../hooks/useProduction'
import { useContext, useState } from 'react'
import { ratesAppRoutes } from '../../helpers/appRoutes'
import { Context } from '../../context/index'
import { COMPANY_TYPES, NOT_ALLOWED_PARCEL_RATE } from 'helpers/constants'

interface IProps {
  logo?: string | null
  user: string | null
  invitationsSent: number
  invitationsReceived: number
  onPush: () => void
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

const actualDate = Date.now()
export function UserMenu({
  logo,
  user,
  invitationsSent,
  invitationsReceived,
  onPush
}: IProps) {
  const { push } = useRouter()
  const { state, dispatch } = useContext(Context)

  const isProduction = useProduction()

  const [menuIdOpened, setMenuIdOpened] = useState<string>('')

  function handleOpenSubmenu(menuId: string) {
    setMenuIdOpened(menuIdOpened === menuId ? '' : menuId)
  }

  const currentCompanyType = state.general.currentCompany?.company_types
    ?.name as COMPANY_TYPES

  const totalInvitationsCount = invitationsSent + invitationsReceived
  const FriendsOptions = [
    {
      label: 'Members',
      location: '/dashboard/members'
    }
  ]

  const Invitations: Record<string, string | number | undefined>[] = [
    {
      label: 'Invite friends',
      location: '/dashboard/invite-friends',
      count: undefined
    }
  ]

  if (state.general.isCompanySelected) {
    FriendsOptions.unshift(
      ...[
        {
          label: 'Vendors',
          location: '/vendors'
        },
        {
          label: 'Customers',
          location: '/customers'
        }
      ]
    )

    Invitations.unshift(
      ...[
        {
          label: 'Invitations Sent',
          location: '/invitations/sent',
          count: invitationsSent
        },
        {
          label: 'Invitations Received',
          location: '/invitations/received',
          count: invitationsReceived
        }
      ]
    )
  }

  return (
    <>
      <S.UserWrapper
        onClick={() => {
          onPush()
        }}
      >
        {logo ? (
          <Avatar elevation="card" size={50} src={`${logo}?${actualDate}`} />
        ) : (
          <Avatar
            elevation="card"
            size={50}
            icon={
              <Icon name="user" color="gradient" width="25px" height="25px" />
            }
          />
        )}
        <p>{user}</p>
      </S.UserWrapper>
      <S.Container>
        <S.OptionWrapper>
          <S.MobileMenuItem
            tabIndex={1}
            htmlFor="shipments"
            onClick={() => handleOpenSubmenu('shipments')}
          >
            <Icon name="menu2" color="black" width="30px" height="30px" />
            <span
              className={
                ['/dashboard'].includes(location.pathname) ? 'active-menu' : ''
              }
            >
              My shipments
            </span>
            <Icon
              name="chevron-down"
              color="black"
              width="30px"
              height="30px"
            />
          </S.MobileMenuItem>
          {menuIdOpened === 'shipments' && (
            <S.MobileSubMenuItems>
              <S.MobileSubMenuItem
                key={'parcel'}
                onClick={() => {
                  dispatch({
                    type: 'SET_SHIPMENT_TAB',
                    value: 'parcel'
                  })
                  push('/dashboard')
                  onPush()
                }}
              >
                Parcel shipments
              </S.MobileSubMenuItem>
              <S.MobileSubMenuItem
                key={'land'}
                onClick={() => {
                  dispatch({
                    type: 'SET_SHIPMENT_TAB',
                    value: 'land'
                  })
                  push('/dashboard')
                  onPush()
                }}
              >
                Land shipments
              </S.MobileSubMenuItem>
            </S.MobileSubMenuItems>
          )}
        </S.OptionWrapper>

        {!isProduction &&
          state.general.isCompanySelected &&
          !NOT_ALLOWED_PARCEL_RATE.includes(currentCompanyType) && (
            <S.OptionWrapper>
              <S.MobileMenuItem
                htmlFor="rate-options"
                tabIndex={3}
                onClick={() => handleOpenSubmenu('rate-options')}
              >
                <Icon
                  name="analysis"
                  color="black"
                  width="30px"
                  height="25px"
                />{' '}
                <span
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
                  Rates
                </span>
                <Icon
                  name="chevron-down"
                  color="black"
                  width="30px"
                  height="30px"
                />
              </S.MobileMenuItem>
              {menuIdOpened === 'rate-options' && (
                <S.MobileSubMenuItems>
                  {RatesOptions.map((row, key) => (
                    <S.MobileSubMenuItem
                      key={key}
                      onClick={() => {
                        push(row.location)
                        onPush()
                      }}
                    >
                      {row.label}
                    </S.MobileSubMenuItem>
                  ))}
                </S.MobileSubMenuItems>
              )}
            </S.OptionWrapper>
          )}
        {!isProduction && state.general.isCompanySelected && (
          <S.OptionWrapper>
            <S.MobileMenuItem
              htmlFor="account-menu"
              tabIndex={3}
              onClick={() => handleOpenSubmenu('account')}
            >
              <Icon
                name="dollar-alt"
                color="black"
                width="30px"
                height="25px"
              />{' '}
              <span
                className={
                  ['/accounts/payables', '/accounts/receivables'].includes(
                    location.pathname
                  )
                    ? 'active-menu'
                    : ''
                }
              >
                Accounting
              </span>
              <Icon
                name="chevron-down"
                color="black"
                width="30px"
                height="30px"
              />
            </S.MobileMenuItem>
            {menuIdOpened === 'account' && (
              <S.MobileSubMenuItems>
                {AccountsOptions.map((row, key) => (
                  <S.MobileSubMenuItem
                    key={key}
                    onClick={() => {
                      push(`/accounts/${row.location}`)
                      onPush()
                    }}
                  >
                    {row.label}
                  </S.MobileSubMenuItem>
                ))}
              </S.MobileSubMenuItems>
            )}
          </S.OptionWrapper>
        )}
        <S.OptionWrapper>
          <S.MobileMenuItem
            tabIndex={3}
            onClick={() => handleOpenSubmenu('friends')}
          >
            <Icon name="users" color="black" width="30px" height="25px" />
            <span
              className={
                FriendsOptions.map((row) => row.location).includes(
                  location.pathname
                )
                  ? 'active-menu'
                  : ''
              }
            >
              Accounts
            </span>
            <Icon
              name="chevron-down"
              color="black"
              width="30px"
              height="30px"
            />
          </S.MobileMenuItem>
          {menuIdOpened === 'friends' && (
            <S.MobileSubMenuItems>
              {FriendsOptions.map((row, key) =>
                !isProduction ? (
                  <S.MobileSubMenuItem
                    key={key}
                    onClick={() => {
                      push(row.location)
                      onPush()
                    }}
                  >
                    {row.label}
                  </S.MobileSubMenuItem>
                ) : (
                  row.label !== 'Vendors' &&
                  row.label !== 'Customers' && (
                    <S.MobileSubMenuItem
                      key={key}
                      onClick={() => {
                        push(row.location)
                        onPush()
                      }}
                    >
                      {row.label}
                    </S.MobileSubMenuItem>
                  )
                )
              )}
            </S.MobileSubMenuItems>
          )}
        </S.OptionWrapper>

        <S.OptionWrapper>
          <S.MobileMenuItem
            tabIndex={3}
            onClick={() => handleOpenSubmenu('inviteFriends')}
          >
            <Icon
              name="add-group"
              color="gradient"
              width="30px"
              height="30px"
            />
            <span
              className={
                Invitations.map((row) => row.location).includes(
                  location.pathname
                )
                  ? 'active-menu'
                  : ''
              }
            >
              Invitations
            </span>
            {totalInvitationsCount > 0 && (
              <S.MenuItemBadge>{totalInvitationsCount}</S.MenuItemBadge>
            )}
            <Icon
              name="chevron-down"
              color="black"
              width="30px"
              height="30px"
            />
          </S.MobileMenuItem>
          {menuIdOpened === 'inviteFriends' && (
            <S.MobileSubMenuItems>
              {Invitations.map((row, key) => (
                <S.MobileSubMenuItem
                  key={key}
                  onClick={() => {
                    push(row.location as string)
                    onPush()
                  }}
                >
                  {row.label}
                  {row.count !== undefined ? (
                    <S.SubMenuItemBadge>{row.count}</S.SubMenuItemBadge>
                  ) : null}
                </S.MobileSubMenuItem>
              ))}
            </S.MobileSubMenuItems>
          )}
        </S.OptionWrapper>
      </S.Container>
    </>
  )
}
