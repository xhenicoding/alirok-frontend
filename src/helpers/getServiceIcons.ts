export const getServiceIcons = (service_name: string) => {
  let icon = ''

  switch (service_name) {
    case 'Pick-up':
      icon = 'truck3'
      break
    case 'Parcel Freight':
      icon = 'parcel1'
      break
    case 'Duties & Taxes':
      icon = 'tax'
      break
    case 'Insurance':
      icon = 'security'
      break
    case 'Land Freight':
      icon = 'truck3'
      break
    case 'Value Services':
      icon = 'business-spot'
      break
    case 'Payment processing':
      icon = 'credit-card-fill'
      break
    case 'Air Freight':
      icon = 'plane'
      break
    case 'drop off':
      icon = 'parcel1'
      break
    case 'pickup':
      icon = 'parcel1'
      break
    default:
      icon = ''
  }

  return icon
}

export default getServiceIcons
