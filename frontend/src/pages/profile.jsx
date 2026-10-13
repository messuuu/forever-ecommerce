
import React from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {
    const email = localStorage.getItem('email')

    return (
        <div className="border-t pt-10 pb-20">
            <h1 className="text-2xl font-medium mb-6">
                MY PROFILE
            </h1>

            <div className="border rounded-lg p-6 max-w-lg">
                <p className="text-gray-600 mb-2">
                    Account Information
                </p>

                <p className="text-sm">
                    <span className="font-medium">Email:</span>{' '}
                    {email || 'Email information is not available.'}
                </p>

                <Link
                    to="/orders"
                    className="inline-block mt-6 bg-black text-white px-6 py-3 text-sm"
                >
                    View My Orders
                </Link>
            </div>
        </div>
    )
}

export default Profile
