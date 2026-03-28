const express = require('express')
const isAuthenticated = require('./public/gaurd/authGuard')
const authenticate = require('./public/middleware/authentication/authenticate')


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




app.use('/api/v1', authenticate)



if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get(/(.*)/, (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}



app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});




