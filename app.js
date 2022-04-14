const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const {qraphqlHTTP, graphqlHTTP} = require('express-graphql');

const config = require("./config/config.json");

const app = express();

app.use(bodyParser.json());

app.use(cors());



const axios =  require('axios')

app.route("/pdf").post((req,res)=>{
    const APIKey = "cc68NTIxNjoyMjI3OkdOUGtlV1ZoTndpSm5WYko"

    let config = {
        headers: {
          "X-API-KEY": APIKey,
        }
      }

    axios.post("https://api.apitemplate.io/v1/create?template_id=f2877b2b1ca0b40e&export_type=json&output_html=0&filename=yourtrip",
    req.body,config).then((result) => {
        return res.status(200).send(result.data)
    }).catch((err) => {
        console.log(err)
        return res.status(400).send(err)
    });
    

});


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