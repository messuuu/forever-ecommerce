
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

// Gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing orders using COD Method
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        if (!items || items.length === 0 || !address) {
            return res.json({
                success: false,
                message: "Invalid order details",
            });
        }

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, {
            cartData: {},
        });

        return res.json({
            success: true,
            message: "Order Placed",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {
    let newOrder;

    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

        if (!items || items.length === 0 || !address || !origin) {
            return res.status(400).json({
                success: false,
                message: "Invalid order details",
            });
        }

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now(),
        };

        newOrder = new orderModel(orderData);
        await newOrder.save();

        const currency = "inr";
        const deliveryCharge = 10;

        const line_items = items.map((item) => ({
            price_data: {
                currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: Math.round(Number(item.price) * 100),
            },
            quantity: Number(item.quantity),
        }));

        line_items.push({
            price_data: {
                currency,
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: deliveryCharge * 100,
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            success_url:
                `${origin}/verify?success=true&orderId=${newOrder._id}&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url:
                `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: "payment",
            client_reference_id: newOrder._id.toString(),
            metadata: {
                orderId: newOrder._id.toString(),
                userId: userId.toString(),
            },
        });

        return res.json({
            success: true,
            session_url: session.url,
        });
    } catch (error) {
        console.log(error);

        // Remove the pending order if checkout creation failed
        if (newOrder?._id) {
            await orderModel.findByIdAndDelete(newOrder._id).catch(
                (deleteError) => console.log(deleteError)
            );
        }

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Verify Stripe payment
const verifyStripe = async (req, res) => {
    try {
        const { orderId, session_id } = req.body;
        const userId = req.body.userId;

        if (!orderId || !session_id || !userId) {
            return res.status(400).json({
                success: false,
                message: "Missing order ID or session ID",
            });
        }

        const order = await orderModel.findOne({
            _id: orderId,
            userId,
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        // Retrieve the real Checkout Session from Stripe
        const session = await stripe.checkout.sessions.retrieve(
            session_id
        );

        // Ensure this session belongs to this order and user
        const correctOrder =
            session.metadata?.orderId === orderId &&
            session.metadata?.userId === userId.toString() &&
            session.client_reference_id === orderId;

        if (!correctOrder) {
            return res.status(400).json({
                success: false,
                message: "Stripe session does not match this order",
            });
        }

        // Only mark the order paid when Stripe confirms payment
        if (session.payment_status === "paid") {
            await orderModel.findByIdAndUpdate(orderId, {
                payment: true,
            });

            await userModel.findByIdAndUpdate(userId, {
                cartData: {},
            });

            return res.json({
                success: true,
                message: "Payment verified successfully",
            });
        }

        return res.json({
            success: false,
            message: "Payment is not confirmed yet",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Placing orders using Razorpay Method
const placeOrderRazorpay = async (req, res) => {
    try {
        return res.json({
            success: false,
            message: "Razorpay payment is not implemented yet",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// All orders for Admin Panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});

        return res.json({
            success: true,
            orders,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// User orders for Frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId });

        return res.json({
            success: true,
            orders,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update order status from Admin Panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        const order = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        return res.json({
            success: true,
            message: "Status Updated",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export {
    placeOrder,
    placeOrderStripe,
    verifyStripe,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updateStatus,
};



