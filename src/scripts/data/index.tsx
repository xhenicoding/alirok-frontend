import crypto from 'crypto'

export function createHash(data: string) {
  return crypto.createHash('sha256').update(data).digest('hex')
}

export function hashedUserPassword(email: string, password: string) {
  return createHash(`ali:${email}:${password}`)
}
