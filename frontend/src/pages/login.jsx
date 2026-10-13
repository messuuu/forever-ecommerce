
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ShopContext } from '../context/shopcontext'

const Login = () => {

    const [currentState, setCurrentState] = useState('Sign Up')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {
        token,
        setToken,
        navigate,
        backendUrl
    } = useContext(ShopContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            if (currentState === 'Sign Up') {

                const response = await axios.post(
                    backendUrl + '/api/user/register',
                    { name, email, password }
                )

                if (response.data.success) {
                    setToken(response.data.token)
                    localStorage.setItem('token', response.data.token)
                    toast.success('Account created successfully')
                } else {
                    toast.error(response.data.message)
                }

            } else {

                const response = await axios.post(
                    backendUrl + '/api/user/login',
                    { email, password }
                )

                if (response.data.success) {
                    setToken(response.data.token)
                    localStorage.setItem('token', response.data.token)
                    toast.success('Login successful')
                } else {
                    toast.error(response.data.message)
                }
            }

        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || error.message)
        }
    }

    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [token, navigate])

    return (
        <form
            onSubmit={onSubmitHandler}
            className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
        >

            <div className="inline-flex items-center gap-2 mb-2 mt-10">
                <p className="prata-regular text-3xl">
                    {currentState}
                </p>
                <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
            </div>

            {currentState === 'Sign Up' && (
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="w-full px-3 py-2 border border-gray-800"
                    required
                />
            )}

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full px-3 py-2 border border-gray-800"
                required
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full px-3 py-2 border border-gray-800"
                minLength={8}
                required
            />

            <div className="w-full flex justify-between text-sm mt-[-8px]">
                <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => toast.info('Password reset is not configured yet')}
                >
                    Forgot your password?
                </button>

                {currentState === 'Login' ? (
                    <button
                        type="button"
                        className="cursor-pointer"
                        onClick={() => setCurrentState('Sign Up')}
                    >
                        Create account
                    </button>
                ) : (
                    <button
                        type="button"
                        className="cursor-pointer"
                        onClick={() => setCurrentState('Login')}
                    >
                        Login Here
                    </button>
                )}
            </div>

            <button
                type="submit"
                className="bg-black text-white font-light px-8 py-2 mt-4"
            >
                {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
            </button>

        </form>
    )
}

export default Login


