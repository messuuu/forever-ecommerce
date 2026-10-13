
import userModel from '../models/userModel.js'

// Add product to cart
const addToCart = async (req, res) => {
    try {
        const { itemId, size } = req.body
        const userData = await userModel.findById(req.body.userId)

        let cartData = userData.cartData || {}

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

        await userModel.findByIdAndUpdate(req.body.userId, { cartData })

        res.json({
            success: true,
            message: 'Added To Cart'
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

// Get user cart
const getUserCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId)
        const cartData = userData?.cartData || {}

        res.json({
            success: true,
            cartData
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

// Update cart quantity
const updateCart = async (req, res) => {
    try {
        const { itemId, size, quantity } = req.body

        const userData = await userModel.findById(req.body.userId)
        const cartData = userData?.cartData || {}

        if (!cartData[itemId] || !cartData[itemId][size]) {
            return res.json({
                success: false,
                message: 'Item not found in cart'
            })
        }

        if (quantity <= 0) {
            delete cartData[itemId][size]

            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId]
            }
        } else {
            cartData[itemId][size] = quantity
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData })

        res.json({
            success: true,
            message: 'Cart Updated'
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

export { addToCart, getUserCart, updateCart }
