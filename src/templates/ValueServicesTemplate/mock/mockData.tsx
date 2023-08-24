export const getOptions = (options: string | undefined) => {
  switch (options) {
    case 'parcel_type':
      return [
        {
          label: 'Documents',
          value: 'documents'
        },
        {
          label: 'Package',
          value: 'package'
        }
      ]
    case 'address_type':
      return [
        {
          label: 'Residential',
          value: 'residential'
        },
        {
          label: 'Commercial',
          value: 'commercial'
        }
      ]
    case 'user_type':
      return [
        {
          label: 'Individual',
          value: 'individual'
        },
        {
          label: 'Corporation',
          value: 'corporation'
        }
      ]
    case 'rate_type':
      return [
        {
          label: 'Postal',
          value: 'postal'
        },
        {
          label: 'Economy',
          value: 'economy'
        },
        {
          label: 'Express',
          value: 'express'
        }
      ]
  }
}

export const getCondition = (options: string | undefined) => {
  switch (options) {
    case 'parcel':
      return [
        {
          label: 'Is more than',
          value: '>'
        },
        {
          label: 'Is less than',
          value: '<'
        }
      ]
    case 'shipment':
      return [
        {
          label: 'Is more than',
          value: '>'
        },
        {
          label: 'Is less than',
          value: '<'
        }
      ]
    case 'gross_weight':
      return [
        {
          label: 'Is more than',
          value: '>'
        },
        {
          label: 'Is less than',
          value: '<'
        }
      ]
    case 'volume_weight':
      return [
        {
          label: 'Is more than',
          value: '>'
        },
        {
          label: 'Is less than',
          value: '<'
        }
      ]
    case 'cargo_value':
      return [
        {
          label: 'Is more than',
          value: '>'
        },
        {
          label: 'Is less than',
          value: '<'
        }
      ]
    case 'cif_value':
      return [
        {
          label: 'Is more than',
          value: '>'
        },
        {
          label: 'Is less than',
          value: '<'
        }
      ]
    case 'parcel_type':
      return [
        {
          label: 'Is',
          value: '==='
        },
        {
          label: 'Is not',
          value: '!=='
        }
      ]
    case 'address_type':
      return [
        {
          label: 'Is',
          value: '==='
        },
        {
          label: 'Is not',
          value: '!=='
        }
      ]
    case 'user_type':
      return [
        {
          label: 'Is',
          value: '==='
        },
        {
          label: 'Is not',
          value: '!=='
        }
      ]
    case 'rate_type':
      return [
        {
          label: 'Is',
          value: '==='
        },
        {
          label: 'Is not',
          value: '!=='
        }
      ]
  }
}

export const PREPOSITION = [
  {
    label: 'AND',
    value: 'and'
  },
  {
    label: 'OR',
    value: 'or'
  }
]

export const WEIGHT = [
  {
    label: 'kg',
    value: 'kg'
  },
  {
    label: 'in',
    value: 'in'
  }
]

export const VENDORS_MOCK = [
  {
    id: '1',
    label: 'My company',
    image: ''
  },
  {
    id: '2',
    label: 'Alirok.com',
    image: ''
  },
  {
    id: '3',
    label: 'UPS',
    image: ''
  }
]

export const CODE_MOCK = [
  {
    value: 'pickUp',
    label: 'Pick up',
    avatar: 'https://static.alirok.io/collections/icons/truck1.svg'
  },
  {
    value: 'insurance',
    label: 'Insurance',
    avatar: 'https://static.alirok.io/collections/icons/security.svg'
  },
  {
    value: 'screening',
    label: 'Screening',
    avatar: 'https://static.alirok.io/collections/icons/parcel1.svg'
  },
  {
    value: 'fuel',
    label: 'Fuel',
    avatar: 'https://static.alirok.io/collections/icons/gas-station.svg'
  },
  {
    value: 'duties',
    label: 'duties',
    avatar: 'https://static.alirok.io/collections/icons/duties.svg'
  },
  {
    value: 'fees',
    label: 'Fees',
    avatar: 'https://static.alirok.io/collections/icons/dollar.svg'
  }
]

export const APPLY_MOCK = [
  {
    value: 'parcel',
    label: 'Parcel',
    icon: 'parcel'
  },
  {
    value: 'air',
    label: 'Air',
    icon: 'plane'
  },
  {
    value: 'sea',
    label: 'Sea',
    icon: 'ship'
  },
  {
    value: 'land',
    label: 'Land',
    icon: 'delivery-truck'
  },
  {
    value: 'warehouse',
    label: 'Warehouse',
    icon: 'warehouse'
  }
]

export const CARRIER_VENDOR_MOCK = [
  {
    value: 'latam',
    label: 'Latam Airlines'
  }
]

export const COST_RATE_MOCK = [
  {
    value: 'percent',
    label: '%'
  },
  {
    value: 'currency',
    label: '$'
  }
]

export const MODAL_OPTIONS = [
  {
    value: 'Parcel',
    label: 'Parcel'
  },
  {
    value: 'land',
    label: 'Land'
  },
  {
    value: 'Air',
    label: 'Air'
  },
  {
    value: 'Sea',
    label: 'Sea'
  },
  {
    value: 'Warehouse',
    label: 'Warehouse'
  }
]

export const RULES = [
  {
    value: 'optional',
    label: 'Optional',
    avatar: 'https://static.alirok.io/collections/illustrations/flag-green.svg'
  },
  {
    value: 'mandatory',
    label: 'Mandatory',
    avatar: 'https://static.alirok.io/collections/illustrations/flag-red.svg'
  },
  {
    value: 'not_visible',
    label: 'Not visible',
    avatar: 'https://static.alirok.io/collections/icons/hide.svg'
  }
]

export const MINIMUM_PER_MOCK = [
  {
    value: 'flat_fee',
    label: 'Flat fee'
  },
  {
    value: 'shipment',
    label: 'shipment'
  },
  {
    value: 'parcel',
    label: 'parcel'
  }
]

export const APPLICABLE_MOCK = [
  {
    value: 'shipment',
    label: 'per Shipment'
  },
  {
    value: 'parcel',
    label: 'per Parcel'
  },
  {
    value: 'gross_weight',
    label: 'Gross weight'
  },
  {
    value: 'volume_weight',
    label: 'Volume weight'
  },
  {
    value: 'cargo_value',
    label: 'Cargo value'
  },
  {
    value: 'cif_value',
    label: 'CIF value'
  },
  {
    value: 'parcel_type',
    label: 'Parcel type'
  },
  {
    value: 'address_type',
    label: 'Address type'
  },
  {
    value: 'user_type',
    label: 'User type'
  },
  {
    value: 'rate_type',
    label: 'Rate type'
  }
]

export const WEIGHT_TYPE_MOCK = [
  {
    value: 'kgs',
    label: 'KG'
  },
  {
    value: 'lbs',
    label: 'LB'
  }
]

export const CUSTOMER_MOCK = [
  {
    value: 'abcCorp',
    label: 'ABC Corp'
  },
  {
    value: 'xyzLogistics',
    label: 'XYZ Logistics'
  }
]

export const DIMENSIONAL_FACTOR_MOCK = [
  {
    value: '194',
    label: '194'
  },
  {
    value: '166',
    label: '166'
  },
  {
    value: '250',
    label: '250'
  }
]
