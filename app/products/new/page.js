'use client'

import { useState, useEffect } from "react";
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import FormProduct from "../../../components/FormProduct";
import FormImages from '../../../components/FormImages'
import {infoProduct} from '../../../constant/index'

export default function NewProduct() {
  const router = useRouter()
  const { data: session, status } = useSession() 
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState(infoProduct)    
   
  const createNewProduct = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    //console.log('Product_Post:', post);
    try {
        const res = await fetch('/api/products/new', {
            method: 'POST',
            body: JSON.stringify({
                            ...post,
                userId      : session?.user?.id,
                title       : post.title,
                description : post.description,                
                price       : post.price,
                images      : post.images,
                categories  : post.categories,                
                properties  : post.properties,
            })
        })
        if(res.ok) {
            router.push('/products')
        }
    } catch (error) {
        console.log("Error_Create-New Product: ", error);
    }
    finally { setSubmitting(false) }
}
  return (
//    <FormProduct 
//         type='Create New'
//         post={post}
//         setPost={setPost}
//         submitting={submitting}
//         handleSubmit={ createNewProduct } 
//     />
    <FormImages />
  );
}
