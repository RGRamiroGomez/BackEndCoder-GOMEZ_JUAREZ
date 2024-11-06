// src/routes/cart.router.js
import { Router } from 'express'
import cartController from '../controllers/cart.controller.js'

const router = Router()
router.get('/',cartController.getCarts)
router.get('/:cid', cartController.getCart)
router.put('/:cid', cartController.updateCart)
router.put('/:cid/products/:pid', cartController.updateProductQuantity)
router.delete('/:cid/products/:pid', cartController.removeProductFromCart)
router.delete('/:cid', cartController.clearCart)

export default router