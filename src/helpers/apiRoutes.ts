// Parcel rates API routes
export const parcelRouteApiRoutes = {
  FETCH_PARCEL_ROUTE: (parcelRouteUUID: string) =>
    `/customer/parcel/parcel-rates/parcel-route/${parcelRouteUUID}`,
  SAVE_PARCEL_ROUTE: '/customer/parcel/parcel-rates/parcel-route',
  PUBLISH_PARCEL_ROUTE: 'customer/parcel/parcel-rates/publish',
  SAVE_PARCEL_RATE: 'customer/parcel/parcel-rates',
  SAVE_PARCEL_RATE_MODALS: 'customer/parcel/parcel-rates/modals',
  LOCATION_REFERENCE_TYPES: '/location-reference-types',
  COVERAGES: '/coverages',
  LENGTH_MEASURES: '/length-measures',
  PARCEL_MASS_MEASURES: '/parcel-mass-measures',
  CURRENCY: '/misc/currency',
  COMPANY_TYPES: '/company-types',
  CUSTOMERS: '/company-relationships/parcel-rate-relationships/customer',
  VENDORS: '/company-relationships/parcel-rate-relationships/vendor',
  RATE_TYPES: (companyUUID: string) =>
    `/customer/parcel/parcel-rates/rate-types?companyId=${companyUUID}`,
  CREATE_RATE_TYPE: '/customer/parcel/parcel-rates/rate-type',
  DELETE_RATE_TYPE: (optionId: string) =>
    `/customer/parcel/parcel-rates/rate-type/${optionId}`,
  DIMENSIONS_COMPANY: '/dimensions/company',
  GROSS_DIMENSIONS_COMPANY: '/dimensions/company/gross-factor',
  DEL_DIMENSIONS_COMPANY: (dimensionId: string) =>
    `/dimensions/company/${dimensionId}`,
  DEL_PARCEL_ROUTE: (parcelRouteUUID: string) =>
    `/customer/parcel/parcel-rates/parcel-route/${parcelRouteUUID}`,
  COMPANIES_CARRIERS: '/misc/companies/carriers',
  CREATE_CUSTOMER_TYPE: 'customer/parcel/parcel-rates/customer-type',
  DELETE_CUSTOMER_TYPE: (parcelRouteUUID: string) =>
    `customer/parcel/parcel-rates/customer-type/${parcelRouteUUID}`,
  CREATE_CUSTOMER: 'customer/parcel/parcel-rates/customer',
  DELETE_CUSTOMER: (parcelRouteUUID: string) =>
    `customer/parcel/parcel-rates/customer/${parcelRouteUUID}`,
  CREATE_LOCATION_REFERENCE: 'customer/parcel/parcel-rates/location-reference',
  CREATE_AIRPORT_LOCATION:
    'customer/parcel/parcel-rates/create-airport-location',
  CREATE_PORT_LOCATION: 'customer/parcel/parcel-rates/create-port-location',
  FETCH_DROP_OFF_LOCATIONS: 'customer/parcel/parcel-rates/drop-off-locations',
  FETCH_PARCEL_RATE_SOURCES: 'customer/parcel/parcel-rates/sources',
  FETCH_NEXT_PREVIOUS_PARCEL_RATE: (action: string, parcelRouteUUID?: string) =>
    `/customer/parcel/parcel-rates/find/${action}/route/${parcelRouteUUID}`
}

// Currency API routes
export const currencyApiRoutes = {
  CURRENCY_CONVERT: (toCurrencyCode: string, fromCurrencyCode = 'USD') => {
    const params = [
      toCurrencyCode ? `toCurrencyCode=${toCurrencyCode}` : '',
      fromCurrencyCode ? `fromCurrencyCode=${fromCurrencyCode}` : ''
    ]
      .filter((curr) => curr)
      .join('&')

    return `/misc/currency/convert-rate?${params}`
  }
}

// Vendor API routes
export const vendorApiRoutes = {
  LIST_INVITES: '/company-relationships/invites-list/vendor',
  INVITE_VENDOR: '/company-relationships/invite/vendor',
  INVITE_CONNECTED_VENDOR:
    '/company-relationships/invitations/connected/vendor',
  FETCH_PENDING_INVITE: (relationType: string, relationshipUUID: string) =>
    `/company-relationships/pending-invite/${relationType}/${relationshipUUID}`,
  ACCEPT_PENDING_INVITE: (relationType: string, relationshipUUID: string) =>
    `/company-relationships/accept-pending-invite/${relationType}/${relationshipUUID}`
}

// Customer API routes
export const customerApiRoutes = {
  LIST_INVITES: '/company-relationships/invites-list/customer',
  INVITE_CUSTOMER: '/company-relationships/invite/customer',
  INVITE_CONNECTED_CUSTOMER:
    '/company-relationships/invitations/connected/customer',
  FETCH_PENDING_INVITE: (relationType: string, relationshipUUID: string) =>
    `/company-relationships/pending-invite/${relationType}/${relationshipUUID}`,
  ACCEPT_PENDING_INVITE: (relationType: string, relationshipUUID: string) =>
    `/company-relationships/accept-pending-invite/${relationType}/${relationshipUUID}`
}

// Invitations API routes
export const invitationsApiRoutes = {
  RECEIVED: '/company-relationships/invitations/received',
  SENT: '/company-relationships/invitations/sent',
  FETCH_INVITATIONS_COUNT: '/company-relationships/invitations/count',
  VERIFY_INVITATION: (relationshipUUID: string) =>
    `company-relationships/verify-invitation/${relationshipUUID}`
}

// Warehouse types API routes
export const warehouseTypesApiRoute = {
  LIST: '/warehouse-types'
}

// Modals types API routes
export const modalsApiRoute = {
  LIST: '/modals'
}

export const dropOffLocationApiRoute = {
  LIST: 'drop-off-locations',
  CREATE: 'drop-off-locations',
  DELETE: (drop_off_location_uuid: string) =>
    `drop-off-locations/${drop_off_location_uuid}`,
  FETCH: (drop_off_location_uuid: string) =>
    `drop-off-locations/${drop_off_location_uuid}`,
  CARRIER_VENDORS: '/drop-off-locations/carrier-vendors'
}
