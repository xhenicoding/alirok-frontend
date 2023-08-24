// Rates application routes
export const dashboardAppRoutes = {
  DASHBOARD: '/dashboard'
}

export const ratesAppRoutes = {
  RATES: '/dashboard/rates',
  VALUE_SERVICES_VIEW: '/dashboard/value-services-view',
  PARCEL_RATE_LIST: '/dashboard/rates/parcel-rates/list',
  PARCEL_RATE: '/dashboard/rates/parcel-rates',
  PARCEL_RATE_EDIT: (parcelRouteUUID: string) => {
    return `/dashboard/rates/parcel-rates/${parcelRouteUUID}`
  }
}

export const vendorAppRoutes = {
  INVITE: '/vendors/invite',
  LIST: '/vendors',
  ACCEPT_INVITE: (relationshipUUID: string) =>
    `/vendors/acceptInvite/${relationshipUUID}`
}

export const customerAppRoutes = {
  INVITE: '/customers/invite',
  LIST: '/customers',
  ACCEPT_INVITE: (relationshipUUID: string) =>
    `/customers/acceptInvite/${relationshipUUID}`
}

export const invitationsAppRoutes = {
  INVITATIONS_RECEIVED: '/invitations/received',
  INVITATIONS_SENT: '/invitations/sent'
}

export const dropOffLocationsAppRoutes = {
  DROP_OFF_LOCATIONS_LIST: '/drop-off-locations',
  DROP_OFF_LOCATIONS_ADD: '/drop-off-locations/add',
  DROP_OFF_LOCATIONS_EDIT: (drop_off_location_uuid: string) =>
    `/drop-off-locations/${drop_off_location_uuid}`
}
