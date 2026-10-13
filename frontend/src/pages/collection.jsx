import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/shopcontext'
import ProductItem from '../component/productitem'

const Collection = () => {

  const {
    products,
    search
  } = useContext(ShopContext)

  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])

  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])

  const [sortType, setSortType] = useState('relavent')


  // ================= CATEGORY FILTER =================

  const toggleCategory = (e) => {

    if (category.includes(e.target.value)) {

      setCategory(prev =>
        prev.filter(item => item !== e.target.value)
      )

    } else {

      setCategory(prev => [
        ...prev,
        e.target.value
      ])

    }
  }


  // ================= SUB CATEGORY FILTER =================

  const toggleSubCategory = (e) => {

    if (subCategory.includes(e.target.value)) {

      setSubCategory(prev =>
        prev.filter(item => item !== e.target.value)
      )

    } else {

      setSubCategory(prev => [
        ...prev,
        e.target.value
      ])

    }
  }


  // ================= SEARCH + FILTER + SORT =================

  useEffect(() => {

    let productsCopy = products.slice()


    // SEARCH
    if (search) {

      productsCopy = productsCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )

    }


    // CATEGORY FILTER
    if (category.length > 0) {

      productsCopy = productsCopy.filter(item =>
        category.includes(item.category)
      )

    }


    // SUB CATEGORY FILTER
    if (subCategory.length > 0) {

      productsCopy = productsCopy.filter(item =>
        subCategory.includes(item.subCategory)
      )

    }


    // SORTING
    if (sortType === 'low-high') {

      productsCopy.sort((a, b) =>
        a.price - b.price
      )

    }

    else if (sortType === 'high-low') {

      productsCopy.sort((a, b) =>
        b.price - a.price
      )

    }


    setFilterProducts(productsCopy)

  }, [
    search,
    category,
    subCategory,
    sortType,
    products
  ])


  return (

    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>


      {/* ================= FILTERS ================= */}

      <div className='min-w-60'>

        <p
          onClick={() => setShowFilter(!showFilter)}
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
        >
          FILTERS
        </p>


        {/* ================= CATEGORIES ================= */}

        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? '' : 'hidden'
          } sm:block`}
        >

          <p className='mb-3 text-sm font-medium'>
            CATEGORIES
          </p>


          <div className='flex flex-col gap-2 text-sm text-gray-700'>


            {/* MEN */}

            <p className='flex gap-2'>

              <input
                className='w-3'
                type='checkbox'
                value='Men'
                onChange={toggleCategory}
              />

              Men

            </p>


            {/* WOMEN */}

            <p className='flex gap-2'>

              <input
                className='w-3'
                type='checkbox'
                value='Women'
                onChange={toggleCategory}
              />

              Women

            </p>


            {/* KIDS */}

            <p className='flex gap-2'>

              <input
                className='w-3'
                type='checkbox'
                value='Kids'
                onChange={toggleCategory}
              />

              Kids

            </p>


          </div>

        </div>


        {/* ================= TYPE ================= */}

        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? '' : 'hidden'
          } sm:block`}
        >

          <p className='mb-3 text-sm font-medium'>
            TYPE
          </p>


          <div className='flex flex-col gap-2 text-sm text-gray-700'>


            {/* TOPWEAR */}

            <p className='flex gap-2'>

              <input
                className='w-3'
                type='checkbox'
                value='Topwear'
                onChange={toggleSubCategory}
              />

              Topwear

            </p>


            {/* BOTTOMWEAR */}

            <p className='flex gap-2'>

              <input
                className='w-3'
                type='checkbox'
                value='Bottomwear'
                onChange={toggleSubCategory}
              />

              Bottomwear

            </p>


            {/* WINTERWEAR */}

            <p className='flex gap-2'>

              <input
                className='w-3'
                type='checkbox'
                value='Winterwear'
                onChange={toggleSubCategory}
              />

              Winterwear

            </p>


          </div>

        </div>

      </div>


      {/* ================= PRODUCTS ================= */}

      <div className='flex-1'>


        {/* ================= TITLE + SORT ================= */}

        <div className='flex justify-between text-base sm:text-2xl mb-4'>


          {/* TITLE */}

          <div className='inline-flex gap-2 items-center mb-3'>

            <p className='text-gray-500'>
              ALL
            </p>

            <p className='text-gray-700 font-medium'>
              COLLECTIONS
            </p>

          </div>


          {/* SORT */}

          <select
            onChange={(e) => setSortType(e.target.value)}
            className='border-2 border-gray-300 text-sm px-2'
            value={sortType}
          >

            <option value='relavent'>
              Sort by: Relevant
            </option>

            <option value='low-high'>
              Sort by: Low to High
            </option>

            <option value='high-low'>
              Sort by: High to Low
            </option>

          </select>


        </div>


        {/* ================= PRODUCT GRID ================= */}

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>


          {filterProducts.map((item, index) => (

            <ProductItem
              key={item._id || index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />

          ))}


        </div>


      </div>


    </div>

  )
}

export default Collection