const express=require('express');
const app=express();
//const cors = require('cors');
const path=require('path');
const port=3000;
const productRouter = require('./routes/productRouter');

//app.use(cors());
app.use(express.json());
//console.log(path.join(__dirname,'../client'));
//midleware
//app.use(express.static(path))

const staticPath=(path.join(__dirname,'../client'));
app.use(express.static(staticPath));

app.get('/',(req,res)=>{
    res.send("Its working");
})

//login part
let db = [
    { id: 1, username: 'John', password: '111' },
    { id: 2, username: 'Edward', password: '222' }
  ];

  app.post('/login', (req, res, next) => {

    
  const user = db.find(user => user.username === req.body.username && user.password === req.body.password);
  if (user) {


    const accessToken = `${user.id}-${user.username}-${Date.now().toString()}`;
    const userInfo = user.username;
    res.json({ accessToken, userInfo });
    console.log(res.json());
    //res.json({ accessToken: `${user.id}-${user.username}-${Date.now().toString()}`,userInfo: `${user.username}`})
  } else {
    res.json({ error: 'Invalid username and password!' });
    // throw new Error('dfdfdf');
  }
});
// app.use((req, res, next) => {
//   const auth = req.headers.authorization;
//   // console.log();
//   console.log("I am in now server Authencation");
//   const token = auth.split(' ')[1]
//   if (token === 'null') {
//     res.json({ error: 'No Access Token' });
//   } else {
//     req.user = token.split('-')[0];
//     next();
//   }
// })

//product 

app.use('/products', productRouter);


app.listen(port,()=>{
    console.log(`Listen to the port${port}`);
})