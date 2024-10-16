import { Router } from "express"
import { CartManager } from "../managers/cart.manager.js"

const router = Router()
const cartManager = new CartManager()

router.post('/', async (req, res) => {
    try {
        const cart = await cartManager.addCart(req.body)
        res.status(200).send(`Carrito Agregado con exito: ${JSON.stringify(cart)}`)
    } catch (err) {
        console.log(err)
        res.status(err.status || 500).send({ error: "Error interno", message: "Error al agregar el nuevo carrito" })
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const cid = req.params.cid
        const cart = await cartManager.getCartById(cid)
        res.status(200).send(cart.products)
    } catch (err) {
        console.error(err)
        res.status(err.status || 500).send({ error: 'Carrito no encontrado' })
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const quantity = req.body.quantity

        if (!quantity || quantity <= 0) {
            return res.status(400).send({ error: 'Cantidad Invalida' })
        }

        const cart = await cartManager.addProductToCart(cid, pid, quantity)
        res.status(200).send({ message: 'Producto agregado con exito', cart })
    } catch (err) {
        console.error(err)
        res.status(err.status || 500).send({ error: 'Internal Server Error' })
    }
});

export default router