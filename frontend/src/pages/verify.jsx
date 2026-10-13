
import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/shopcontext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'

const Verify = () => {
    const {
        navigate,
        token,
        setCartItems,
        backendUrl
    } = useContext(ShopContext)

    const [searchParams] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')
    const session_id = searchParams.get('session_id')

    const verifyPayment = async () => {
        try {
            if (!token) {
                navigate('/login')
                return
            }

            // If Stripe checkout was cancelled, return to cart
            if (success !== 'true' || !orderId || !session_id) {
                navigate('/cart')
                return
            }

            const response = await axios.post(
                backendUrl + '/api/order/verifyStripe',
                {
                    orderId,
                    session_id
                },
                {
                    headers: { token }
                }
            )

            if (response.data.success) {
                setCartItems({})
                navigate('/orders')
            } else {
                console.error(response.data.message)
                navigate('/cart')
            }
        } catch (error) {
            console.error(
                'Stripe payment verification failed:',
                error.response?.data || error.message
            )
            navigate('/cart')
        }
    }

    useEffect(() => {
        verifyPayment()
    }, [token])

    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto"></div>

                <p className="mt-4 text-lg font-medium">
                    Verifying your payment...
                </p>
            </div>
        </div>
    )
}

export default Verify

