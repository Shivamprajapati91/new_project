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
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'], // Allow OPTIONS (preflight)
   allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Handle the OPTIONS request
app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://new-project-lemon-three.vercel.app');  // Specific allowed origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');  // Allow credentials
  res.status(200).end();  // Respond with 200 OK for OPTIONS request
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

