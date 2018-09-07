

const cors = require('cors');

const whiteListDomains = [ 'http://localhost:4200', 'http://localhost:3200', 'http://localhost:3000' ]

var corsOptions = {
    origin: (origin, callback) => {
      if(whiteListDomains.indexOf(origin)>=0){
        callback(null, true)
      }
      else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }

const userController = require('./controllers/userController');  

module.exports = (app) => {
   
    app.use(cors("*"))
    app.get('/', cors("*"), (req, res) => {
        res.send("Hello I am connected")
    })

    app.post('/user/create', userController.createUser);
    app.get('/user/get/:email', userController.getuser)
}