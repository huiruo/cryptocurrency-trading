import { useState } from 'react'

// const key = 'sign-status'

type SignStatus =
  | 'login'
  | 'register'
  | 'forgot-password'
  | 'forgot-password-result'
  | 'verify-email'

export function useSignStatus() {
  const [status, setStatus] = useState<SignStatus>('login')

  return { status, setStatus }
}
