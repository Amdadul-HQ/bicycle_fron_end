import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { useGetUserOrderQuery } from "../../../redux/features/payment/paymentApi"

type IOrder = {
  _id:string,
  createdAt:string,
  product:Record<string,string>,
  quantity:number,
  totalPrice:number,
}

export const ViewOrders = () => {
  const { data } = useGetUserOrderQuery(undefined)
  const orders = data?.data || []

  console.log(data)

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
              <TableHead>Product Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order:IOrder) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{order.product.name}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>${order.totalPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

