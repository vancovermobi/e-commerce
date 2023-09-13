"use client";

import Image from 'next/image';
import { useState, useEffect } from "react";
import { FaUpload } from "react-icons/fa6";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import Spinner from "./Spinner";

export default function FormImages({ imagesPost, setImagesPost }) {
  //console.log("==========images==========", imagesPost);
  const [images,setImages] = useState(imagesPost);
  const [isUploading, setIsUploading] = useState(false); 

  // Upload Image
  const updateImagesOrder = async (img) => {
    setImages(img)
    //setPost({...post, images: images })   
    //console.log("==========img-sortable==========", img); 
  }
  const uploadImages = async (e) => {
    const files = e.target?.files;
    //console.log("files-images:", files);

    if (files?.length > 0) {
      setIsUploading(true);
      const formData = new FormData();

      for (const file of files) {
        formData.append("file", file);
      }
      //console.log("===Formdata====", formData);
      try {
        const res = await axios.post("/api/uploadimages", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        //console.log('res.done:', res.data.done);

        if(res.data.done==='ok') {
          // const imagesLinks = await res.data.finalFilePaths
          const imagesLinks = await res.data.links
        
          setImages(oldImages =>
            ([...oldImages, ...imagesLinks])             
          );
          // console.log("=======images new========", images);
        }
      } catch (error) {
        console.log(error.response?.data);
      }
      setIsUploading(false);
    }
  }; 
  
  // Check images onchanges
  useEffect(() => {
    if(!isUploading){
      (async () => {
        //console.log("=======images new========", images);
        setImagesPost( images ) 
      })()          
    }     
  }, [images])
  
  return (
    <div>
      <label>Photos</label>
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
        </div>      
    </div>
  );
}
