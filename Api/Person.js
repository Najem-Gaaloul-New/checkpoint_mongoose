const express = require('express')
const  mongoose  = require('mongoose')
const Person  = require('../db/person');
const Route =express.Router();



//Create and Save a Record of a Model:
Route.post('/',async (req,res)=>{
    
    const person= new Person(req.body);
    const personSaved= await person.save();
    try{

       res.status(200).json(personSaved);
    }
    catch{
        res.status(400).json('failed');
    }
});

// Create many People with Model.create() 
Route.post('/many',async (req,res)=>{
var arrayOfPeople = req.body;
 await Person.create (arrayOfPeople,(err)=>{
    if (err) console.log("opps erreur")
    else
    console.log("data added")
  }
  )
});

//Use model.find() to Search Your Database
  Route.get("person/:name", (req, res) => {
    console.log(req.params)
    Person.find({ name: req.params.name })
        .exec()
        .then((docs) => {
            console.log(docs);
            if ( docs[0]) {
                res.send(docs);
            } else res.send("<h1>Person not found!</h1>");
        });
});


//Use model.findOne() to Return a Single Matching Document from Your Database
Route.get("/food/:favoriteFoods",(req,res) => {
    Person.findOne({favoriteFoods:req.params.favoriteFoods}, function(err,result){
        if(err){
            res.send(err)
        }
        else {
            if(result){
                res.send(result);
            }
            else {
                res.send(`<h>il n y a pas de personne qui aime ${req.params.favoriteFoods}</h1>`);
            }
        }
    })
})

//Use model.findById() to Search Your Database By _id
Route.get("/id/:id",(req,res)=>{
    Person.findById({ _id:req.params.id},(err,result)=>{
        console.log(result);
        if(err){
            res.send("<h1>la personne que vous chercher n existe pas</h1>")
        }
        else {
            res.send(result);
        }
    });
});




//Perform Classic Updates by Running Find, Edit, then Save
function addHamb(food){
    let test=false;
    food.map((el)=>{
        if(el.toLowerCase()=== "hamburger"){
            test=true;
            return food;
        }
    });
    if (!test) food.push("Hamburger");
    return food;
}
Route.put("/updateFood/:id", (req, res) => {
    Person.findById({ _id: req.params.id }, (err, result) => {
        if (err) res.send("Error");
        else {
            addHamb(result.favoriteFoods);
            result.save(function (err) {
                if (err) console.error("ERROR!");
            });
            res.send(result);
        }
    });
});


//Perform New Updates on a Document Using model.findOneAndUpdate()
Route.put("/updateAge/:name",(req,res) =>{
    Person.findOneAndUpdate({ name: req.params.name }, { age: 20 }, { new: true })
    .then((docs) => res.send(docs))
    .catch((err) => res.send(err));
});

// Delete One Document Using model.findByIdAndRemove
Route.delete("/delete/:id",(req,res)=>{
    Person.findByIdAndDelete({_id:req.params.id},function(err,result){
        if(err){
            res.send(err);
        }
        else {
            res.send(`<h1>Removed user: ${result}`);
        }
    });
});

// MongoDB and Mongoose - Delete Many Documents with model.remove()
Route.delete("/deleteMary",(req,res)=>{
    Person.remove({name:"Mary"},(err,result)=>{
        if(err){
            res.send(err);
        }
        else res.send(result);

    });
});

// Chain Search Query Helpers to Narrow Search Results
Route.get("/burrito",(req,res) =>{
    Person.find({ favoriteFoods: "burrito" })
        .sort({ name: 1 })
        .limit(2)
        .select({ age: false })
        .exec((err, data) => {
            if (err) {
                res.send(err);
            } else {
                if (!data[0]) {
                    res.send("<h1>il n y a pas de person aime burrito</h1>");
                } else res.send(data);
            }
        });
});
 module.exports = Route;