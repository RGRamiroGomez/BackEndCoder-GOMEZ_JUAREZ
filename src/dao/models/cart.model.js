import mongoose from "mongoose"

const collection= 'products'
const schema = new mongoose.Schema({
    products: [
        {
          pid: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
          },
          quantity: {
            type: Number,
            required: true,
            min: 1
          }
        }
      ]
}
)
const Product = mongoose.model(collection, schema)
export  default Product
