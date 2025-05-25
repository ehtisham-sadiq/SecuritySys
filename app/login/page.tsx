import LoginForm from "../auth/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Security Management System</h1>
          <p className="mt-2 text-gray-600">Sign in to access your dashboard</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
