/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { useGetStoreQuery } from "../../../redux/features/vendor/vendorApi"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Calendar, DollarSign, Edit, MapPin, Package, Phone, ShoppingCart, Store } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { OrdersTable } from "../../../components/section/OrdersTable"
import { ProductsTable } from "../../../components/section/ProductsTable"
import { Badge } from "../../../components/ui/badge"
import { StoreEditDialog } from "../../../components/section/StoreEditDialog"

interface StoreData {
  _id: string
  shopName: string
  shopAddress: string
  phone: string
  profileImage: string
  status: "active" | "pending" | "blocked"
  totalIncome: number
  storeProducts: any[]
  orders: any[]
  createdAt: string
  updatedAt: string
}



const MyShop = () => {
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  // Fetch store data using RTK Query
  const {
    data: storeResponse,
    isLoading: storeLoading,
    error: storeError,
    refetch: refetchStore,
  } = useGetStoreQuery(undefined)


  const store: StoreData | null = storeResponse?.data || null
  console.log(store)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "blocked":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Loading state
  if (storeLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  // Error state
  if (storeError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Error Loading Store</CardTitle>
            <CardDescription>There was an error loading your store data.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => refetchStore()} className="w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // No store found
  if (!store) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>No Store Found</CardTitle>
            <CardDescription>You don't have a store yet. Create one to get started.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Create Store</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Store Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={store?.profileImage || "/placeholder.svg"} alt={store?.shopName} />
                <AvatarFallback>
                  <Store className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{store.shopName}</CardTitle>
                <CardDescription className="flex items-center space-x-4 mt-2">
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {store.shopAddress}
                  </span>
                  <span className="flex items-center">
                    <Phone className="h-4 w-4 mr-1" />
                    {store.phone}
                  </span>
                </CardDescription>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge className={getStatusColor(store.status)}>
                    {store.status.charAt(0).toUpperCase() + store.status.slice(1)}
                  </Badge>
                  <span className="text-sm text-muted-foreground flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Created {new Date(store.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <Button onClick={() => setEditDialogOpen(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Store
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Statistics Cards */}
      {storeLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : store? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{store.storeProducts?.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{store.orders?.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${store.totalIncome.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Statistics Unavailable</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Unable to load statistics</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tabs for Products and Orders */}
      <Tabs defaultValue="products" className="space-y-4">
        <TabsList>
          <TabsTrigger value="products">Products ({store.storeProducts?.length || 0})</TabsTrigger>
          <TabsTrigger value="orders">Orders ({store.orders?.length || 0})</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Store Products</CardTitle>
              <CardDescription>Manage your store's product inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <ProductsTable products={store.storeProducts || []} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Store Orders</CardTitle>
              <CardDescription>View and manage your store orders</CardDescription>
            </CardHeader>
            <CardContent>
              <OrdersTable orders={store.orders || []} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Store Dialog */}
      <StoreEditDialog
        store={store}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onStoreUpdated={() => refetchStore()}
      />
    </div>
  )
}

export default MyShop
