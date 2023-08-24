import { useRouter } from 'next/router'

import useSWR from 'swr'

export interface ILocale {
  homeTemplate: {
    parcel: string
    land: string
    air: string
    tracking: string
  }
  loginSection: {
    login: string
    register: string
  }
  searchBar: {
    searchButton: string
    whereFromInput: string
    whereToInput: string
    whatsInsideInput: string
    cargoDetailsInput: string
  }
  trackingBar: {
    trackingButton: string
    trackingPlaceholder: string
  }
  demoSection: {
    title: string
    subtitle: string
    carrierBtn: string
    notifyBtn: string
    alertTitle: string
    customerAlertDescription: string
    sellerAlertDescription: string
    whyAlirok: string
    whyAlirokTittle: string
    whyAlirokDescription: string
    domestic: string
    domesticTittle: string
    domesticDescription: string
    international: string
    internationalTittle: string
    internationalDescription: string
    tracking: string
    trackingTittle: string
    trackingDescription: string
    watchBtn: string
  }
  howTo: {
    title: string
    quoteTitle: string
    quoteSubtitle: string
    quoteDescription: string
    bookTitle: string
    bookSubtitle: string
    bookDescription: string
    shipTitle: string
    shipSubtitle: string
    shipDescription: string
  }
  favoriteCarriers: {
    title: string
  }
  alirokIsForEveryone: {
    title: string
    personalShipmentsTitle: string
    personalShipmentsDescription1: string
    personalShipmentsDescription2: string
    personalShipmentsDescription3: string
    personalShipmentsDescription4: string
    personalShipmentsButton: string
    businessesTitle: string
    businessesDescription1: string
    businessesDescription2: string
    businessesDescription3: string
    businessesDescription4: string
    businessesDescription5: string
    businessesButton: string
    carriersTitle: string
    carriersDescription1: string
    carriersDescription2: string
    carriersDescription3: string
    carriersButton: string
  }
  review: {
    title: string
    personName1: string
    personFeedback1: string
    personName2: string
    personFeedback2: string
    personName3: string
    personFeedback3: string
  }
  footer: {
    policies: string
    terms: string
  }
  whereFrom: {
    title: string
    whereFromToggle: {
      byAddress: string
      byMembers: string
      byName: string
      byCompany: string
      byAirport: string
    }
    searchInput: {
      byAddress: string
      byAddressPlaceholder: string
      byMembers: string
      byMembersPlaceholder: string
      byName: string
      byNamePlaceholder: string
      byCompany: string
      byCompanyPlaceholder: string
      byAirport: string
      byAirportPlaceholder: string
    }
    addressType: {
      warehouse: string
      residential: string
      commercial: string
    }
    form: {
      zipCode: string
      zipCodeRequiredError: string
      country: string
      countryRequiredError: string
      state: string
      stateRequiredError: string
      city: string
      cityRequiredError: string
      street: string
      streetRequiredError: string
      streetNumber: string
      streetNumberRequiredError: string
      additionalAddress: string
      complementAddress: string
    }
    confirmButton: string
  }
  whereTo: {
    title: string
    whereToToggle: {
      byAddress: string
      byMembers: string
      byName: string
      byCompany: string
    }
    searchInput: {
      byAddress: string
      byAddressPlaceholder: string
      byMembers: string
      byMembersPlaceholder: string
      byName: string
      byNamePlaceholder: string
      byCompany: string
      byCompanyPlaceholder: string
    }
    addressType: {
      warehouse: string
      residential: string
      commercial: string
    }
    form: {
      zipCode: string
      zipCodeRequiredError: string
      country: string
      countryRequiredError: string
      state: string
      stateRequiredError: string
      city: string
      cityRequiredError: string
      street: string
      streetRequiredError: string
      streetNumber: string
      streetNumberRequiredError: string
      additionalAddress: string
      complementAddress: string
    }
    confirmButton: string
  }
}

const fetcher = (input: RequestInfo, init?: RequestInit) =>
  fetch(input, init).then((res) => res.json())

export const useLocale = () => {
  const { locale } = useRouter()

  const { data, error } = useSWR<ILocale>(`/locales/${locale}.json`, fetcher)

  return { t: data as ILocale, error, loading: !data && !error, locale }
}
