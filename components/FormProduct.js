'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
//import Image from 'next/image';
// import { FaUpload } from 'react-icons/fa6'
// import { ReactSortable } from 'react-sortablejs';
// import axios from 'axios';
import Spinner from './Spinner'
import FormImages from './FormImages';


export default function FormProduct({ type, post, setPost, submitting, handleSubmit }) {
  console.log('Form Product/post:', post);
  const router = useRouter()
  const [isLoading,setIsLoading]  = useState(false);
  const [category,setCategory] = useState((post.category?._id ?? post.category )|| '');
  const [categories,setCategories] = useState([]);
  const [productProperties,setProductProperties] = useState(post.properties || {});
  const propertiesToFill = [];

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

  //=====Properties===============
  if (categories?.length > 0 && category) {
    let cateInfo = []       
    cateInfo = categories.find(({_id}) => _id === category);   
    //console.log('cateInfo:', cateInfo);
    
    cateInfo?.properties?.length > 0 ? propertiesToFill.push(...cateInfo.properties) : null

    cateInfo.parent?.properties?.length > 0 ? propertiesToFill.push(...cateInfo.parent?.properties) : null
    //console.log('propertiesToFill:', propertiesToFill);
  }
  function setProductProp(propName,value) {
    setProductProperties(prev => {
      const newProductProps = {...prev};
      newProductProps[propName] = value;
      return newProductProps;
    });
    console.log('productProperties:', productProperties);    
  }

  useEffect(() => {   
    (async() => {
      setIsLoading(false)
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data)
      setIsLoading(true)
      //console.log('FormProducts_AllCategories:', data);
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

  function handleOnSubmit() {
    ///setPost({...post, category: category })
    setPost({...post, properties: productProperties })
  }
  return (<>
    { isLoading===false ?
      (
      <div className='h-24 flex justify-center items-center text-center'>
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
            value={ category }
            onChange={(e) => {setCategory(e.target.value),
              setPost({...post, category: e.target.value })}}
          >
            <option value="" >UnCategories</option>
            { categories.length>0 
              && categories.map((category, index) => (
                <option key={index} value={ category._id } >
                  { category.name }
                </option>
            ))}
          </select>
          {/* Properties */}
          {/* {categories.length > 0 &&
           categories.find(({_id}) => _id === category)?.properties?.map(p => (
              <div key={p.name}>
                <label>{ p.name[0].toUpperCase() + p.name.substring(1)}</label>
                <div>
                  <select value={post.properties?.[`${p.name}`]}
                      onChange={ev =>
                        setProductProp(p.name,ev.target.value)                      
                      }
                  >
                    {p.values.map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))
          } */}
          {propertiesToFill.length > 0 && propertiesToFill.map(p => (          
            <div key={p.name} className="pl-4">
              <label className='text-gray-700'>{p.name[0].toUpperCase()+p.name.substring(1)}</label>
              <div>                
                <select type='select' name='properties'
                  value={productProperties[p.name]}
                  onChange={ev => setProductProp(p.name,ev.target.value)}                                 
                >
                  {p.values.map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>            
            </div>
          ))}

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
          <textarea type="text" name="description" 
            placeholder="description" 
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
              onClick={() => handleOnSubmit()}
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