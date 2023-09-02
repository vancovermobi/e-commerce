import Product from "../../../../models/product";
import { connectToDB } from "../../../../utils/database";

export const POST = async (req) => {
    const { userId, title, description, price } = await req.json()

    try {
        await connectToDB()
        const newProduct = new Product({
            creator: userId,
            title,
            description,
            price,
        })
        await newProduct.save()
        return new Response(JSON.stringify(newProduct),{ status: 201 })

    } catch (error) {
        console.log("Error_new product: ", error);
        return new Response("Failed to create a new product", { status: 500 });
    }
}