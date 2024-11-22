const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDb = require('./config/db')
const router = require('./routes')
const cookieParser = require('cookie-parser')

const app = express()
const allowedOrigins = [process.env.FRONTEND_URL];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'], // Allow OPTIONS (preflight)
  allowedHeaders: ['Content-Type'],
}));

// Handle the OPTIONS request
app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://new-project-v4rxoycqg-shivam-prajapatis-projects-f51bb9db.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.status(200).end();  // Respond with HTTP 200 OK
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

