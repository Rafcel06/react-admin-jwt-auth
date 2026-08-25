const express = require('express')
const isAuthenticated = require('./public/gaurd/authGuard')
const authenticate = require('./public/middleware/authentication/authenticate')
const serverless = require('serverless-http')

const path = require('path')
require('dotenv').config()
const PORT = process.env.PORT || 4000
const app = express()
const cors = require('cors')
const http =  require('http')  
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(path.join(__dirname,'public/file')))
app.use(cors())


app.get('/', async (req,res) => {

  try {
      res.status(200).json({message : 'Server is running'})
   }
   catch(err) {
    console.log(err)
   }


})

app.use('/api/v1', authenticate)


app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});



module.exports.handler=serverless(app)
