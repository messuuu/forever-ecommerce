import React from 'react'
import Title from '../component/title'
import { assets } from '../assets/assets'
import NewsletterBox from '../component/newsletterbox'

const Contact = () => {

    return (

        <div>

            {/* ================= TITLE ================= */}

            <div className='text-center text-2xl pt-10 border-t'>

                <Title text1={'CONTACT'} text2={'US'} />

            </div>


            {/* ================= CONTACT SECTION ================= */}

            <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>

                {/* CONTACT IMAGE */}

                <img
                    className='w-full md:max-w-[480px]'
                    src={assets.contact_img}
                    alt=''
                />


                {/* CONTACT INFORMATION */}

                <div className='flex flex-col justify-center items-start gap-6'>

                    <p className='font-semibold text-xl text-gray-600'>
                        Our Store
                    </p>

                    <p className='text-gray-500'>
                        54709 Willms Station
                        <br />
                        Suite 350, Washington.
                    </p>


                    <p className='text-gray-500'>
                        Tel: (415) 555-0132
                        <br />
                        Email: admin@forever.com
                    </p>


                    <p className='font-semibold text-xl text-gray-600'>
                        Careers at Forever
                    </p>

                    <p className='text-gray-500'>
                        Learn more about our teams and job openings.
                    </p>


                    {/* ================= EXPLORE JOBS BUTTON ================= */}

                    <button
                        className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'
                    >
                        Explore Jobs
                    </button>

                </div>

            </div>


            {/* ================= NEWSLETTER ================= */}

            <NewsletterBox />

        </div>

    )
}

export default Contact