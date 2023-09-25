// import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaPencil, FaTrash } from 'react-icons/fa6'

export default function Table({
  type,
  title,
  dataHead,
  dataBody,
  hrefEdit,
  handleEdit,  
  handleDelete,
  classname,
}) {
  return (
    <section>
      <table className={ classname }>
        <thead>
        <tr>
        {dataHead.length>0 &&
            dataHead.map((head, index) => (            
              <td key={index} >{ head }</td>
        ))}        
        <td></td>
        </tr>
        </thead>
        <tbody>
          {dataBody.length>0 &&
           dataBody.map((data, index) => (
            <tr key={index}>
              <td>{data[`${ title }`]}</td>
              { type=='category' && 
                <td>{ data.parent?.name }</td>
              }
              <td>
                {type==='category' ? (
                <button
                  onClick={() => handleEdit(data)}
                  className="btn-default mr-1"
                >
                  Edit
                </button>
                ):(
                <Link href={`/${ hrefEdit }/` + data._id} className="btn-default">
                    <FaPencil />
                    Edit
                </Link>
                )}    
                <button
                  className="btn-red ml-2"
                  onClick={() => handleDelete(data._id, data[`${ title }`])}
                >
                  <FaTrash />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
