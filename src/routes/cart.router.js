// src/routes/cart.router.js
import { Router } from 'express'
import cartHandler from '../handlers/cart.handler.js'

const router = Router()
router.get('/',cartHandler.getCarts)
router.get('/:cid', cartHandler.getCart)
router.put('/:cid', cartHandler.updateCart)
router.put('/:cid/products/:pid', cartHandler.updateProductQuantity)
router.delete('/:cid/products/:pid', cartHandler.removeProductFromCart)
router.delete('/:cid', cartHandler.clearCart)

export default router