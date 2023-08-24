export const VALUE_SEVICES_DATA = [
  {
    carrier: {
      fantasy_name: 'cargolux',
      logo: 'https://static.alirok.io/collections/logos/cargolux.png'
    },
    modal: 'parcel',
    origin: ['US', 'CA'],
    destination: ['BR', 'CR'],
    customer_type: 'Public',
    customer: [
      {
        fantasy_name: 'UPS',
        logo: 'https://static.alirok.io/collections/logos/ups.png'
      },
      {
        fantasy_name: 'USPS',
        logo: 'https://static.alirok.io/collections/logos/usps.png'
      },

      {
        fantasy_name: 'Alirok',
        logo: 'https://static.alirok.io/collections/logos/logo.png'
      }
    ],
    expires_on: '2022-10-30T04:00:00.000Z',
    published: true
  },
  {
    carrier: {
      fantasy_name: 'cargolux',
      logo: 'https://static.alirok.io/collections/logos/cargolux.png'
    },
    modal: 'parcel',
    origin: ['US', 'CA'],
    destination: ['BR', 'CR'],
    customer_type: 'Shipping line',
    customer: [
      {
        fantasy_name: 'UPS',
        logo: 'https://static.alirok.io/collections/logos/ups.png'
      },
      {
        fantasy_name: 'USPS',
        logo: 'https://static.alirok.io/collections/logos/usps.png'
      }
    ],
    expires_on: '2025-10-30T04:00:00.000Z',
    published: false
  },
  {
    carrier: {
      fantasy_name: 'cargolux',
      logo: 'https://static.alirok.io/collections/logos/cargolux.png'
    },
    modal: 'parcel',
    origin: ['US', 'CA'],
    destination: ['BR', 'CR'],
    customer_type: 'Forwarder',
    customer: [
      {
        fantasy_name: 'UPS',
        logo: 'https://static.alirok.io/collections/logos/ups.png'
      },
      {
        fantasy_name: 'USPS',
        logo: 'https://static.alirok.io/collections/logos/usps.png'
      },
      {
        fantasy_name: 'Alirok',
        logo: 'https://static.alirok.io/collections/logos/logo.png'
      },
      {
        fantasy_name: 'Alirok',
        logo: 'https://static.alirok.io/collections/logos/logo.png'
      },
      {
        fantasy_name: 'Alirok',
        logo: 'https://static.alirok.io/collections/logos/logo.png'
      }
    ],
    expires_on: '2021-10-30T04:00:00.000Z',
    published: true
  },
  {
    carrier: {
      fantasy_name: 'Kopacz Worldwide',
      logo: 'https://static.alirok.io/collections/logos/koreanair.png'
    },
    modal: 'air',
    origin: ['US', 'CA'],
    destination: ['BR', 'CR'],
    customer_type: 'Public',
    customer: [
      {
        fantasy_name: 'UPS',
        logo: 'https://static.alirok.io/collections/logos/ups.png'
      },
      {
        fantasy_name: 'jet-blue',
        logo: 'https://static.alirok.io/collections/logos/jet-blue.png'
      },
      {
        fantasy_name: 'Alirok',
        logo: 'https://static.alirok.io/collections/logos/logo.png'
      },
      {
        fantasy_name: 'Alirok',
        logo: 'https://static.alirok.io/collections/logos/logo.png'
      },
      {
        fantasy_name: 'Alirok',
        logo: 'https://static.alirok.io/collections/logos/logo.png'
      }
    ],
    expires_on: '2022-06-21T04:00:00.000Z',
    published: false
  }
]

export const FILTERS = [
  {
    value: 'carrier',
    label: 'Carrier'
  },
  {
    value: 'customer_type',
    label: 'Customer type'
  },
  {
    value: 'customer',
    label: 'Customer'
  }
]

export const SORT = [
  {
    value: 'carrier',
    label: 'Carrier'
  },
  {
    value: 'customer_type',
    label: 'Customer type'
  },
  {
    value: 'customer',
    label: 'Customer'
  },
  {
    value: 'expires-on',
    label: 'Expires on'
  }
]

export const GROUPS = [
  {
    value: 'modal',
    label: 'Modal'
  },
  {
    value: 'carrier',
    label: 'Carrier'
  },
  {
    value: 'customer_type',
    label: 'Customer type'
  }
]

export const STATUS = ['Published', 'Draft', 'Expired']
