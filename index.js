const express= require('express')
const cors= require('cors')
const app= express()
const port= process.env.port|| 5000

// middlewire
app.use(cors())
app.use(express.json())

app.get('/', (req,res)=>{
    res.send('tech vally server running')
})
app.listen(port, ()=>{
    console.log(`Tech valy server is running at port ${port}`)
})