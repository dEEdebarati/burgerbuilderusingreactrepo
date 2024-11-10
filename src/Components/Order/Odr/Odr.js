import React from 'react';

const Odr = props => {
   // console.log(props);
   const ingredientSummary = props.order.ingredients.map(item=>{
    return(
        <sapn style = {{
            border:"1px solid grey",
            
            borderRadius:"7px",
            padding:"5px",
            marginRight:"10px",
        }} key = {item.type}>{item.amount} x <span style = {{textTransform:"capitalize"}}>{item.type}</span></sapn>
    )
   })
  return (
    <div style = {{
        border:"1px solid grey",
        boxShadow:"1px 1px #888888",
        borderRadius:"7px",
        padding:"20px",
        marginBottom:"10px",
    }}>
        <p> Order Number:{props.order.id}</p>
        <p>Delivery Address:{props.order.customer.deliveryAddress}</p>
        <hr/>
        {ingredientSummary}
        <hr/>
        <p>Total price:{props.order.price} BDT</p>

    </div>
  )
}

export default Odr;