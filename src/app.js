import express from 'express'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'
import http from 'http'

import productsRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';
import viewRouter from './routes/views.router.js';
import { config } from './config.js';


const app=express()
const server = http.createServer(app)
const io = new Server(server)
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.use('/', viewRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado')

})

server.listen(config.PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${config.PORT}`)
})
 
export {io}
