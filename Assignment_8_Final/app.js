const express = require('express')
const mongoose=require('mongoose')
const url='mongodb://localhost:27017/Assignment'
const port=8080
const bcrypt=require('bcrypt')
const { request } = require('express')
const User=require("./model/user")
const jwt = require("jsonwebtoken");
const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

const app=express() //Exported the express in line 1 the express functioanlity is assignmed to a variable app.
const cors = require("cors");
app.use(cors());

mongoose.connect(url,{useNewUrlParser:true})
const con=mongoose.connection

//Middleware between request and response 
app.use(express.json()) //For parsing application/json body //Inbuilt function to  convert request ody to json format 

app.use(express.urlencoded({extended:false})); //For parsing url-encoded body


con.on('open',function(){
    console.log('connected via port 8080')
})
app.get("/",function(req,res){
    res.send("Hello")
})

app.post('/user/create', function(req, res) {

    var regexName = /^[a-zA-Z]+ [a-zA-Z]+$/
    var regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    var regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
   
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
  
    if(!name.trim().match(regexName)){
        res.status(400);
        res.json({"message":"Name is invalid, enter a valid first and last name"});
   } else if (!email.trim().match(regexEmail)){
         res.status(400);
         res.json({"message":"Email ID is invalid"});
    } else if (!password.trim().match(regexPassword)){
         res.status(400);
         res.json({"message": "Password: Please enter minimum eight characters, at least one lowercase, one uppercase and a number"});
    } else {
        bcrypt.hash(req.body.password, 12,function(err,hash){ 
            console.log(hash)
        if(err){
            res.status(500);
            res.json({"message": 'Hashing failed'});
        }  else{
            let userData={"name":req.body.name,"email":req.body.email,"password":hash}
            var newentry = new User(userData);
            newentry.save(function(err,obj){
            if(err) {
                console.log(err);
                console.log('Unable to create users. Try again!!!');
                res.status(500);
                res.json({"message": 'Failed to create users'});
            } else {
                res.status(200);
                res.json({"message":'User created successfully'});
            }
        });
        }   
        });
        
    }
  });
/*
app.post("/user/createUser",async function(req,res){
    console.log(req.body)
    try{
        var regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        var regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

        var email = req.body.email;
        var password = req.body.password;

        if(!email.trim().match(regexEmail)){
             res.status(400);
             res.json({"status":"failed","message":"Enter Valid Email"});
        } else if (!password.trim().match(regexPassword)){
             res.status(400);
             res.json({"status":"failed","message": "Please enter minimum eight characters, at least one lowercase and uppercase letter"});
        } else{
            let encry_password = await bcrypt.hash(req.body.password, 12);
            let userData={"email":req.body.email,"password":encry_password, "name":req.body.name}
            let newUser = new User(userData);
            await newUser.save()
            res.json({"status":"success",message:"user successfully created"})

    }   
}catch(e){
  console.log(e)
  res.json({"status":"failed",message:e})
}
});
*/
app.put('/user/edit', function(req, res) {
            let email = req.body.email;
            let name = req.body.name;
            let password = req.body.password;
            
            User.findOne({email: email} , (err,data) => {
                if(err){
                    return res.json({"message":"Error on finding user"});
                }else if(!data){
                    return res.json({"messgae":"Email ID not found in the database, enter a valid email ID"})
                }
                
                
                    var regexName = /^[a-zA-Z]+ [a-zA-Z]+$/
                    var regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
                    if(!name.trim().match(regexName)){
                        res.status(400);
                        return res.json({"message":"Name input does not match"});
                   } else if (!password.trim().match(regexPassword)){
                        res.status(400);
                        return res.json({"message": "Please enter minimum eight characters, at least one lowercase and uppercase letter"});
                   } 

                    bcrypt.hash(req.body.password, 12,function(err,new_hash){
                        if(err){
                            return res.json({"message":"Failed on hashing password after changing it"});
                        }
                        User.findOneAndUpdate({email: email},
                            {$set:{name: name, password: new_hash}},
                            {new: true}, (err, doc) => {
                                console.log(doc);
                                if(err){
                                    console.log("failed to update");
                                    res.json({"message":"Failed updating"});
                                }
                                if(doc==null){
                                    res.status(400);
                                    res.json({"message":"No record matched"});
                                }
                                else
                                {
                                  res.send(doc);
                                }  
                        });  
                    })

                })

            })
            
        
        app.delete('/user/delete',function(req, res){
              let email = req.body.email;

            User.findOne({email: email} , (err,data) => {
                if(err){
                    return res.json({"message":"Error on finding user"});
                }else if(!data){
                    return res.json({"message":"Email ID not found in the database, enter a valid email ID"})  
                }
                console.log(data)

                    User.findOneAndDelete({email: email}, function(err, doc){
                        if(err){
                            res.json({"message":"Delete functionality failed! try again!!!!"});
                        }
                        if(doc == null){
                          res.status(400);
                          res.json({"message":"No match"});
                        }
                        else{
                            res.status(200);
                            res.json({"message": "User deleted successfully"});
                        }
                    });
            })
              
        });

            app.get('/user/getAll', function(req, res) {
                User.find({},function(err, users) {
                    if (err) {
                         res.send(err);
                    } else {
                         res.status(200);
                         res.json(users);
                    }
                });
            });
            app.post("/login-user", async (req, res) => {
                const { email, password } = req.body;
              
                const user = await User.findOne({ email });
                if (!user) {
                  return res.json({ error: "User Not found" });
                }
                if (await bcrypt.compare(password, user.password)) {
                  const token = jwt.sign({ email: user.email }, JWT_SECRET);
              
                  if (res.status(201)) {
                    return res.json({ status: "ok", data: token });
                  } else {
                    return res.json({ error: "error" });
                  }
                }
                res.json({ status: "error", error: "InvAlid Password" });
              });


app.listen(port,function(){
console.log("Server staterd, accessible on port 8080")
})




//app.get("/user/getAllUsers",getAllUsers);
//app.delete("/user/deleteUser/:id",deleteUser);
//app.put("/user/editUser/:id",updateUser);



