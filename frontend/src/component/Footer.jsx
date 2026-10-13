import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>

      {/* Footer Main Section */}
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">

        {/* Footer Logo & Description */}
        <div>
          <img
            src={assets.logo}
            className="mb-5 w-32"
            alt=""
          />

          <p className="w-full md:w-2/3 text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since.
          </p>
        </div>

        {/* Company */}
        <div>
          <p className="text-xl font-medium mb-5">
            COMPANY
          </p>

          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* Get In Touch */}
        <div>
          <p className="text-xl font-medium mb-5">
            GET IN TOUCH
          </p>

          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1-212-456-7890</li>
            <li>contact@foreveryou.com</li>
          </ul>
        </div>

      </div>

      {/* Copyright */}
      <div>
        <hr />

        <p className="py-5 text-sm text-center">
          Copyright 2026@ forever.com - All Rights Reserved.
        </p>
      </div>

    </div>
  )
}

export default Footer