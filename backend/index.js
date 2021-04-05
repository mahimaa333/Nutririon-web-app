const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const nutritionApp = express();

nutritionApp.use(express.json());
nutritionApp.use(cors());

// schema for foods collection
const foodSchema = new mongoose.Schema({
    name:String,
    calories:Number,
    protien:Number,
    carbs:Number,
    fats:Number,
    fibre:Number,
    weight:Number,
})

const foodModel = new mongoose.model("foods", foodSchema);

//mongodb connection
mongoose.connect("mongodb://127.0.0.1:27017/nutrition",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("connected");
})

nutritionApp.post("/food/create", (req,res) =>{
    const food = req.body;
    let foodObj = new foodModel(food);
    foodObj.save().then(()=>{
        res.send({status: "food stored"});
    });
}) 

nutritionApp.get("/food",async (req,res) => {
    let foods = await foodModel.find(); 
    res.send({foods:foods});
})

nutritionApp.listen(4000);

