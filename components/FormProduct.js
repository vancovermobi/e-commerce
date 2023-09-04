'use client'

import Image from 'next/image';
import { useState, useEffect } from 'react'
import { FaUpload } from 'react-icons/fa6'
import { ReactSortable } from 'react-sortablejs';
import axios from 'axios';
import Spinner from './Spinner'


export default function FormProduct({  type, post, setPost, submitting, handleSubmit }) {
  const [images,setImages] = useState( post.images || []);
  const [isUploading,setIsUploading]  = useState(false);
  const [categories,setCategories]    = useState([]);

  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState();


  // Upload Image
  const updateImagesOrder = (images) => {
    setPost(images)    
  }
  const uploadImages = async (e) => { 
   
    // console.log('e images', e.target?.files)
    const files = e.target?.files
    console.log('files-images:',files[0])

    if(files?.length > 0 ) {
      setIsUploading(true)
      const formData = new FormData()
      formData.append('folder', 'liem');
      const file = formdata.get('file');
        if (file instanceof Blob) {
          formData.append('file', file);
        } else {
            throw new Error('Invalid file data');
      }
      // for (const file of files ){
      //   formdata.append('file', file)
      // }
      // for ( const [key, value] of formdata){
      //   console.log(`key: ${key}`);
      //   console.log(`Value: ${JSON.stringify(value)}`);
      // }
     
      console.log('===Formdata====', formData);

      try {
        // const res = await axios.post('/api/uploadimages', data)
        const res = await fetch('/api/uploadimages', {
          method: "POST",
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
          redirect: 'follow'
         });
        //const res = await fetch('/api/uploadimages');
        console.log('res-data:', res);
      } catch (err) {
        console.log('upload api err:',err);
      }
      

      // setImages(oldImages => {
      //   return [ ...oldImages, res.data.links ]
      // })

      setIsUploading(false)
    }
  }

  const handleUpload = async () => {
    setUploading(true);
    try {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append("myImage", selectedFile);

      console.log('======myImage========:', selectedFile);
      // const { data } = await axios.post("/api/uploadimages", formData});
      const { data }= await fetch('/pages/api/uploadimages', {
        method: "POST",
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
       });
      console.log('==========res-data==========',data);
    } catch (error) {
      console.log(error.response?.data);
    }
    setUploading(false);
  };
  
  return (
    <section>
      <h1>{ type } Product</h1>

      <form onSubmit={handleSubmit}>

        {/* Title */}
        <label htmlFor="title">Product name</label>
        <input  type="text" name="title" placeholder="product name" 
                value={ post.title }
                onChange={(e) => setPost({...post, title: e.target.value })}
        />

        {/* Images */}
        <label>Photos</label>
        <div className="photo">
          <ReactSortable
            className='flex flex-wrap gap-1'
            list={ post.images }
            setList={ updateImagesOrder }
          >
            {!!images?.length && images.map(link => (
              <div key={link} className='uploadimage'>
                <Image 
                  src={ link }
                  width={24}
                  height={24}
                  className='rounded-lg'
                />
              </div>
            ))}          
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
          <button 
                onClick={handleUpload}
                disabled={uploading}
                style={{ opacity: uploading ? ".5" : "1" }}
                className="bg-red-600 p-3 w-32 text-center rounded text-white"
          >
            {uploading ? "Uploading.." : "Upload"}
          </button>
        </div>       
        
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
      </form>
    </section>
  );
}