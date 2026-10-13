
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {

    const [list, setList] = useState([])

    const fetchList = async () => {
        try {
            const response = await axios.get(
                backendUrl + '/api/product/list'
            )

            if (response.data.success) {
                setList(response.data.products)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(
                error.response?.data?.message ||
                'Failed to fetch products'
            )
        }
    }

    const removeProduct = async (id) => {
        try {
            const response = await axios.post(
                backendUrl + '/api/product/remove',
                { id },
                {
                    headers: { token }
                }
            )

            if (response.data.success) {
                toast.success(response.data.message)
                await fetchList()
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(
                error.response?.data?.message ||
                'Failed to remove product'
            )
        }
    }

    useEffect(() => {
        fetchList()
    }, [])

    return (
        <>
            <p className="mb-3">All Products List</p>

            <div className="flex flex-col gap-2">
                {/* Table heading */}
                <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-2 border bg-gray-100 text-sm">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b className="text-center">Action</b>
                </div>

                {/* Product list */}
                {list.map((item) => (
                    <div
                        key={item._id}
                        className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-2 px-2 border text-sm"
                    >
                        <img
                            className="w-12 h-12 object-cover"
                            src={item.image?.[0]}
                            alt={item.name}
                        />

                        <p>{item.name}</p>

                        <p className="hidden md:block">
                            {item.category}
                        </p>

                        <p className="hidden md:block">
                            ₹{item.price}
                        </p>

                        <button
                            onClick={() => removeProduct(item._id)}
                            className="text-right md:text-center text-red-500 text-lg"
                            title="Remove product"
                        >
                            X
                        </button>
                    </div>
                ))}

                {list.length === 0 && (
                    <p className="py-4 text-gray-500">
                        No products found.
                    </p>
                )}
            </div>
        </>
    )
}

export default List

