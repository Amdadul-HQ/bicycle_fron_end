import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { useGetUserOrderQuery } from "../../../redux/features/payment/paymentApi"

export const ViewOrders = () => {
  const { data } = useGetUserOrderQuery(undefined)
  const orders = data?.data || []

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Product ID</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

