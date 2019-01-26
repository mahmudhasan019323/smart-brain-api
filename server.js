const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const knex = require('knex');
const signup = require('./controllers/signup');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'Doraemonm019',
        database: 'smart-brain'
    }
});
app.use(cors());
app.use(bodyParser.json());

app.post('/signin', (req,res)=>{signin.handleSignin(req,res,bcrypt,db)});
app.post('/signup',(req,res)=> {signup.handleSignup(req,res,bcrypt,db)});
app.get('/profile/:id', (req,res)=>{profile.handleProfile(req,res,db)});
app.put('/image', (req,res)=>{image.handleImage(req,res,db)});
app.post('/imageurl', (req,res)=>{image.handleApiCall(req,res)});

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`app is running at port ${process.env.PORT}`);
});