const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const {qraphqlHTTP, graphqlHTTP} = require('express-graphql');

const config = require("./config/config.json");

const app = express();

app.use(bodyParser.json());

app.use(cors());


const userSchema = require('./graphql/users/usersSchema');
const usersResolver = require('./graphql/users/usersResolver');


//graphql

app.use(
    '/graphql',
    graphqlHTTP({
        schema:userSchema , 
        rootValue:usersResolver,
        graphiql:true,
    })
)

app.listen(process.env.PORT || 3000,console.log("Server Running"))

app.get('/',(req,res)=>res.send('Backend'));

mongoose.connect(
    `mongodb+srv://${config.username}:${config.password}@cluster0.phauk.mongodb.net/${config.dbname}?retryWrites=true&w=majority`,
    {
        useUnifiedTopology:true,
        useNewUrlParser:true,
    }
).then(()=>{
    console.log("Connected to mongo")
}).catch((err)=>console.log(err));