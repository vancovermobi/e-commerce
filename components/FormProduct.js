
export default function FormProduct({  type, post, setPost, submitting, handleSubmit }) {
   if(type==='create'){
        type='Create New'
   }else if(type==='update'){
        type='Update'
   }

  return (
    <section>
      <h1>{ type } Product</h1>

      <form onSubmit={handleSubmit}>

        <label for="title">Product name</label>
        <input  type="text" name="title" placeholder="product name" 
                value={ post.title }
                onChange={(e) => setPost({...post, title: e.target.value })}
        />

        <label for="description">Description</label>
        <textarea type="text" name="description" placeholder="description" 
                value={ post.description }
                onChange={(e) => setPost({...post, description : e.target.value })}
        />

        <label for="price">Price (in USD)</label>
        <input  type="number" name="price" placeholder="price" 
                value={ post.price }
                onChange={(e) => setPost({...post, price: e.target.value })}
        />

        <button
            type='submit'
            disabled={submitting}
            className='btn-primary'
          >
              { submitting? `Saving...` : type }
        </button>

      </form>
    </section>
  );
}