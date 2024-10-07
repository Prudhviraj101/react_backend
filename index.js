const express=require('express');
const app = express();
const server=require('http').createServer(app);
const mysql=require("mysql");
const PORT=8086;
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const connection=mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'',
        database:'database1'
    }
)

connection.connect((err)=>{
    if(!err) {
        console.log("Database Connected...")
    }
    else{
        console.log("Error Connecting Database...."+err)
    }
});

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

  app.post('/signup',(req,res)=>{
    connection.query('SELECT * FROM `signupdata` where email="'+req.body.Email+'"',(err,row)=>{
        if(!err && row.length>0){
            res.send("user already exist");
        }
        else{
            connection.query('INSERT INTO `signupdata`(`firstname`, `lastname`, `email`, `password`, `gender`) VALUES("'+req.body.First+'","'+req.body.Last+'","'+req.body.Email+'","'+req.body.Password+'","'+req.body .gender+'")',(err,row)=>{
                if(!err){
                  res.send('user successfully logged in')
                }
                else{
                  console.log(err);
                }
        });
        }
    });
  });


  app.get('/getdata',(req,res)=>{
    connection.query('SELECT * FROM `signupdata`',(err,rows)=>{
        if(!err){
            res.send(rows)
        }
        else{
            res.send(err)
        }
    })
  })

 app.post('/login',(req,res)=>{
    connection.query('SELECT * FROM `signupdata` WHERE email="'+req.body.Email+'" and "'+req.body.Password+'"',(err,rows)=>{
        if(!err){
            res.send(rows)
        }
        else{
            console.log(err);
        }
    })
 })

 app.get('/edit/:id',(req,res)=>{
    connection.query('SELECT * FROM `signupdata` WHERE id="'+req.params.id+'"',(err,row)=>{
        if(!err){
            res.send(row)  
        }
        else{
            console.log(err)
        }
    })
 })



  server.listen(PORT,()=>{
    console.log('server running in '+PORT);
})