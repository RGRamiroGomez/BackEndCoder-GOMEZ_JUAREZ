import { Router } from "express"
import { ProductManager } from "../managers/products.manager.js";

const router=Router()
const productManager = new ProductManager;

router.get('/', async (req, res) => {
    try {
      const products = await productManager.getProducts()
      res.status(200).send(products)
    } catch (err) {
      console.error(err);
      res.status(err.status || 500).send(err.message)
    }
  })

router.get('/:pid',async (req,res)=>{
    try{
        const pid=req.params.pid
        const product = await productManager.getOneById(pid)
        res.status(200).send(product)
    }catch(err){
        res.status(err.status || 500).send(err.message)
    }
})


router.post('/',async(req,res)=>{
    try{
      const data=req.body
      const newProduct=await productManager.addProduct(data)

      res.status(200).send(newProduct)
        
    }catch(err){
        console.log(err)
        res.status(err.status || 500).send(err.message);
    }
})

router.put('/:pid', async (req, res) => {
    try {
      const {pid} = req.params
      const product = await productManager.updateOneById(pid, req.body)
      res.status(200).send(product)
    } catch (err) {
      console.error(err)
      res.status(err.status || 500).send(err.message)
    }
})

router.delete('/:pid', async (req, res) => {
    try {
      const deletedProduct = await productManager.deleteProduct(req.params.pid)
      res.status(200).send(deletedProduct)
    } catch (err) {
      console.error(err)
      res.status(err.status || 500).send(err.message)
    }
  })


export default router