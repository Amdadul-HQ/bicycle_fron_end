"use client"

import type React from "react"
import { useMemo } from "react"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { format } from "date-fns"
import { useGetAllOrdersQuery, useGetRevenueQuery } from "../../../redux/features/admin/productManagement"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { useGetAllUserQuery } from "../../../redux/features/admin/userManagement"

export const Analytics: React.FC = () => {
  const { data: orders, isLoading, error } = useGetAllOrdersQuery(undefined)
  const {data:totalRevenue,isFetching}= useGetRevenueQuery(undefined)
  const {data:totalUser} = useGetAllUserQuery(undefined)
  const analytics = useMemo(() => {
    if (!orders) return null

    const totalOrders = orders?.data?.length
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uniqueUsers = totalUser?.data?.length
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const totalQuantity = orders?.data?.reduce((sum:number, order:any) => sum + order?.quantity, 0)
    
    // Prepare data for the line chart
    const revenueOverTime = orders?.data
    ? [...orders.data]
    .sort((a, b) => new Date(a?.createdAt).getTime() - new Date(b?.createdAt).getTime())
    .map((order) => ({
      date: format(new Date(order.createdAt), "MMM dd"),
            revenue: order?.totalPrice,
          }))
          : []
          
          return { totalOrders, uniqueUsers, totalQuantity, revenueOverTime }
        }, [orders?.data])
        
        if(isFetching)return <p>Loading</p>
        if (isLoading) return <div>Loading...</div>
        if (error) return <div>Error loading data</div>
        if (!analytics) return null

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue?.data}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.uniqueUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Product Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalQuantity}</div>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Revenue Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.revenueOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

