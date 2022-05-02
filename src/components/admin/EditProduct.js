import React, { useState, useEffect } from "react";
import axios from "axios";
import { setErrors } from './../admin/SetErrors'
import { useParams } from "react-router-dom";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function EditProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [Image, setImage] = useState('');

 
  const [errors, setErrorss] = useState({});
  const { id } = useParams();

  const validate = (name, description, price, quantity) => {
    const errors = setErrors(name, description, price, quantity);
    setErrorss(errors);
    return Object.values(errors).every((err) => err === "")

  }

  useEffect(() => {
    
    axios.get(`http://localhost:5000/products/details/${id}`).then((res) => {
      const responseTodo = res.data;
      setName( res.data.Name);
      setDescription( res.data.Description);
      setPrice( res.data.Price);
      setQuantity( res.data.Quantity);
      setImage(res.data.Image);

      console.log(responseTodo)
     
    });
  }, [id]);


  const Edit = (e) => {
    e.preventDefault();
    if (validate(name, description, price, quantity)) {
      /*const data = {
        Name: name,
        Description: description,
        Price: price,
        Quantity: quantity
      };
      console.log(data)*/

      const formData = new FormData();

      formData.append("Name", name);
      formData.append("Description", description);
      formData.append("Price", price);
      formData.append("Quantity", quantity);
      formData.append("Image", Image);

      axios.put(`http://localhost:5000/products/edit/${id}`, formData)
        .then(() => {         
            alert('Edited successfully')
  
        })
    }

  }

  return (
    <div className="">
      <h2 className="text-center">Edit products</h2>
      <form onSubmit={Edit} encType="multipart/form-data">
        <div className="form-group">
          <label>Name of product</label>
          <input type="text"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter email"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
            required
          />

          {errors.name && (
            <div className="text-danger">{errors.name}</div>
          )}

        </div>
        <div className="form-group">
          <label>Description</label>
          <CKEditor
            editor={ClassicEditor}
            data={description}
           
            onChange={(event, editor) => {
              const data = editor.getData();
              setDescription(data)
            }}
          

          />
          {errors.description && (
            <div className="text-danger">{errors.description}</div>
          )}
        </div>

        <div className="form-group">
          <label>Price</label>
          <input type="number"
            className="form-control"
            id="exampleInputEmail1"
            min="0"
            step="any"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value)
            }}
            required
          />

          {errors.price && (
            <div className="text-danger">{errors.price}</div>
          )}

        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input type="number"
            className="form-control"
            id="exampleInputEmail1"
            min="1"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value)
            }}
            required
          />

          {errors.quantity && (
            <div className="text-danger">{errors.quantity}</div>
          )}

        </div>

        <div className="form-group">
          <label>Image</label>
          <input type="file"
            filename="Image"
            className="form-control-file"
            id="Image"
           
            onChange={(e) => {
              setImage(e.target.files[0])
            }}
            required
          />

        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default EditProduct;
