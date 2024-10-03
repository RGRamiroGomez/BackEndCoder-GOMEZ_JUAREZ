import express from 'express'
import productsRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';
import { config } from './config.js';


const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/products',productsRouter)
app.use('/api/carts',cartRouter)

app.listen(config.PORT,()=>{
    console.log(`Servidor escuchando en el puerto : ${config.PORT}`)
})