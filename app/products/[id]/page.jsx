'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import FormProduct from '../../../components/FormProduct'
import {infoProduct} from '../../../constant/index'
import Spinner from '../../../components/Spinner'

export default function ProductId({ params }) {
  // const params = useParams() 
  const router = useRouter()   
  const productId = params?.id 
  //console.log('id product:', productId);   
  const [submitting, setSubmitting] = useState(false)
  const [isUploading,setIsUploading]  = useState(false);
  const [post, setPost] = useState(infoProduct)    

  useEffect(() => {
      if(productId){
        (async () => {
          const response =  await fetch(`/api/products/${productId}`)
          const data = await response.json()
          setPost({
            _Id         : data._id,
            title       : data.title,
            description : data.description,                
            price       : data.price,
            images      : data.images,
            category    : data.category,                
            properties  : data.properties,
          })
          //console.log(`Product-id=${productId}:`, data); 
          setIsUploading(true)
        })()            
      }       
  }, [productId])
    
    const updateProduct = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        setIsUploading(false)
        console.log('update-products:', post)

        if(!productId) return alert('Product ID not found')

        try {
            const res = await fetch(`/api/products/${productId}`, {
                method: 'PATCH',
                body: JSON.stringify({                 
                  title       : post.title,
                  description : post.description,                
                  price       : post.price,
                  images      : post.images,
                  category    : post.category,                
                  properties  : post.properties,
                })
            })
            if(res.ok) {              
              router.push('/products')
            }
        } catch (error) {
            console.log("Error_Update-Product: ", error);
        }
        finally { 
          setSubmitting(false) 
          setIsUploading(true) 
        }
    }
  return (<>
    { isUploading===false ?
      (
      <div className='h-24 flex items-center'>
        <Spinner />
      </div>
    ):(
      <FormProduct 
          type='Edit'
          post={post}
          setPost={setPost}
          submitting={submitting}
          handleSubmit={ updateProduct } 
      />
    )}
  </>)
}
