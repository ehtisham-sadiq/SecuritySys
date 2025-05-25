import type React from "react"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Suspense } from "react"

// Mock user data - in a real app, this would come from authentication
const user = {
  name: "John Smith",
  email: "john@securityco.uk",
  role: "admin",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
        <div className="flex items-center gap-2 font-semibold">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">S</div>
          <span>Security MS</span>
        </div>
        <div className="w-full flex-1 md:w-auto md:flex-none">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="w-full md:w-[300px] pl-8" />
          </div>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <ModeToggle />
          <UserNav />
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 border-r bg-muted/40 flex-shrink-0">
          <MainNav userRole="admin" />
        </aside>
        <main className="flex-1 overflow-auto">
          <Suspense fallback={<div className="p-6">Loading...</div>}>{children}</Suspense>
        </main>
      </div>
    </div>
  )
}
