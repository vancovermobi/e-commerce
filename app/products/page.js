'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FaPencil } from 'react-icons/fa6'

export default function Products() {
  const [allProducts, setAllProducts] = useState([])

  // All Products
  useEffect(() => {
    (async () => {
      const response = await fetch('/api/products')
      const data = await response.json()
      setAllProducts(data)
    })()  
  },[])

  return (
    <div>
      <Link href='/products/new' className='btn-primary'>
        Add new product
      </Link>

      <table className='basic mt-2'>
        <thead>
          <tr>
            <td>Product name</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
        { allProducts.map((product, index) => (
          <tr key={index}>
            <td>{ product.title }</td>
            <td>
              <Link href={'/products/'+product._id}>
                <FaPencil />
                Edit
              </Link>
            </td>
          </tr>
        )) }
        </tbody>
      </table>
     
    </div>
  )
}
