"use client"

import type React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, Calendar, ClipboardList, FileText, Home, Settings, Users, LogOut } from "lucide-react"
import { useAuth } from "@/app/context/auth-context"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  action?: () => void
}

interface MainNavProps {
  userRole: "admin" | "employee" | "client"
}

export function MainNav({ userRole }: MainNavProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const adminItems: NavItem[] = [
    { title: "Dashboard", href: "/dashboard", icon: <Home className="w-5 h-5" /> },
    { title: "Shifts", href: "/dashboard/shifts", icon: <Calendar className="w-5 h-5" /> },
    { title: "Employees", href: "/dashboard/employees", icon: <Users className="w-5 h-5" /> },
    { title: "Clients", href: "/dashboard/clients", icon: <Users className="w-5 h-5" /> },
    { title: "Documents", href: "/dashboard/documents", icon: <FileText className="w-5 h-5" /> },
    { title: "Reports", href: "/dashboard/reports", icon: <BarChart3 className="w-5 h-5" /> },
    { title: "Invoicing", href: "/dashboard/invoicing", icon: <ClipboardList className="w-5 h-5" /> },
    { title: "Settings", href: "/dashboard/settings", icon: <Settings className="w-5 h-5" /> },
  ]

  const employeeItems: NavItem[] = [
    { title: "Dashboard", href: "/dashboard", icon: <Home className="w-5 h-5" /> },
    { title: "My Shifts", href: "/dashboard/shifts", icon: <Calendar className="w-5 h-5" /> },
    { title: "My Documents", href: "/dashboard/documents", icon: <FileText className="w-5 h-5" /> },
    { title: "Profile", href: "/dashboard/profile", icon: <Users className="w-5 h-5" /> },
    { title: "Settings", href: "/dashboard/settings", icon: <Settings className="w-5 h-5" /> },
  ]

  const clientItems: NavItem[] = [
    { title: "Dashboard", href: "/dashboard", icon: <Home className="w-5 h-5" /> },
    { title: "Shifts", href: "/dashboard/shifts", icon: <Calendar className="w-5 h-5" /> },
    { title: "Invoices", href: "/dashboard/invoices", icon: <ClipboardList className="w-5 h-5" /> },
    { title: "Reports", href: "/dashboard/reports", icon: <BarChart3 className="w-5 h-5" /> },
    { title: "Settings", href: "/dashboard/settings", icon: <Settings className="w-5 h-5" /> },
  ]

  const items = userRole === "admin" ? adminItems : userRole === "employee" ? employeeItems : clientItems

  return (
    <nav className="flex flex-col gap-2 p-4 h-full">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary hover:bg-muted",
            pathname === item.href ? "bg-muted text-primary font-medium" : "text-muted-foreground",
          )}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
      <div className="flex-1"></div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all hover:text-primary hover:bg-muted mt-auto"
      >
        <LogOut className="w-5 h-5" />
        Logout
      </button>
    </nav>
  )
}
