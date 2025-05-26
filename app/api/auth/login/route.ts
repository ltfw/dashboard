import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

interface LoginRequestBody {
  username: string
  password: string
}


export async function POST(request: Request) {
  const { username, password }: LoginRequestBody = await request.json()

  const res = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      password,
      expiresInMins: 30,
    }),
  })

  if (!res.ok) {
    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    )
  }

  const data = await res.json()

  const cookieStore = await cookies()
  cookieStore.set('accessToken', data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 30, // 30 minutes
    path: '/',
  })

  return NextResponse.json({ message: 'Login successful' }, { status: 200 })
}