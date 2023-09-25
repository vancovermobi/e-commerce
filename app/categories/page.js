'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Table from '../../components/Table'
import Spinner from '../../components/Spinner'
import { withSwal } from 'react-sweetalert2'

function Categories({ swal }) {
  const { data: session, status } = useSession() 
  const [allCategories, setAllCategories] = useState([])
  const [name, setName] = useState('')
  const [parentCategory, setParentCategory] = useState('')
  const [editedCategory, setEditedCategory] = useState(null);
  const [properties,setProperties] = useState([]);
  const [checkPost, setCheckPost] = useState(true)

  //========Categories==============
  async function AllCategories() {
    try {          
      const response = await fetch('/api/categories')
      const data = await response.json()
      setAllCategories(data)
      setEditedCategory(null)
      //console.log('AllCategories:', data);
    } catch (error) {
      console.log('Download all categories error:', error)
    }
  }

  async function saveCategory(e) {
    e.preventDefault()
    //console.log('name:', name)
    setCheckPost(false)
    const data = {      
      userId      : session?.user?.id,
      name        : name,
      parent      : parentCategory,
      properties  : properties.map(p => ({
        name  : p.name,
        values: p.values.split(',')
      })),
    }
    try {
      if(editedCategory){
        data._id = editedCategory._id
        await fetch(`api/categories/${editedCategory._id}`, {
          method: 'PATCH',
          body  : JSON.stringify(data),
        })
       
      }else{
        await fetch('api/categories/new', {
          method: 'POST',
          body  : JSON.stringify(data),
        })       
      }
      await AllCategories()       
    } catch (error) {
      console.log("Error_Create-New Product: ", error);
    } finally{  
      setName('')
      setParentCategory('')
      setProperties([])
      setCheckPost(true)
    }    
  }

  async function handleEdit(category){
    //console.log('handleEdit category:', category);
    setEditedCategory(category)
    setName(category.name)
    setParentCategory(category.parent?._id)
    setProperties(
      !category.properties ? [] :
      category.properties.map(({ name, values }) =>({
        name  : name,
        values: values.join(','),
      }))
    )
    setCheckPost(true)
  }
  async function handleDelete(id, title) {
    //console.log('id product delete:', id)
    //======Option 1==========
    // const hasConfirmed = confirm(`Are you sure you want to delete category "${title}" ?`)
    // if(hasConfirmed) {
    //   try {
    //     await fetch(`/api/categories/${id.toString()}`, {
    //           method: 'DELETE'
    //           })
    //     const filteredCategories = allCategories.filter((p) => p._id!==id)
    //     setAllCategories(filteredCategories)   
          
    //   } catch (error) {
    //       console.log("Error_Delete-Categories: ", error);
    //   }
    // }

    //=============OPtion2: sweetalert2=============
    swal.fire({
      title : 'Are you sure?',
      text  : `Do you want to delete category: "${title}" ?`,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes, Delete!',
      confirmButtonColor: '#d55',
      reverseButtons: true,
    }).then( async result => {
      if(result.isConfirmed) {
        try {
          await fetch(`/api/categories/${id.toString()}`, {
                method: 'DELETE'
                })
          const filteredCategories = allCategories.filter((p) => p._id!==id)
          setAllCategories(filteredCategories)            
        } catch (error) {
            console.log("Error_Delete-Categories: ", error);
        }
      }
    })
  }

  useEffect(() => {   
     AllCategories()    
},[])
//============END==================

//=======Properties=================
 async function addProperty() {
  setProperties(prev => {
    return [...prev, { name:'', values:''}]
  })
 }
 async function handlePropertyNameChange(index, property, newName) { 
  setProperties(prev => {
    const properties = [...prev]
    properties[index].name = newName
    return properties
  })
 }
 async function handlePropertyValuesChange(index, property, newValues) {   
  setProperties(prev => {
    const properties = [...prev]
    properties[index].values = newValues
    return properties
  }) 
 }
 async function removeProperty(indexToRemove) {
  setProperties(prev => {
    return [...prev].filter((p, pIndex) => {
      return pIndex !== indexToRemove
    })    
  }) 
 }
//=========END==============

  return (
    <section>
      <h1>Categories</h1>
      <label>
        {editedCategory
          ? `Edit category: ${editedCategory.name}`
          : 'Create new category'
        }
      </label>

      {/*=====Form create category======*/}
      <form onSubmit={ saveCategory }>
        <div className='flex gap-1'>
          {/* Name Category */}
            <input 
              type='text'
              name='category'
              value={ name }
              onChange={ (e) => setName(e.target.value) }
              placeholder={'Category name'}
              className=''
            />
          {/* Parent Categories */}
            <select className='' type='select'
              value={ parentCategory }
              onChange={(e) => setParentCategory(e.target.value)}
            >
              <option value="" >No Parent Category</option>

              {allCategories.length>0 
                && allCategories.map((category, index) => (
                  <option key={index} value={ category._id } >
                    { category.name }
                  </option>
              ))}
            </select>
        </div>  

        {/* Properties */}
        <div className='mb-2'>
          <label className='block'>Propperties</label>
          <button 
            type='button'
            className='btn-secondary text-sm mb-2'
            onClick={ addProperty }
            >
            Add New property
          </button>
        </div>
        {properties.length > 0 && properties.map((property, index) => (
          <div key={index} className='flex gap-1 mb-2'>
            <input            
              type='text'
              value={ property.name }
              placeholder={`property name (example: color)`}
              className='mb-0'
              onChange={(e) => handlePropertyNameChange( 
                                  index,  
                                  property,
                                  e.target.value
              )}
            />

            <input 
              type='text'
              value={ property.values }
              placeholder="value, comma separated"
              className='mb-0'
              onChange={(e) => handlePropertyValuesChange(
                                  index,  
                                  property,
                                  e.target.value
              )}
            />

            <button
              type='button'
              className='btn-red'
              onClick={() => removeProperty(index)}
            >
              Remove
            </button>
          </div>
        ))}
        
        {/* Action Button Save */}
        <div className='flex gap-1'>
        {editedCategory && (
          <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setName('');
                setParentCategory('');
                setProperties([]);
            }}
              className="btn-default"
            >Cancel
          </button>
          )}
        <button type='submit' className='btn-primary py-1'>
        { checkPost? 'Save' : 'Saving...' }
        </button>
        </div>
      </form>
      {/*========END FORM =======*/}
      
      {/*Dispaly all categories*/}
      {!editedCategory && (<>      
        {allCategories.length>0 ? (
          <Table
          type={'category'}
          title={'name'}
          dataHead={['Category Name', 'Parent category']}
          dataBody={ allCategories }
          hrefEdit={'categories'}
          handleEdit={(category) => handleEdit(category)}
          handleDelete={(id, title) => handleDelete(id, title)}
          classname={'basic mt-4'}
        />
        ):(
          <div className='h-24 flex justify-center items-center text-center'>
            <Spinner width={36}/>
          </div>
        )}
      </>)}

      {/* <table className='basic mt-4'>
        <thead>
          <tr>
            <td>Category Name</td>
          </tr>
        </thead>
        <tbody>
          {allCategories.length>0 
            && allCategories.map((category, index) => (
              <tr key={index}>
                <td>{ category.name }</td>
              </tr>
          ))}
        </tbody>
      </table> */}
    </section>
  )
}

export default withSwal(({ swal }, ref) => (
  <Categories swal={ swal } />
))