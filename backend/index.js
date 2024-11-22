const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDb = require('./config/db')
const router = require('./routes')
const cookieParser = require('cookie-parser')

const app = express()

app.use(cors(
    {
        origin : process.env.FRONTEND_URL,
        credentials : true ,
          methods: ['GET', 'POST', 'OPTIONS'], // Ensure OPTIONS method is allowed
       allowedHeaders: ['Content-Type'],
    }
))
app.options('*', (req, res) => {
  res.sendStatus(200); // Respond with HTTP 200 status
});
app.use(express.json())
app.use(cookieParser())
app.use("/api",router)


const PORT = 8080 || ProcessingInstruction.env.PORT

connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log("server is running")
    })
})

