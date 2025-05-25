import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Users, CalendarCheck, Bell } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-gray-100">
      {/* Hero Section */}
      <header className="w-full px-4 pt-12 pb-8 flex flex-col items-center justify-center bg-gradient-to-b from-blue-100/60 to-transparent">
        <div className="flex items-center gap-3 mb-4">
          <img src="https://img.icons8.com/ios-filled/100/4F46E5/security-checked.png" alt="Security MS Logo" className="h-12 w-12" />
          <span className="text-3xl font-bold tracking-tight text-blue-700">Security MS</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-4 max-w-2xl leading-tight">
          Modern Security Company Management
        </h1>
        <p className="text-lg md:text-xl text-gray-600 text-center mb-8 max-w-2xl">
          Streamline your security operations, manage shifts, employees, documents, clients, and more—all in one powerful platform.
        </p>
        <Link href="/login">
          <Button size="lg" className="px-8 text-lg shadow-lg">Login to Dashboard</Button>
        </Link>
        {/* Hero Illustration: Unsplash security/technology image */}
        <img
          src="https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=800&q=80"
          alt="Security dashboard illustration"
          className="mt-12 w-full max-w-xl drop-shadow-xl rounded-lg border border-gray-200 bg-white"
        />
      </header>

      {/* Features Section */}
      <section className="flex-1 w-full max-w-5xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center border border-gray-100">
          <ShieldCheck className="h-10 w-10 text-blue-600 mb-3" />
          <h3 className="font-semibold text-lg mb-2">Role-Based Access</h3>
          <p className="text-gray-500 text-sm">Dashboards and permissions for admins, employees, and clients.</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center border border-gray-100">
          <CalendarCheck className="h-10 w-10 text-blue-600 mb-3" />
          <h3 className="font-semibold text-lg mb-2">Shift & Payroll Management</h3>
          <p className="text-gray-500 text-sm">Easily schedule shifts, track hours, and manage payroll in one place.</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center border border-gray-100">
          <Users className="h-10 w-10 text-blue-600 mb-3" />
          <h3 className="font-semibold text-lg mb-2">Employee & Client Records</h3>
          <p className="text-gray-500 text-sm">Centralized management of employees, clients, and documents.</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center border border-gray-100">
          <Bell className="h-10 w-10 text-blue-600 mb-3" />
          <h3 className="font-semibold text-lg mb-2">Real-Time Notifications</h3>
          <p className="text-gray-500 text-sm">Stay updated with instant alerts and analytics for your team.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-sm text-gray-400 border-t border-gray-100 mt-auto">
        &copy; {new Date().getFullYear()} Security Management System. All rights reserved.
      </footer>
    </div>
  )
}
