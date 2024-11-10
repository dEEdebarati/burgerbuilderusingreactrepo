import React from 'react';
import "./Burger.css";
import Ingredient from '../Ingredient/Ingredient';

const Burger = props => {
    let ingredientArr = props.ingredients.map(item =>{
        let amountArr = [...Array(item.amount).keys()];
        return amountArr.map(_=>{
            return <Ingredient type = {item.type} key = {Math.random()}/>
        })
    })
    .reduce((arr,element)=>{
        return arr.concat(element);

    },[]);
    console.log(ingredientArr);

    if(ingredientArr.length === 0){
        ingredientArr = <p>Please add some ingredients.</p>
    }
  return (
    <div className='Burger'>
        <Ingredient type = "bread-top"/>
        {/* <Ingredient type = "cheese"/>
        <Ingredient type = "salad"/> */}
        {ingredientArr}
        <Ingredient type = "bread-bottom"/>

    </div>
  )
}

export default Burger;