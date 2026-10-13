import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/shopcontext'
import Title from './title'

const CartTotal = () => {

    const {
        currency,
        delivery_fee,
        getCartAmount
    } = useContext(ShopContext)

    const [totalAmount, setTotalAmount] = useState(0)

    useEffect(() => {

        const fetchTotalAmount = async () => {

            const amount = await getCartAmount()

            setTotalAmount(amount)

        }

        fetchTotalAmount()

    }, [getCartAmount])


    return (

        <div className='w-full'>

            <div className='text-2xl'>

                <Title
                    text1={'CART'}
                    text2={'TOTALS'}
                />

            </div>


            <div className='flex flex-col gap-2 mt-2 text-sm'>

                {/* SUBTOTAL */}

                <div className='flex justify-between'>

                    <p>
                        Subtotal
                    </p>

                    <p>
                        {currency} {totalAmount.toFixed(2)}
                    </p>

                </div>


                <hr />


                {/* SHIPPING FEE */}

                <div className='flex justify-between'>

                    <p>
                        Shipping Fee
                    </p>

                    <p>
                        {currency} {delivery_fee}
                    </p>

                </div>


                <hr />


                {/* TOTAL */}

                <div className='flex justify-between'>

                    <b>
                        Total
                    </b>

                    <b>
                        {currency}{' '}
                        {(totalAmount === 0
                            ? 0
                            : totalAmount + delivery_fee
                        ).toFixed(2)}
                    </b>

                </div>

            </div>

        </div>

    )
}

export default CartTotal