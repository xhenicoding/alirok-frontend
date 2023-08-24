import React from 'react'
import SidebarTemplate from 'templates/SidebarTemplate'
import AccountsPayableReceivable from '../components/index'

export default function Accounts() {
  return <AccountsPayableReceivable type="receivables" />
}

Accounts.getLayout = (page: React.ReactNode) => (
  <SidebarTemplate>{page}</SidebarTemplate>
)
