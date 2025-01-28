import type React from "react"
import { Outlet } from "react-router-dom"
import { CustomerSidebar } from "../components/ui/CustomerSider"

export const CustomerDashboard: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <CustomerSidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  )
}

