import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

interface LoginRequestBody {
  username: string
  password: string
}

const VALID_USER = { username: 'admin', password: '123' }

export async function POST(request: Request) {
  const { username, password }: LoginRequestBody = await request.json()

  if (username === VALID_USER.username && password === VALID_USER.password) {
    const cookieStore = await cookies();
    cookieStore.set('session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
    })
    return NextResponse.json({ message: 'Login successful' })
  }

  return NextResponse.json(
    { message: 'Invalid credentials' },
    { status: 401 }
  )
}