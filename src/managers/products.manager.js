import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config.js';

const dir = `${config.DIRNAME}/src/data/products.json`

export class  ProductManager {
    

    getProducts = async ()=>{
            const dataFile= await fs.open(dir,'r+')
            const  data = await dataFile.readFile('utf-8')
            if(!data){
                const error = new Error ('No se encontraron productos')
                error.status(404)
                throw error
            }
            const products = JSON.parse(data)
            return products
    }

    addProduct = async (data)=>{
        if (
            data.hasOwnProperty('title') && typeof data.title === 'string' &&
            data.hasOwnProperty('description') && typeof data.description === 'string' &&
            data.hasOwnProperty('code') && typeof data.code === 'string' &&
            data.hasOwnProperty('price') && typeof data.price === 'number' &&
            data.hasOwnProperty('status') && typeof data.status === 'boolean' &&
            data.hasOwnProperty('category') && typeof data.category === 'string'
            ){
        data.pid = uuidv4()
        const dataFile = await fs.open(dir, 'a+')
        const JSONdata= await dataFile.readFile('utf-8')
        const products = JSONdata ?  JSON.parse(JSONdata) : []
        products.push(data)
        if(!updatedProducts){
            if(dataFile){
                await dataFile.close();
            }
            const error = new Error("Error al cargar producto");
            error.status(500);
            throw error
        }
        await dataFile.writeFile(JSON.stringify(products, null, 2))
        dataFile.close()
        return data
        }else{
            const error =  new Error ('Formate incorrecto de producto o propiedas faltante')
            error.status(400)
            throw error
        }
    }

    getProductById = async (pid)=>{
        const dataFile = await  fs.open(dir, 'r+')
        const data = await dataFile.readFile('utf-8')
        if(!data){
            error = new Error('No se pudo acceder a los productos');
            error.status = 500
            if(dataFile){
                await dataFile.close();
            }
            throw error
        }
        const products = JSON.parse(data)
        const product = products.find((product) => product.pid === pid)
        if(!product){
            const error = new Error('No se pudo encontrar el producto')
            error.status = 404
            if(dataFile){
                await dataFile.close()
            }
            throw error;
        }

        await dataFile.close()
        
        return product;
    }
    
    updateProduct = async (pid,data) =>{
        if (
            data.hasOwnProperty('title') && 
            data.hasOwnProperty('description') && 
            data.hasOwnProperty('code') &&
            data.hasOwnProperty('price') && 
            data.hasOwnProperty('status') && 
            data.hasOwnProperty('stock') &&
            data.hasOwnProperty('category') 
          ) {
        const dataFile = await fs.open(dir, 'r+')
        const JSONdata = await dataFile.readFile('utf-8')
        const products =  JSON.parse(JSONdata)
        if (!product){
            const error = new Error('No hemos encontrados productos')
            if(dataFile){
                await dataFile.close()
            }
            error.status = 404
            throw error
        }
        const productIndex = products.findIndex(e  => e.pid === pid)
        if(productIndex === -1){
            const error = new Error('No se ha encontrado el producto')
            error.status = 404
            if(dataFile){
                await dataFile.close()
            }
            throw error
        }
        products[productIndex]=data
        const updatedProduct = products[productIndex]
        await dataFile.writeFile(JSON.stringify(products, null, 2))
        await dataFile.close()
        }else{
            const error = new Error ('Formate de informacion incorrecto')
            error.status = 400
            throw error
        }
    }

    deleteProduct = async (pid)=>{
        const dataFile = await fs.open(dir, 'r+')
        const JSONdata = await dataFile.readFile('utf-8')
        if(!JSONdata){
            const error=  new Error('No hemos encontrado productos')
            error.status = 404
            if(dataFile){  
                await dataFile.close()
            }
            throw error
        }
        const products = JSON.parse(JSONdata)
        const deletedProduct = this.getOneById(pid)
        if(!deletedProduct){
            const error = new Error('No se ha encontrado el producto')
            error.status = 404
            if(dataFile){
                await dataFile.close()
            }
            throw error
        }
        const updatedProducts=products.filter(e=>e.id !=  pid)
        await dataFile.writeFile(JSON.stringify(updatedProducts, null, 2))
        await dataFile.close()
    }





}