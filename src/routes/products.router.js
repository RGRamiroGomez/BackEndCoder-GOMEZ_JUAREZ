import { Router } from "express"
import fs from 'fs/promises'
import { config } from "../config.js";

const producJsonRoute=`${config.DIRNAME}/data/products.json`
const readFile = async () => {
    try {
      const data = await fs.readFile(producJsonRoute, 'utf8');
      const products = JSON.parse(data);
      return products
    } catch (err) {
      console.error(err);
    }
  };

const router=Router()

router.get('/', async (req, res) => {
    try {
      const products = await readFile()
      res.status(200).send(products)
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Error al leer el archivo' })
    }
  })

router.get('/:pid',async (req,res)=>{
    try{
        const pid=req.params.pid
        const products=await readFile()
        if(!isNaN(Number(pid))&& Number(pid) % 1 === 0){
            const prod=products.find(e=>e.id==pid)
            if(prod){
                res.status(200).send(prod)
            }else{
                res.status(400).send({error:'Not Found',message:'El producto no existe'});
            }
        }else{
            res.status(400).send({error:'Bad Request',message:'Formato de ID incorrecto'})
            }
    }catch(err){
        console.log(err)
        res.status(500).send({ error: 'Error al buscar el producto' })
    }
})


router.post('/',async(req,res)=>{
    try{
        const products=await readFile()
        const prod=req.body
        if (
            prod.hasOwnProperty('title') && typeof prod.title === 'string' &&
            prod.hasOwnProperty('description') && typeof prod.description === 'string' &&
            prod.hasOwnProperty('code') && typeof prod.code === 'string' &&
            prod.hasOwnProperty('price') && typeof prod.price === 'number' &&
            prod.hasOwnProperty('status') && typeof prod.status === 'boolean' &&
            prod.hasOwnProperty('category') && typeof prod.category === 'string'
            ){
            const maxId = Math.max(...products.map(product => product.id))
            const newProduct = { ...req.body, id: maxId + 1 }
            products.push(newProduct)
            fs.writeFile(producJsonRoute, JSON.stringify(products))
            res.status(200).send(`Producto agregado con exito : ${JSON.stringify(newProduct)}`)
            }else {
                res.status(400).send({ error: 'Bad Request', message: 'Formato de producto incorrecto' });
            }
    }catch(err){
        console.log(err)
        res.status(500).send({ error: 'Error al traer el producto' });
    }
})

router.put('/:pid', async (req, res) => {
    try {
      const products = await readFile()
      const pid = req.params.pid
      const index = products.findIndex(product => product.id == pid)
      if (index !== -1) {
        const updatedProduct = req.body
      if (
        updatedProduct.hasOwnProperty('title') && 
        updatedProduct.hasOwnProperty('description') && 
        updatedProduct.hasOwnProperty('code') &&
        updatedProduct.hasOwnProperty('price') && 
        updatedProduct.hasOwnProperty('status') && 
        updatedProduct.hasOwnProperty('stock') &&
        updatedProduct.hasOwnProperty('category') 
      ) {
        const product = { id: products[index].id, ...updatedProduct }
        products[index] = product
        await fs.writeFile(producJsonRoute, JSON.stringify(products))
        res.status(200).send(`Producto actualizado correctamente : ${JSON.stringify(product)}`)
      } else {
        res.status(400).send({ error: 'Bad Request', message: 'Formato de producto incorrecto' })
      }
    }else{
        res.status(404).send({ error: 'Not Found', message: 'Producto a modificar no encontrado' })
    }
    } catch (err) {
      console.error(err)
      res.status(500).send({ error: 'Error al modificar el producto' })
    }
})

router.delete('/:pid', async (req, res) => {
    try {
      const products = await readFile()
      const pid = req.params.pid
      const index = products.findIndex(product => product.id == pid)
      if (index !== -1) {
        products.splice(index, 1)
        await fs.writeFile(producJsonRoute, JSON.stringify(products))
        res.status(200).send({ message: 'Producto eliminado con éxito' })
      } else {
        res.status(404).send({ error: 'Not Found', message: 'Producto no encontrado' })
      }
    } catch (err) {
      console.error(err)
      res.status(500).send({ error: 'Error al eliminar el archivo' })
    }
  })


export default router