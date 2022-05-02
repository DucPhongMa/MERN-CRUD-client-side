import React, { useState,useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


function Details() {

  const [product, setProduct] = useState({});
  const { id } = useParams();
  
  useEffect(() => {
    
    axios.get(`http://localhost:5000/products/details/${id}`).then((res) => {
      const responseTodo = res.data;
      setProduct(responseTodo);
     
    });
  }, [id]);

  return (
    <div className="">
      <img src={`/uploads/${product.Image}`} style={{width: "200px", height: "200px"}}/>
      <h1>{product.Name}</h1>
      <h1 dangerouslySetInnerHTML = {{__html: product.Description}}></h1>
      <h1>{product.Price}</h1>
      <h1>{product.Quantity}</h1>
    </div>
  );
}

export default Details;
