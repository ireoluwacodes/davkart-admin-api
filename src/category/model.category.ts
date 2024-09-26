import { model, Schema } from 'mongoose';
import { ICategory } from './interface.category';

// Declare the Schema of the Mongo model
const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
});

//Export the model
export const Category = model('Category', categorySchema);
