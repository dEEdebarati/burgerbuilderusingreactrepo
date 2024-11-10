import React ,{Component}from "react";
import Burger from "./Burger/Burger";
import Controls from "./Controls/Controls";
import {Modal,ModalBody,ModalFooter, ModalHeader, Button} from "reactstrap";
import Summary from "./Summary/Summary";
import {Redirect} from "react-router-dom";
//import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { connect } from "react-redux";
import { addIngredient,removeIngredient,updatePurchaseable } from "../../redux/actionCreators";

const mapStateToProps = state =>{
    return {
        ingredients:state.ingredients,
        totalPrice:state.totalPrice,
        purchaseable:state.purchaseable,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        addIngredient:(igtype)=>dispatch(addIngredient(igtype)),
        removeIngredient:(igtype)=>dispatch(removeIngredient(igtype)),
        updatePurchaseable : () => dispatch(updatePurchaseable()),

    }
}
 class BurgerBuilder extends Component{
    state={
        
        //totalPrice : 80,
        modalOpen:false,
        // purchaseable:false,
        // onClickCheckout:false
    }
    // updatePurchaseable = ingredients =>{
    //     const sum = ingredients.reduce((sum,element)=>{
    //         return sum + element.amount;

    //     },0);
    //     this.setState({purchaseable: sum>0})
    // }
    addIngredientHandle = type =>{
        //console.log(type)
        this.props.addIngredient(type);
        this.props.updatePurchaseable();
    }
    removeIngredientHandle = type =>{
        this.props.removeIngredient(type);
        this.props.updatePurchaseable();



    }
    toggleModal = ()=>{
        this.setState({
            modalOpen:!this.state.modalOpen
        })
    }

    handleCheckout = () =>{
        this.setState({
            onClickCheckout:true
        })
    }
    render(){
        return(
            <div>
                 <div className = "d-flex flex-md-row flex-column">
                <Burger ingredients = {this.props.ingredients}/>
                <Controls 
                ingredientAdded = {this.addIngredientHandle}
                ingredientRemoved = {this.removeIngredientHandle}
                price = {this.props.totalPrice}
                toggleModal = {this.toggleModal}
                purchaseable = {this.props.purchaseable}

                />
            </div>
            <Modal isOpen = {this.state.modalOpen}>
            <ModalHeader>Your Order Summary</ModalHeader>
            <ModalBody>
                <h5>Total Price: {this.props.totalPrice.toFixed(0)} BDT</h5>
                <Summary ingredients = {this.props.ingredients}/>
            </ModalBody>
            <ModalFooter>
                <Button style = {{backgroundColor:"#D70F64"}} onClick = {this.handleCheckout}>Continue to chekout</Button>
                <Button color = "secondary" onClick = {this.toggleModal}> Cancel</Button>

            </ModalFooter>
            {this.state.onClickCheckout && <Redirect to = "/checkout" replace = {true}/>}
            </Modal>
            </div>
           
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder);