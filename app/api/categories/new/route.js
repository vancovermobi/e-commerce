import Category from "../../../../models/category.js";
import { connectToDB } from "../../../../utils/database.js";

export const POST = async (req) => {
    const { userId, name, parent, properties } = await req.json()
    //console.log('Post-categories====', userId, name, parent, properties);

    try {
        await connectToDB()
        const newCategory = new Category({
            creator : userId,
            name    : name,
            parent  : parent,
            properties  : properties,
        })
        await newCategory.save()
        return new Response(JSON.stringify(newCategory),{ status: 201 })

    } catch (error) {
        console.log("Error_new Category: ", error);
        return new Response("Failed to create a new Category", { status: 500 }, error);
    }
}