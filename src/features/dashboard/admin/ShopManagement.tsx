/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { Check, X, MoreHorizontal, Search, Eye, Phone, MapPin } from "lucide-react"
import { Badge } from "../../../components/ui/badge"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu"
import { useGetAllStoresQuery } from "../../../redux/features/admin/storeManagement"
import { ApproveModal, RejectModal } from "../../../components/ui/ApprovedReject"
import { toast } from "sonner"

// Mock data - replace with your actual API call
const mockStores = [
  {
    _id: "1",
    shopName: "Tech Paradise",
    shopAddress: "123 Main St, New York, NY 10001",
    phone: "+1 (555) 123-4567",
    profileImage: "/placeholder.svg?height=40&width=40",
    status: "pending",
    user: {
      _id: "user1",
      name: "John Doe",
      email: "john@example.com",
    },
    storeProducts: ["prod1", "prod2"],
    totalIncome: 15420,
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    _id: "2",
    shopName: "Fashion Hub",
    shopAddress: "456 Oak Ave, Los Angeles, CA 90210",
    phone: "+1 (555) 987-6543",
    profileImage: "/placeholder.svg?height=40&width=40",
    status: "active",
    user: {
      _id: "user2",
      name: "Jane Smith",
      email: "jane@example.com",
    },
    storeProducts: ["prod3", "prod4", "prod5"],
    totalIncome: 28750,
    createdAt: "2024-01-10T14:20:00Z",
  },
  {
    _id: "3",
    shopName: "Home Essentials",
    shopAddress: "789 Pine Rd, Chicago, IL 60601",
    phone: "+1 (555) 456-7890",
    profileImage: "/placeholder.svg?height=40&width=40",
    status: "blocked",
    user: {
      _id: "user3",
      name: "Mike Johnson",
      email: "mike@example.com",
    },
    storeProducts: ["prod6"],
    totalIncome: 5200,
    createdAt: "2024-01-08T09:15:00Z",
  },
  {
    _id: "4",
    shopName: "Sports Central",
    shopAddress: "321 Elm St, Miami, FL 33101",
    phone: "+1 (555) 321-0987",
    profileImage: "/placeholder.svg?height=40&width=40",
    status: "pending",
    user: {
      _id: "user4",
      name: "Sarah Wilson",
      email: "sarah@example.com",
    },
    storeProducts: ["prod7", "prod8"],
    totalIncome: 0,
    createdAt: "2024-01-20T16:45:00Z",
  },
]

export default function StoreManagement() {
  const {isLoading,data} = useGetAllStoresQuery(undefined)
  const [stores, setStores] = useState(mockStores)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [approveModalOpen, setApproveModalOpen] = useState(false)
  const [rejectModalOpen, setRejectModalOpen] = useState(false)
  const [selectedStore, setSelectedStore] = useState(null)

  if(isLoading){
    return
  }


  const handleApproveClick = (store:any) => {
    setSelectedStore(store)
    setApproveModalOpen(true)
  }

  const handleRejectClick = (store:any) => {
    setSelectedStore(store)
    setRejectModalOpen(true)
  }

  const handleApprove = async (storeId: string, message?: string) => {
    // setIsLoading(true)
    try {
      // Replace with your actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

      setStores(stores.map((store) => (store._id === storeId ? { ...store, status: "active" } : store)))

      toast.success("Store Approved")

      setApproveModalOpen(false)
      setSelectedStore(null)

      console.log(`Approving store: ${storeId}`, { message })
    } catch (error:any) {
      toast.error("Failed to approve store. Please try again.")
    } finally {
    //   setIsLoading(false)
    }
  }

  const handleReject = async (storeId: string, reason: string) => {
    // setIsLoading(true)
    try {
      // Replace with your actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

      setStores(stores.map((store) => (store._id === storeId ? { ...store, status: "blocked" } : store)))

      toast.success("Store Rejected")

      setRejectModalOpen(false)
      setSelectedStore(null)

      console.log(`Rejecting store: ${storeId}`, { reason })
    } catch (error:any) {
      toast("Failed to reject store. Please try again.")
    } finally {
    //   setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      case "blocked":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Blocked</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredStores = data?.data?.filter((store:any) => {
    const matchesSearch =
      store.shopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || store.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Store Management</h1>
          <p className="text-muted-foreground">Manage and review store applications</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search stores, owners, or emails..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              onClick={() => setStatusFilter("all")}
              size="sm"
            >
              All ({stores.length})
            </Button>
            <Button
              variant={statusFilter === "pending" ? "default" : "outline"}
              onClick={() => setStatusFilter("pending")}
              size="sm"
            >
              Pending ({stores.filter((s) => s.status === "pending").length})
            </Button>
            <Button
              variant={statusFilter === "active" ? "default" : "outline"}
              onClick={() => setStatusFilter("active")}
              size="sm"
            >
              Active ({stores.filter((s) => s.status === "active").length})
            </Button>
            <Button
              variant={statusFilter === "blocked" ? "default" : "outline"}
              onClick={() => setStatusFilter("blocked")}
              size="sm"
            >
              Blocked ({stores.filter((s) => s.status === "blocked").length})
            </Button>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stores ({filteredStores.length})</CardTitle>
          <CardDescription>Review and manage store applications and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Store</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Income</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStores.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No stores found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStores.map((store:any) => (
                    <TableRow key={store._id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={store.profileImage || "/placeholder.svg"} alt={store.shopName} />
                            <AvatarFallback>{store.shopName.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{store.shopName}</div>
                            <div className="text-sm text-muted-foreground flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {store.shopAddress.length > 30
                                ? `${store.shopAddress.substring(0, 30)}...`
                                : store.shopAddress}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{store.user.name}</div>
                          <div className="text-sm text-muted-foreground">{store.user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Phone className="h-3 w-3 mr-1" />
                          {store.phone}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(store.status)}</TableCell>
                      <TableCell>
                        <div className="text-sm">{store.storeProducts.length} products</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{formatCurrency(store.totalIncome)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground">{formatDate(store.createdAt)}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          {store.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleApproveClick(store)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleRejectClick(store)}>
                                <X className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          {store.status === "active" && (
                            <Button size="sm" variant="destructive" onClick={() => handleRejectClick(store)}>
                              <X className="h-4 w-4 mr-1" />
                              Block
                            </Button>
                          )}
                          {store.status === "blocked" && (
                            <Button
                              size="sm"
                              onClick={() => handleApproveClick(store)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Unblock
                            </Button>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>View Products</DropdownMenuItem>
                              <DropdownMenuItem>View Orders</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <ApproveModal
        isOpen={approveModalOpen}
        onClose={() => {
          setApproveModalOpen(false)
          setSelectedStore(null)
        }}
        onConfirm={handleApprove}
        store={selectedStore}
        isLoading={isLoading}
      />

      <RejectModal
        isOpen={rejectModalOpen}
        onClose={() => {
          setRejectModalOpen(false)
          setSelectedStore(null)
        }}
        onConfirm={handleReject}
        store={selectedStore}
        isLoading={isLoading}
      />
    </div>
  )
}
