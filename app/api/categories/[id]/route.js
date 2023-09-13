import Category from "../../../../models/category";
import { connectToDB } from "../../../../utils/database";

// GET (read)
export const GET = async (req, { params }) => {
    try {
        await connectToDB()
        const category = await Category.findById(params.id).populate(['creator', 'parent']).exec()

        if(!category) return new Response('Category not found', { status: 404 })

        return new Response(JSON.stringify(category), {status: 200})

    } catch (error) {
        return new Response('Failed to fetch Categorys', { status: 500 })
    }
}

// PATCH (update)
export const PATCH = async (req, { params }) => {
    const { userId, name, parent, properties } = await req.json()

    try {
        await connectToDB()
        const existingCategories = await Category.findById(params.id)
        
        if(!existingCategories) return new Response('Category not found', { status: 404 })

        existingCategories.name           = name,
        existingCategories.parent         = parent || undefined,
        existingCategories.properties     = properties

        await existingCategories.save()

        return new Response(JSON.stringify(existingCategories), {status: 200})
        
    } catch (error) {
        return new Response('Failed to update Categoriess', { status: 500 })
    }
}

// DELETE (delete)
export const DELETE = async (req, { params }) => {
   
    try {
        await connectToDB()
        await Category.findByIdAndRemove(params.id)        
     
        return new Response('Category deleted successfully', {status: 200})
        
    } catch (error) {
        return new Response('Failed to delete Categorys', { status: 500 })
    }
}