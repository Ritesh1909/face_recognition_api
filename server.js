const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');


process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
const db = knex({
        client: 'pg',
        connection: {
          connectionString : process.env.DATABASE_URL, //localhost
          ssl: true,
        }
});


const app = express();

app.use(cors())
app.use(bodyParser.json());



app.get('/' , (req , res)=>{
	res.send('it is working!');
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

app.listen(process.env.PORT || 3000 , ()=>{
	console.log(`app is running on port ${process.env.PORT}`);
})








