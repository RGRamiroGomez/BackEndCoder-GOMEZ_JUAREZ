import { Router } from 'express'
import ProductHandler from '../handlers/products.handler.js'

const productHandler = new  ProductHandler()

const router = Router()

router.get('/', productHandler.getProducts)
router.get('/:pid', productHandler.getProductById)
router.post('/', productHandler.addProduct)
router.put('/:pid', productHandler.updateProduct)
router.delete('/:pid', productHandler.deleteProduct)

export default router