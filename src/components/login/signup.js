import React, { useState } from "react";
import axios from "axios"


function Signup() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const Signup = (e) => {
        e.preventDefault();
        const data = {
            email: email,
            password: password
           
          };
          
          axios.post(`http://localhost:5000/users/signup`, data)
            .then((res) => {
              if (res.data.createdUser) {
                alert('successfully')
              }
            })
    }
    return (
        <div className="">
            <h2 className="text-center">Sign up</h2>
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




                <button onClick={Signup} className="btn btn-primary">Sign up</button>
            </form>

        </div>
    );
}

export default Signup;
