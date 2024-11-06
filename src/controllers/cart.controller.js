import CartServices from '../dao/cart.services.js'

class CartController {
  async getCarts(req, res) {
    try {
      const carts = await CartServices.getCarts()
      res.json({ status: 'success', payload: carts })
    } catch (error) {
      res.status(404).json({ status: 'error', message: error.message })
    }
  }
  async getCart(req, res) {
    try {
      const cart = await CartServices.getCart(req.params.cid)
      res.json({ status: 'success', payload: cart })
    } catch (error) {
      res.status(404).json({ status: 'error', message: error.message })
    }
  }

  async updateCart(req, res) {
    try {
      const cart = await CartServices.updateCart(req.params.cid, req.body.products)
      res.json({ status: 'success', payload: cart })
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message })
    }
  }

  async updateProductQuantity(req, res) {
    try {
      const cart = await CartServices.updateProductQuantity(req.params.cid, req.params.pid, req.body.quantity);
      res.json({ status: 'success', payload: cart })
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message })
    }
  }

  async removeProductFromCart(req, res) {
    try {
      const cart = await CartServices.removeProductFromCart(req.params.cid, req.params.pid)
      res.json({ status: 'success', payload: cart })
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message })
    }
  }

  async clearCart(req, res) {
    try {
      const cart = await CartServices.clearCart(req.params.cid)
      res.json({ status: 'success', message: 'Todos los productos han sido eliminados del carrito' })
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message })
    }
  }
}

export default new CartController()