import React, { Component, useId } from 'react';
import { Button,Modal,ModalBody } from 'reactstrap';
//import { withRouter } from 'react-router-dom'; 
import { connect } from 'react-redux';
import axios from 'axios';
import Spinner from '../../Spinner/Spinner';
import { resetIngredients } from '../../../redux/actionCreators';

const mapStateToProps = state =>{
  return{
    ingredients:state.ingredients,
    totalPrice:state.totalPrice,
    purchasable:state.purchasable,
    token: state.token,
    userId: state.userId,
  }
}
const mapDispatchToProps = dispatch=>{
  return{
    resetIngredients:() =>dispatch(resetIngredients()),
  }
}
class Checkout extends Component{
  state = {
    values:{
      deliveryAddress:"",
      phone:"",
      paymentType:"Cash On Delivery",
    },
    isLoading:false,
    isModalOpen:false,
    modalMsg:"",
  }
  goBack = () => {
    this.props.history.goBack("/");
  }

  inputChangeHandler = (e) =>{
    this.setState({
      values:{
        ...this.state.values,
        [e.target.name] : e.target.value,
      }
    })
  }
  submitHandler = () =>{
    this.setState({isLoading:true})
    const order = {
      ingredients:this.props.ingredients,
      customer:this.state.values,
      price:this.props.totalPrice,
      orderTime:new Date(),
      userId:this.props.userId
    }
    axios.post("https://burger-builder-513e0-default-rtdb.asia-southeast1.firebasedatabase.app/order.json?auth=" + this.props.token,order)
    .then(res=>{
      if(res.status===200){
        this.setState({
          isLoading:false,
          isModalOpen:true,
          modalMsg:"Order placed successfully."
        })
        this.props.resetIngredients();
      }else{
        this.setState({
          isLoading:false,
          isModalOpen:true,
          modalMsg:"Something went wrong."})

      }
    })
    .catch(err =>{
      this.setState({isLoading:false,
        isModalOpen:true,
        modalMsg:"Something went wrong."});
    } )
  
    console.log(order);

  }
  render(){
    //console.log(this.props.purchasable);
    let form = (<div>
      <h4 style={{
          border:"1px solid grey",
          boxShadow:"1px 1px #888888",
          borderRadius:"1px",
          padding:"20px",
        }}>Payment:{this.props.totalPrice}</h4>

        <form style={{
          border:"1px solid grey",
          boxShadow:"1px 1px #888888",
          borderRadius:"1px",
          padding:"20px",
        }}>
          <textarea name = "deliveryAddress" value = {this.state.values.deliveryAddress} className='form-control' placeholder='Your delivery address' onChange={(e)=>this.inputChangeHandler(e)}></textarea>
          <br/>
          <input name = "phone" className='form-control'value={this.state.values.phone} placeholder='Your phone number'onChange={(e)=>this.inputChangeHandler(e)}/>
          <br/>
          <select name = "paymentType" className='form-control'value={this.state.values.paymentType} placeholder = "Payment method" onChange={(e)=>this.inputChangeHandler(e)}>
            <option value="Cash on delivery" >Cash On Delivery</option>
            <option value="Bkash" >Bkash</option>

          </select>
          <option value="Cash on delivery" >Cash On Delivery</option>
          <Button style = {{backgroundColor:"#D70F64"}} className= "mr-auto" onClick = {this.submitHandler} disabled = {this.props.purchasable}>
            Order Now</Button>
            
          <Button color = "secondary" className = "ml-1" onClick = {this.goBack}>Cancel</Button>

        </form>
    </div>)
    return(
      
      <div>
        {/* console.log(this.props.purchasable); */}
        {this.state.isLoading ? <Spinner/>:form}
        <Modal isOpen = {this.state.isModalOpen} onClick = {this.goBack}>
          <ModalBody>
            <p>{this.state.modalMsg}</p>
          </ModalBody>

        </Modal>
      </div>
    )
  }
}

//export default withRouter(Checkout);
export default connect(mapStateToProps,mapDispatchToProps) (Checkout);