const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');


const db= knex({
        client: 'pg',
        connection: {
          host : '127.0.0.1', //localhost
          user : '',
          password : '',
          database : 'face_recognition'
        }
});


const app = express();

app.use(cors())
app.use(bodyParser.json());



app.get('/' , (req , res)=>{
	res.send(database.users);
})



app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})


app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})


app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.post('/imageurlfaces', (req, res) => {image.handleApiCallFaces(req, res)})



app.get('/profile/:id', (req, res) =>{
	const { id } = req.params;
	  db.select('*').from('users').where({id})
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('error getting user'))
})

app.listen(3000 , ()=>{
	console.log('app is running on port 3000');
})








