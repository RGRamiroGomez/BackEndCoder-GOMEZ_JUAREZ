import Product from './models/products.model.js'

class ProductServices {
  async getProducts() {
    return await Product.find().lean()
  }

  async getProductById(pid) {
    return await Product.findById(pid).lean()
  }

  async addProduct(productData) {
    return await Product.create(productData)
  }

  async updateProduct(pid, productData) {
    return await Product.findByIdAndUpdate(pid, productData, { new: true }).lean()
  }

  async deleteProduct(pid) {
    return await Product.findByIdAndDelete(pid).lean()
  }
}

export default new ProductServices()