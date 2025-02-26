import { LoginForm } from '@/components/auth/login-form'
import { login } from './actions'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">        
        <LoginForm action={login} />      

          <Link href="/register" className="text-sm text-muted-foreground text-center">
       Don't have an account? Register
      </Link>  
      </div>

    

    </main>
  )
}