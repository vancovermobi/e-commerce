import mongoose, { Schema, model, models } from 'mongoose'

const ProductSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: [ true, 'Title is required']
    },
    description: {
        type: String,
        required: [ true, 'Description is required']
    },
    price: {
        type: Number,
        required: [ true, 'Price is required']
    },

    images: [{ type: String }],

    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
    },

    properties: { type: Object },
    
}, { timestamps: true })

const Product = models.Product || model('Product', ProductSchema)

export default Product