// import { useState, useEffect } from 'react'

export default function FormCategories({
    type,
    name,
    setName,
    saveCategory,
    allCategories,
    parentCategory,
    setParentCategory,
    checkPost,
}) {
  //const [name, setName] = useState('')
  //const [parentCategory, setParentCategory] = useState('')
  //const [checkPost, setCheckPost] = useState(true)

  return (
    <section>
      <label>{ type }</label>
      {/* Form create category */}
      <form onSubmit={saveCategory} className="flex gap-1">
        <input
          type="text"
          name="category"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={"Category name"}
          className="mb-0"
        />

        <select
          className="mb-0"
          type="select"
          value={parentCategory}
          onChange={(e) => setParentCategory(e.target.value)}
        >
          <option value="" type="option">
            No Parent Category
          </option>

          {allCategories.length > 0 &&
            allCategories.map((category, index) => (
              <option key={index} value={category._id} type="option">
                {category.name}
              </option>
            ))}
        </select>
        <button type="submit" className="btn-primary py-1">
          {checkPost ? "Save" : "Saving..."}
        </button>
      </form>
    </section>
  );
}
