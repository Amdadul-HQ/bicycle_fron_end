import type React from "react"
import { useState } from "react"

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("users")

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <UserManagement />
      case "products":
        return <ProductManagement />
      case "orders":
        return <OrderManagement />
      case "analytics":
        return <Analytics />
      default:
        return <UserManagement />
    }
  }

  return (
    <div className="flex h-screen">
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      <main className="flex-1 overflow-y-auto p-8">{renderContent()}</main>
    </div>
  )
}

