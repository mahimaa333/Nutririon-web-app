import React, { Component } from 'react'

export default class Food extends Component {

    constructor(props){
        super(props);
        this.state = {
             foods:[],
             searchedFoods:[],
             currentFoodObj:{
                name:"-",
                calories:0,
                protien:0,
                carbs:0,
                fats:0,
                fibre:0,
                weight:100,
             }
        }
    }

    componentDidMount() {
        fetch("http://localhost:4000/food") 
        .then((response => response.json()))
        .then((foodsResponse) => {
            this.setState({foods:foodsResponse.foods});
        })
        .catch((err) => {
            console.log(err);
        })
    }

    selectFood(food){
        this.setState({currentFoodObj:food});
    }

    calculateChanges(weightValue){
        let weight = Number(weightValue)
        if(weight!==0){
            let currFood = this.state.currentFoodObj;
            currFood.calories = Number((currFood.calories*weight)/currFood.weight);
            currFood.protien = Number((currFood.protien*weight)/currFood.weight);
            currFood.carbs = Number((currFood.carbs*weight)/currFood.weight);
            currFood.fats = Number((currFood.fats*weight)/currFood.weight);
            currFood.fibre = Number((currFood.fibre*weight)/currFood.weight);
            currFood.weight = Number(weight);

            this.setState({currentFoodObj:currFood});
        }

    }

    searchFood(value){
        if(value!==""){
            let searchedArray = this.state.foods.filter((food,index)=>{
                return food.name.toLowerCase().includes(value.toLowerCase());
            })
    
            this.setState({searchedFoods: searchedArray});
        }
        else{
            this.setState({searchedFoods:[]});
        }

    }

    render() {
        return (
            <div className="container">
                <div className="form-group" style={{marginTop:"30px"}}>
                    <input className="form-control" onChange={(event)=>{
                        this.searchFood(event.target.value)
                    }} placeholder="Search Food"/>
                </div>
                <div className="search-result">
                    {
                        this.state.searchedFoods.map((currentFood,index)=>(
                            <div className="result" style={{cursor:"pointer", padding:"10px"}} onClick={()=>{
                                this.selectFood(currentFood);
                            }} key={index}>
                                {currentFood.name}
                            </div>
                        ))
                    }
                </div>

                <div className="product-display">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Calories</th>
                            <th>Protien</th>
                            <th>Carbs</th>
                            <th>Fats</th>
                            <th>Fibre</th>
                            <th>Weight</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.state.currentFoodObj.name}</td>
                                <td>{this.state.currentFoodObj.calories.toFixed(2)}</td>
                                <td>{this.state.currentFoodObj.protien.toFixed(2)}</td>
                                <td>{this.state.currentFoodObj.carbs.toFixed(2)}</td>
                                <td>{this.state.currentFoodObj.fats.toFixed(2)}</td>
                                <td>{this.state.currentFoodObj.fibre.toFixed(2)}</td>
                                <td>
                                    <input type="number" defaultValue={this.state.currentFoodObj.weight}
                                    onChange={(event)=>{
                                        this.calculateChanges(event.target.value);
                                    }
                                     }/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        )
    }
}
