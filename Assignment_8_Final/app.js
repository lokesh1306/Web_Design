const express = require('express')
const mongoose=require('mongoose')
const url='mongodb://localhost:27017/Assignment'
const port=8080
const bcrypt=require('bcrypt')
const { request } = require('express')
const User=require("./model/user")

const app=express() //Exported the express in line 1 the express functioanlity is assignmed to a variable app.

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
            let old_name = req.body.old_name;
            let old_password = req.body.old_password;
            let new_name = req.body.new_name;
            let new_password = req.body.new_password;
            
            User.findOne({email: email} , (err,data) => {
                if(err){
                    return res.json({"message":"Error on finding user"});
                }else if(!data){
                    return res.json({"messgae":"Email ID not found in the database, enter a valid email ID"})
                }
                User.findOne({name: old_name} , (err,data) => {
                    if(err){
                        return res.json({"message":"Error on finding user"});
                    }else if(!data){
                        return res.json({"messgae":"Old name doesn't match with the name in the database"})
                    }
                
                bcrypt.compare(old_password, data.password , function(err,result){
                    if(err){
                        return res.json({"message":"Error on bcrypt"});
                    }
                    else if(!result){
                        return res.json({"message":"Old password doesn't match with the password in the database"});
                    }
                    var regexName = /^[a-zA-Z]+ [a-zA-Z]+$/
                    var regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
                    if(!new_name.trim().match(regexName)){
                        res.status(400);
                        return res.json({"message":"Name input does not match"});
                   } else if (!new_password.trim().match(regexPassword)){
                        res.status(400);
                        return res.json({"message": "Please enter minimum eight characters, at least one lowercase and uppercase letter"});
                   } 

                    bcrypt.hash(req.body.new_password, 12,function(err,new_hash){
                        if(err){
                            return res.json({"message":"Failed on hashing password after changing it"});
                        }
                        User.findOneAndUpdate({email: email},
                            {$set:{name: new_name, password: new_hash}},
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
        })
            
        });
        
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

app.listen(port,function(){
console.log("Server staterd, accessible on port 8080")
})




//app.get("/user/getAllUsers",getAllUsers);
//app.delete("/user/deleteUser/:id",deleteUser);
//app.put("/user/editUser/:id",updateUser);



