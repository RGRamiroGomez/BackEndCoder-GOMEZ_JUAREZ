import Cart from './models/cart.model.js';

class CartServices {
    async getCarts(){
        return await  Cart.find()

    }
    async getCart(cid) {
        return await Cart.findById(cid).populate('products.product')
    }

    async updateCart(cid, products) {
        const cart = await Cart.findById(cid)
        if (!cart) throw new Error('Carrito no encontrado')
        cart.products = products
        return await cart.save()
    }

    async updateProductQuantity(cid, pid, quantity) {
        const cart = await Cart.findById(cid)
        if (!cart) throw new Error('Carrito no encontrado')
        const productIndex = cart.products.findIndex(p => p.product.toString() === pid)
        if (productIndex === -1) throw new Error('Producto no encontrado en el carrito')
        cart.products[productIndex].quantity = quantity
        return await cart.save()
    }

    async removeProductFromCart(cid, pid) {
        const cart = await Cart.findById(cid)
        if (!cart) throw new Error('Carrito no encontrado')
        cart.products = cart.products.filter(p => p.product.toString() !== pid)
        return await cart.save()
    }

    async clearCart(cid) {
        const cart = await Cart.findById(cid)
        if (!cart) throw new Error('Carrito no encontrado')
        cart.products = []
        return await cart.save()
    }
}

export default new CartServices()