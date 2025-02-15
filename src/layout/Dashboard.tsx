import type React from "react"
import { Sidebar } from "../components/ui/Sidebar"
import { Outlet } from "react-router-dom"

export const Dashboard: React.FC = () => {

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  )
}

