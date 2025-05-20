import { useState } from "react"
import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/login-form"

interface FormData {
  username: string
  password: string
}

interface LoginProps {
  onSubmit: (formData: FormData) => Promise<void>
  error: string
}

export default function LoginPage() {
  const [error, setError] = useState<string>('')
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        router.push('/dashboard')
      } else {
        const data: { message?: string } = await res.json()
        setError(data.message || 'Invalid credentials')
      }
    } catch {
      setError('An error occurred. Please try again.')
    }
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm onSubmit={handleSubmit} error={error}/>
      </div>
    </div>
  )
}
