
import express from 'express'

import {
    placeOrder,
    placeOrderStripe,
    verifyStripe,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updateStatus
} from '../controllers/orderController.js'

import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// Admin routes
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

// User order and payment routes
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/verifyStripe', authUser, verifyStripe)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)
orderRouter.post('/userorders', authUser, userOrders)

export default orderRouter
