import { NextResponse, NextRequest } from "next/server.js";
import Category from "../../../models/category.js";
import { connectToDB } from "../../../utils/database.js";

export const GET = async (req,res) => {
    try {
        await connectToDB()
        // const categories = await Category.find({}).populate('creator').exec()
        const categories = await Category.find({}).populate(['creator',  'parent']).exec()
        // const categories = await Category.find({}).exec()

        return new Response(JSON.stringify(categories), {status: 200})
    } catch (error) {
        return new Response('Failed to fetch all Categories', { status: 500 }, error)
    }
}