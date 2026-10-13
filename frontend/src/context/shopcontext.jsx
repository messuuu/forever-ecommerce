
import { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const ShopContext = createContext()

const ShopContextProvider = (props) => {
    const currency = '₹'
    const delivery_fee = 10
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [products, setProducts] = useState([])

    // Restore the token immediately when the context initializes
    const [token, setToken] = useState(
        () => localStorage.getItem('token') || ''
    )

    const navigate = useNavigate()

    // Add product to cart
    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Select Product Size')
            return
        }

        const cartData = structuredClone(cartItems)

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        setCartItems(cartData)

        // Save the change to the backend for logged-in users
        if (token) {
            try {
                const response = await axios.post(
                    backendUrl + '/api/cart/add',
                    { itemId, size },
                    { headers: { token } }
                )

                if (!response.data.success) {
                    toast.error(
                        response.data.message || 'Unable to update cart'
                    )
                }
            } catch (error) {
                console.error('Add to cart error:', error)
                toast.error(
                    error.response?.data?.message ||
                    'Unable to update cart'
                )
            }
        }
    }

    // Get total cart quantity
    const getCartCount = () => {
        let totalCount = 0

        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                if (cartItems[itemId][size] > 0) {
                    totalCount += cartItems[itemId][size]
                }
            }
        }

        return totalCount
    }

    // Update cart quantity or remove an item
    const updateQuantity = async (itemId, size, quantity) => {
        const cartData = structuredClone(cartItems)

        if (!cartData[itemId]) {
            return
        }

        if (quantity <= 0) {
            delete cartData[itemId][size]

            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId]
            }
        } else {
            cartData[itemId][size] = quantity
        }

        setCartItems(cartData)

        if (token) {
            try {
                const response = await axios.post(
                    backendUrl + '/api/cart/update',
                    { itemId, size, quantity },
                    { headers: { token } }
                )

                if (!response.data.success) {
                    toast.error(
                        response.data.message || 'Unable to update cart'
                    )
                }
            } catch (error) {
                console.error('Update cart error:', error)
                toast.error(
                    error.response?.data?.message ||
                    'Unable to update cart'
                )
            }
        }
    }

    // Calculate cart subtotal
    const getCartAmount = () => {
        let totalAmount = 0

        for (const itemId in cartItems) {
            const itemInfo = products.find(
                (product) => product._id === itemId
            )

            if (itemInfo) {
                for (const size in cartItems[itemId]) {
                    const quantity = cartItems[itemId][size]

                    if (quantity > 0) {
                        totalAmount += itemInfo.price * quantity
                    }
                }
            }
        }

        return totalAmount
    }

    // Fetch products from backend
    const getProductsData = async () => {
        try {
            const response = await axios.get(
                backendUrl + '/api/product/list'
            )

            if (response.data.success) {
                setProducts(response.data.products || [])
            } else {
                toast.error(
                    response.data.message || 'Unable to fetch products'
                )
            }
        } catch (error) {
            console.error('Fetch products error:', error)
            toast.error(
                error.response?.data?.message ||
                'Unable to fetch products'
            )
        }
    }

    // Fetch the logged-in user's cart from MongoDB
    const getUserCart = async (authToken) => {
        try {
            const response = await axios.post(
                backendUrl + '/api/cart/get',
                {},
                { headers: { token: authToken } }
            )

            if (response.data.success) {
                setCartItems(response.data.cartData || {})
            } else {
                toast.error(
                    response.data.message || 'Unable to fetch cart'
                )
            }
        } catch (error) {
            console.error('Fetch cart error:', error)
            toast.error(
                error.response?.data?.message ||
                'Unable to fetch saved cart'
            )
        }
    }

    // Fetch products when the app starts
    useEffect(() => {
        getProductsData()
    }, [])

    // Fetch the saved cart whenever the token is set or restored
    useEffect(() => {
        if (token) {
            getUserCart(token)
        }
    }, [token])

    // Keep localStorage synchronized with the token
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token)
        } else {
            localStorage.removeItem('token')
        }
    }, [token])

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        setCartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        token,
        setToken,
        getUserCart
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider

