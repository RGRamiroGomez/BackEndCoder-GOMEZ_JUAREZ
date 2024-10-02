import express from 'express'

const PORT=8080
const app=express();

app.get('/',(req,res)=>{
    //console.log(req)
    res.send('OK')
})

app.listen(PORT,()=>{
    console.log(`Servidor escuchando en el puerto : ${PORT}`)
})