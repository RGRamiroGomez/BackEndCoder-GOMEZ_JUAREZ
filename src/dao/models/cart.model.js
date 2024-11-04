import mongoose from "mongoose"

const collection= 'carts'
const schema = new mongoose.Schema({
    products: [
        {
          pid: {
            type: mongoose.Schema.Types.ObjectId,
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
const Cart = mongoose.model(collection, schema)
export  default Cart
