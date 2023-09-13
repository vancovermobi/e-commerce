'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
//import Image from 'next/image';
// import { FaUpload } from 'react-icons/fa6'
// import { ReactSortable } from 'react-sortablejs';
// import axios from 'axios';
import Spinner from './Spinner'
import FormImages from './FormImages';


export default function FormProduct({  
  type, post, setPost, submitting, handleSubmit }) {
  const router = useRouter()
  const [isLoading,setIsLoading]  = useState(false);
  const [categories,setCategories] = useState([]);

  //====Upload Images Option 2=========
    //console.log('=====post.images=====',  post.images);
    //const [images,setImages] = useState(post.images || []);
    //console.log('images00:', images);
    //console.log('images.length:', images.length);
    //const [isUploading,setIsUploading]  = useState(false);  

    // Function Upload Image
    // const updateImagesOrder = async (img) => {
    //   setImages(img)
    //   //setPost({...post, images: images })   
    //   //console.log("==========img-sortable==========", img); 
    // }
    // const uploadImages = async (e) => {
    //   const files = e.target?.files;
    //   //console.log("files-images:", files);

    //   if (files?.length > 0) {
    //     setIsUploading(true);
    //     const formData = new FormData();

    //     for (const file of files) {
    //       formData.append("file", file);
    //     }
    //     //console.log("===Formdata====", formData);
    //     try {
    //       const res = await axios.post("/api/uploadimages", formData, {
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //         },
    //       });
    //       //console.log('res.done:', res.data.done);

    //       if(res.data.done==='ok') {
    //         // const imagesLinks = await res.data.finalFilePaths
    //         const imagesLinks = await res.data.links
          
    //         setImages(oldImages =>
    //           ([...oldImages, ...imagesLinks])             
    //         );
    //         // console.log("=======images new========", images);
    //         //setPost({...post, images: images }) 
    //       }
    //     } catch (error) {
    //       console.log(error.response?.data);
    //     }
    //     //setPost({...post, images: images }) 
    //     setIsUploading(false);
    //   }
    // };  
    // useEffect(() => {
    //   if(!isUploading){
    //     (async () => {
    //       //console.log("=======images new========", images);
    //       setPost({...post, images: images }) 
    //     })()          
    //   }     
    // }, [images])
  // =====END=============
  
  useEffect(() => {   
    (async() => {
      setIsLoading(false)
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data)
      setIsLoading(true)
      //console.log('AllCategories:', data);
    })()      
   
    // try {          
    //   const response = await fetch('/api/categories')
    //   const data = await response.json()
    //   setCategories(data)
    //   //console.log('AllCategories:', data);
    // } catch (error) {
    //   console.log('Download all categories error:', error)
    // }
  }, [])
  return (<>
    { isLoading===false ?
      (
      <div className='h-24 flex items-center'>
        <Spinner />
      </div>
      ):(
      <section>
        <h1>{ type } Product</h1>

        <form onSubmit={handleSubmit}>

          {/* Title */}
          <label htmlFor="title">Product name</label>
          <input  type="text" name="title" placeholder="product name" 
                  value={ post.title }
                  onChange={(e) => setPost({...post, title: e.target.value })}
          />

          {/* Categories */}
          <label htmlFor="categories">Categories</label>
          <select type='select' name='categories'
            value={ post.category?._id }
            onChange={(e) => setPost({...post, category: e.target.value })}
          >
            <option value="" >UnCategories</option>
            { categories.length>0 
              && categories.map((category, index) => (
                <option key={index} value={ category._id } >
                  { category.name }
                </option>
            ))}
          </select>

          {/* Images */}
          <FormImages 
            imagesPost={ post.images } 
            setImagesPost={ (images) => setPost({...post, images: images }) }          
          />
          {/* or Option 2 */}
          {/* <label>Photos</label>
          <div className="photo">
            <ReactSortable
              className='flex flex-wrap gap-1'
              list={ images }
              setList={ updateImagesOrder }
            >
              {!!images?.length!==0 ? 
              (images?.map((link, index) => (
                <div key={index} className='uploadimage'>
                  <Image 
                  src={link.toString()}
                    width={100}
                    height={200}
                    alt=''
                    className='rounded-lg'
                  />
                </div>              
              )))
              :(
                <div className='uploadimage'>
                  No images
                </div>
              )}          
            </ReactSortable>
            {isUploading && (
              <div className='h-24 flex items-center'>
                <Spinner />
              </div>
            )}
            <label className='uploadimage'>
              <FaUpload className='w-6 h-6'/>
              <div>
                Add image
              </div>
              <input 
                type='file'
                name='file' 
                multiple 
                hidden              
                onChange={ uploadImages }
              />
            </label>         
          </div>        */}
          
          {/* Description */}
          <label htmlFor="description">Description</label>
          <textarea type="text" name="description" placeholder="description" 
                  value={ post.description }
                  onChange={(e) => setPost({...post, description : e.target.value })}
          />
          {/* Price */}
          <label htmlFor="price">Price (in USD)</label>
          <input  type="number" name="price" placeholder="price" 
                  value={ post.price }
                  onChange={(e) => setPost({...post, price: e.target.value })}
          />
          {/* Submit */}
          <button
              // type='submit'
              disabled={submitting}
              className='btn-primary'
            >
                { submitting? 'Saving...' : 'Save' }
          </button>

          {/* Cancel */}
          <button
            type='button'
            value='Cancel'
            className='btn-default ml-4'
            onClick={() => { router.push('/products')}}
          >
            Cancel
          </button>
        </form>
      </section>
    )}
  </>);
}