import React from "react";
import { BrowserRouter, Route } from "react-router-dom"
import Header from './components/Header'
import ListProduct from './components/admin/ListProduct'
import Details from './components/admin/Details'
import CreateProduct from './components/admin/CreateProduct'
import EditProduct from './components/admin/EditProduct'

import Signup from './components/login/signup'
import Signin from './components/login/signin'


function App() {

  return (
    <BrowserRouter>
       <Header />
      <div className="container">
       
        <Route path="/" exact component={ListProduct}/>
        <Route path="/products/details/:id" component={Details}/>
        <Route path="/products/create" component={CreateProduct}/>
        <Route path="/products/edit/:id" component={EditProduct}/>
        <Route path="/users/signin" component={Signin}/>
        <Route path="/users/signup" component={Signup}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
