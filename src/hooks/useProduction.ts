export const useProduction = () => {
  return process.env.NEXT_PUBLIC_IS_PRODUCTION === 'production'
}
