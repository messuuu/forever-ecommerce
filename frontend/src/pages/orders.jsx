import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { ShopContext } from '../context/shopcontext'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'

const Orders = () => {
    const { backendUrl, token, currency } = useContext(ShopContext)

    const [orders, setOrders] = useState([])

    const loadOrders = async () => {
        try {
            if (!token) return

            const response = await axios.post(
                backendUrl + '/api/order/userorders',
                {},
                { headers: { token } }
            )

            if (response.data.success) {
                setOrders(response.data.orders || [])
            } else {
                toast.error(response.data.message || 'Unable to load orders')
            }
        } catch (error) {
            console.error('Error loading orders:', error)
            toast.error(
                error.response?.data?.message || 'Failed to load orders'
            )
        }
    }

    useEffect(() => {
        loadOrders()
    }, [token])

    return (
        <div className="border-t pt-8">
            <div className="text-2xl mb-6">
                <h2>MY ORDERS</h2>
            </div>

            {!token ? (
                <p>Please log in to view your orders.</p>
            ) : orders.length === 0 ? (
                <p>No orders found for your account.</p>
            ) : (
                <div>
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="py-4 border-t border-b text-gray-700 flex flex-col gap-4"
                        >
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                <div className="flex gap-4">
                                    <img
                                        className="w-12 h-12 object-contain"
                                        src={assets.parcel_icon}
                                        alt="Order parcel"
                                    />

                                    <div>
                                        {order.items?.map((item, index) => (
                                            <p
                                                key={`${order._id}-${index}`}
                                                className="py-0.5 text-sm"
                                            >
                                                {item.name} x {item.quantity}
                                                <span> {item.size}</span>
                                            </p>
                                        ))}

                                        <p className="mt-3 mb-2 font-medium">
                                            {order.address?.firstName}{' '}
                                            {order.address?.lastName}
                                        </p>

                                        <p className="text-sm">
                                            Order date:{' '}
                                            {new Date(
                                                order.date
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="text-sm">
                                    <p>
                                        Payment method: {order.paymentMethod}
                                    </p>

                                    <p>
                                        Payment status:{' '}
                                        <span
                                            className={
                                                order.payment
                                                    ? 'text-green-600'
                                                    : 'text-orange-600'
                                            }
                                        >
                                            {order.payment ? 'Paid' : 'Pending'}
                                        </span>
                                    </p>

                                    <p>
                                        Order status: {order.status}
                                    </p>
                                </div>

                                <div className="font-medium">
                                    {currency || '₹'}{order.amount}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Orders
