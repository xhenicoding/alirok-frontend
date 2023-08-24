export const G_TAG_TRACKING_CODE = 'AW-348526699'

export const VENDOR_LOGO =
  'https://static.alirok.io/collections/icons/vendors.svg'

export enum COMPANY_TYPES {
  AIRLINE = 'Airline',
  GSA = 'GSA',
  EXPORTER = 'Exporter',
  IMPORTER = 'Importer',
  WAREHOUSE_3PL = 'Warehouse (3PL)',
  TRUCKING = 'Trucking',
  THIRD_PARTY = 'Third-party',
  FREIGHT_FORWARDER = 'Freight Forwarder',
  SHIPPING_LIN = 'Shipping Line'
}

export const SEARCH_PATHS = ['/', '/pt-BR', '/en-US']

export const NOT_ALLOWED_PARCEL_RATE = [
  COMPANY_TYPES.EXPORTER,
  COMPANY_TYPES.IMPORTER,
  COMPANY_TYPES.THIRD_PARTY
]

export const CARGO_TYPE_OPTIONS = [
  { label: 'Plastic Pallet', value: 'plasticPallet' },
  { label: 'Wooden Pallet', value: 'woodenPallet' },
  { label: 'Loose Carton', value: 'looseCarton' },
  { label: 'Wooden crate', value: 'woodenCrate' },
  { label: 'Metal crate', value: 'metalCrate' },
  { label: 'Bags', value: 'bags' }
]

export const CARGO_SHIPPING_TYPE_OPTIONS = [
  { label: 'General Cargo', value: 'generalcargo' }
]

export const PAYMENT_TERMS_OPTIONS: string[] = ['0', '15', '30', '45', '60']

export const PARCEL_RATE_INTRO = [
  {
    text: 'How to add parcel rate?',
    link: 'https://alirok.com/'
  },
  {
    text: 'How to add first-mile?',
    link: 'https://alirok.com/'
  },
  {
    text: 'How to add insurance fee?',
    link: 'https://alirok.com/'
  },
  {
    text: 'How to add drop-off address?',
    link: 'https://alirok.com/'
  },
  {
    text: 'How to add automate rates?',
    link: 'https://alirok.com/'
  },
  {
    text: 'How to add restrictions?',
    link: 'https://alirok.com/'
  }
]
