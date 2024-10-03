import { error } from "console";
import { Router } from "express";
import fs from 'fs/promises'
import { config } from "../config.js";
const router=Router()
const cartJsonRoute=`${config.DIRNAME}/data/carts.json`
const readFile = async () => {
    try {
      const data = await fs.readFile(cartJsonRoute, 'utf8');
      const carts = JSON.parse(data);
      return carts
    } catch (err) {
      console.error(err);
    }
  };

router.post('/',async (req,res)=>{
    try{
        const carts=await readFile()
        const cart=req.body
        if(cart.hasOwnProperty('products')){
            const ver=true
            for(let i=0;i < cart.products.length;i++){
                if (!cart.products[i].hasOwnProperty('pid') && !cart[i].hasOwnProperty('quantity') && !cart[i].quanttity>0){
                    ver=false
                }
            }
            if(ver){
                const maxID=Math.max(...carts.map(e=>e.id))
                const newCart={id:maxID,...cart}
                carts.push(newCart)
                await fs.writeFile(cartJsonRoute,JSON.stringify(carts))
                res.status(200).send(`Carrito Agregado con exito : ${JSON.stringify(newCart)}`)
            }else{
                res.status(400).send({error: "Bad Request" , message: "Formate de productos incorrectos"})
            }
        }else{
            res.status(400).send({error: "Bad Request" , message: "No envio productos a agregar al carrito"})
        }
    }catch(err){
        console.log(err)
        res.status(500).send({error:"Error interno" , message:"Error al agregar el nuevo carrito"})
    }
})
router.get('/:cid', async (req, res) => {
    try {
      const cid = req.params.cid
      const carts = await readFile()
      const cart = carts.find((cart) => cart.id === parseInt(cid))
      if (!cart) {
        return res.status(404).send({ error: 'Cart not found' })
      }
      res.status(200).send(cart.products)
    } catch (err) {
      console.error(err)
      res.status(500).send({ error: 'Internal Server Error' })
    }
  })
  router.post('/:cid/product/:pid', async (req, res) => {
    try {
      const cid = req.params.cid
      const pid = req.params.pid
      const quantity = req.body.quantity
      if (!quantity || quantity <= 0) {
        return res.status(400).send({ error: 'Cantidad Invalida' })
      }
      const carts = await readFile()
      const cart = carts.find((cart) => cart.id === parseInt(cid))
      if (!cart) {
        return res.status(404).send({ error: 'Carrito no encontrado' })
      }
      const productIndex = cart.products.findIndex((product) => product.id === parseInt(pid))
      if (productIndex !== -1) {
        cart.products[productIndex].quantity += quantity
      } else {
        cart.products.push({ 'pid': parseInt(pid), quantity: quantity })
      }
      await fs.writeFile(cartJsonRoute, JSON.stringify(carts))
      res.status(200).send({ message: 'Producto agregado con exito' })
    } catch (err) {
      console.error(err)
      res.status(500).send({ error: 'Internal Server Error' })
    }
  })
export default router