import { createHmac, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

const COOKIE_NAME = 'admin_session'
const MAX_AGE = 60 * 60 * 24 * 7 // 7 días

function sign(payload: string): string {
  const secret = process.env.ADMIN_SESSION_SECRET!
  return createHmac('sha256', secret).update(payload).digest('hex')
}

export function createSessionToken(email: string): string {
  const payload = `${email}:${Date.now()}`
  const sig = sign(payload)
  return Buffer.from(`${payload}:${sig}`).toString('base64url')
}

export function verifySessionToken(token: string): string | null {
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf-8')
    const lastColon = decoded.lastIndexOf(':')
    const payload = decoded.slice(0, lastColon)
    const sig = decoded.slice(lastColon + 1)
    const expected = sign(payload)
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null
    const [email] = payload.split(':')
    return email
  } catch {
    return null
  }
}

export function getSessionFromCookies(): string | null {
  const cookieStore = cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null
  return verifySessionToken(token)
}

export function getSessionFromRequest(req: NextRequest): string | null {
  const token = req.cookies.get(COOKIE_NAME)?.value
  if (!token) return null
  return verifySessionToken(token)
}

export function validateAdminCredentials(email: string, password: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminEmail || !adminPassword) return false
  return email === adminEmail && password === adminPassword
}

export { COOKIE_NAME, MAX_AGE }
