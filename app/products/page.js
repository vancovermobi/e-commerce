'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FaPencil, FaTrash } from 'react-icons/fa6'

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

  // Delete Product
  const handleDelete = async (id, title) => {
    //console.log('id product delete:', id)
    const hasConfirmed = confirm(`Are you sure you want to delete product "${title}" ?`)

    if(hasConfirmed) {
      try {
        await fetch(`/api/products/${id.toString()}`, {
              method: 'DELETE'
              })
        const filteredProducts = allProducts.filter((p) => p._id!==id)
        setAllProducts(filteredProducts)   
          
      } catch (error) {
          console.log("Error_Delete-Product: ", error);
      }
    }
  }

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
              <Link href={'/products/'+product._id} className='btn-default'>
                <FaPencil />
                Edit
              </Link>

              <button className='btn-red'
               onClick={() => handleDelete(product._id, product.title)}
              >
                <FaTrash />
                Delete
              </button>
            </td>
          </tr>
        )) }
        </tbody>
      </table>
     
    </div>
  )
}
