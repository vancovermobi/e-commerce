import mongoose, {model, models, Schema} from "mongoose";

const CategorySchema = new Schema({
  creator: {
    type      : mongoose.Schema.Types.ObjectId,
    required  : true,
    ref       : 'User',
  },
  name: {
    type    : String, 
    required:[true, 'name category is required'],
  },

  parent: {
    type  : mongoose.Types.ObjectId, 
    ref   :'Category',
  },

  properties: {type:Object},
  
},{ timestamps: true });

const Category = models.Category || model('Category', CategorySchema)

export default Category