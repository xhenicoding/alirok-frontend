/* eslint-disable @typescript-eslint/no-explicit-any */
export const pageview = (url: string) => {
  const w: any = window
  w.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url
  })
}

export const event = ({ action, params }: any) => {
  const w: any = window
  w.gtag('event', action, params)
}
