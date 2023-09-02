import Product from "../../../../models/product";
import { connectToDB } from "../../../../utils/database";

// GET (read)
export const GET = async (req, { params }) => {
    try {
        await connectToDB()
        const product = await Product.findById(params.id).populate('creator')

        if(!product) return new Response('Product not found', { status: 404 })

        return new Response(JSON.stringify(product), {status: 200})

    } catch (error) {
        return new Response('Failed to fetch products', { status: 500 })
    }
}

// PATCH (update)
export const PATCH = async (req, { params }) => {
    const { title, description, price } = await req.json()

    try {
        await connectToDB()
        const existingProduct = await Product.findById(params.id)
        
        if(!existingProduct) return new Response('Product not found', { status: 404 })

        existingProduct.title       = title
        existingProduct.description = description
        existingProduct.price       = price

        await existingProduct.save()

        return new Response(JSON.stringify(existingProduct), {status: 200})
        
    } catch (error) {
        return new Response('Failed to update products', { status: 500 })
    }
}

// DELETE (delete)
export const DELETE = async (req, { params }) => {
   
    try {
        await connectToDB()
        await Product.findByIdAndRemove(params.id)        
     
        return new Response('Product deleted successfully', {status: 200})
        
    } catch (error) {
        return new Response('Failed to delete products', { status: 500 })
    }
}