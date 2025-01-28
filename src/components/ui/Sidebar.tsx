import type React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Users, ShoppingBag, ClipboardList, BarChart2 } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "./button"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  setActiveTab: (tab: string) => void
  activeTab: string
}

export function Sidebar({ className, setActiveTab, activeTab }: SidebarProps) {
  return (
    <div className={cn("pb-12 w-64", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Admin Dashboard</h2>
          <div className="space-y-1">
            <Button
              variant={activeTab === "users" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("users")}
            >
              <Users className="mr-2 h-4 w-4" />
              Users
            </Button>
            <Button
              variant={activeTab === "products" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("products")}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Products
            </Button>
            <Button
              variant={activeTab === "orders" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("orders")}
            >
              <ClipboardList className="mr-2 h-4 w-4" />
              Orders
            </Button>
            <Button
              variant={activeTab === "analytics" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("analytics")}
            >
              <BarChart2 className="mr-2 h-4 w-4" />
              Analytics
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

