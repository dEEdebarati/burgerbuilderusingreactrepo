import React, { Component } from 'react';
import Header from './Header/Header';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import { Route, Switch ,Redirect} from 'react-router-dom'; // Import Switch
import Checkout from './Order/Chekout/Checkout';
import Order from './Order/Order';
import Auth from './Auth/Auth';
import { connect } from 'react-redux';
import { authCheck } from '../redux/authActionCreators';
//import { logout } from '../redux/authActionCreators';
import Logout from './Auth/Logout';

const mapStateToProps = state =>{
  return{
    token:state.token,
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    authCheck : () => dispatch(authCheck()),
  }
}

class Main extends Component{
  componentDidMount(){
    this.props.authCheck();
  }
  render(){
    
      let routes = null;
      if(this.props.token === null){
        routes = (
          <Switch>
              <Route exact path = "/login" component={Auth}/>{/* Use component prop */}
              <Redirect to = "/login" />
          </Switch>
        )
      }else{
        routes = (
        <Switch> {/* Wrap your routes in Switch */}
        <Route exact path="/" component={BurgerBuilder} /> {/* Use component prop */}
        <Route exact path="/order" component={Order} /> 
        <Route exact path="/checkout" component={Checkout} /> {/* Use component prop */}
        <Route exact path="/logout" component={Logout} /> {/* Use component prop */}

        <Redirect to = "/" />
    
      </Switch>)
      }
      return (
        <div>
          <Header />
          <div className='container'>
            {routes}
          </div>
        </div>
      )
    }
  }


export default connect(mapStateToProps,mapDispatchToProps)(Main);
