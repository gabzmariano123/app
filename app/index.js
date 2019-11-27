const express = require('express');
const app = new express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const urlEncoded = bodyParser.json();


const cors = require('cors');
app.use(cors());

mongoose.connect('mongodb+srv://api:api@cluster0-yslzu.mongodb.net/test?retryWrites=true&w=majority', 
{ 
    useUnifiedTopology: true, 
    useNewUrlParser: true
});

const User = mongoose.model('user',{
    name: String,
    age: Number
});


app.use(express.static(__dirname+ '/dist/app')); 
app.use(bodyParser.json());


app.get('/',(req, res) => {
    res.sendFile(__dirname + 'dist/app/index.html');
});

app.get('/user', (req, res) => {
    User.find({},(err, data) => {
    if(err) res.json({"msg":"Invalid Request"});
        res.json(data);
    });
});

app.post('/user', urlEncoded, (req, res) => {
    var user = new User({
        name: req.body.name,
        age: req.body.age,
    });
    user.save((err, data) => {
        if(err) res.json({"msg":"Invalid Request"});
        res.json(data);
    });
});

app.delete('/user/:id', (req, res) => {
    User.deleteOne({_id:req.params.id},(err,data) => {
    if(err) res.json({msg:'Invalid Request'});
        res.json(data);
    });
});

const PORT = process.env.PORT || 80;

app.listen(PORT,() => {
    console.log(`Serve running at port ${PORT}`);
});


// app.get('/', (re1,res) =>{ 
//     res.sendFile(__dirname+ '/dist/app/index.html') 
// });
 
// const PORT = process.env.PORT || 80;
// app.listen(PORT, ()=>{
//      console.log(`Server runnning at port ${PORT}`); 
//  });     
