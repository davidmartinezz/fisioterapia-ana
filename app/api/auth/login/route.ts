export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { validateAdminCredentials, createSessionToken, COOKIE_NAME, MAX_AGE } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  if (!validateAdminCredentials(email, password)) {
    return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 })
  }

  const token = createSessionToken(email)
  const response = NextResponse.json({ ok: true })
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: MAX_AGE,
    path: '/',
  })
  return response
}
