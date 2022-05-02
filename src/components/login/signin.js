import React, { useState } from "react";
import axios from "axios"


function Signin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const Signin = (e) => {
        e.preventDefault();
        console.log(email + " " + password)
        const data = {
            email: email,
            password: password
           
          };
        console.log(data)
        
    }
    return (
        <div className="">
            <h2 className="text-center">Sign In</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail">Email: </label>
                    <input type="email"
                        className="form-control"
                        id="exampleInputEmail"
                        placeholder="Enter email"
                        onChange={(e) => {
                            setEmail(e.target.value)
                          }}
                        required
                    />

                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword">Password: </label>
                    <input type="password"
                        className="form-control"
                        id="exampleInputPassword"
                        placeholder="Enter password"
                        onChange={(e) => {
                            setPassword(e.target.value)
                          }}
                        required
                    />

                </div>




                <button onClick={Signin} className="btn btn-primary">Sign In</button>
            </form>
            <div className="text-center">
                <span style={{color: "#555"}}>Haven't had an account ? </span>
                <a href="/users/signup" style={{color: "green"}} className="text-capitalize">Sign up please !</a>
            </div>              
        </div>
    );
}

export default Signin;
