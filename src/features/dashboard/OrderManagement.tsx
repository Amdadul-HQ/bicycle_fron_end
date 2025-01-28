import type React from "react"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import { Button } from "../../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"

interface Order {
  id: number
  customerName: string
  total: number
  status: "pending" | "shipped" | "delivered"
}

export const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
    { id: 1, customerName: "Alice Johnson", total: 59.99, status: "pending" },
    { id: 2, customerName: "Bob Williams", total: 89.99, status: "shipped" },
    { id: 3, customerName: "Charlie Brown", total: 119.99, status: "delivered" },
  ])

  const updateOrderStatus = (id: number, status: Order["status"]) => {
    setOrders(orders.map((order) => (order.id === id ? { ...order, status } : order)))
  }

  return (
    <div className="space-y-4">
      {/*Removed h2 tag here*/}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Update Status</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update Order Status</DialogTitle>
                    </DialogHeader>
                    <Select onValueChange={(value: Order["status"]) => updateOrderStatus(order.id, value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select new status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                      </SelectContent>
                    </Select>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

