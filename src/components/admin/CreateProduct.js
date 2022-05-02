import React, { useState } from "react";
import axios from "axios";
import { setErrors } from './../admin/SetErrors'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function CreateProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [Image, setImage] = useState('');

  const [errors, setErrorss] = useState({});

  const validate = (name, description, price, quantity) => {
    const errors = setErrors(name, description, price, quantity);
    setErrorss(errors);
    return Object.values(errors).every((err) => err === "")

  }

  const AddToList = (e) => {
    e.preventDefault();
    if (validate(name, description, price, quantity)) {
      /*const data = {
        Name: name,
        Description: description,
        Price: price,
        Quantity: quantity,
        Image: Image
      };*/

      const formData = new FormData();

      formData.append("Name", name);
      formData.append("Description", description);
      formData.append("Price", price);
      formData.append("Quantity", quantity);
      formData.append("Image", Image);

      //console.log(data)
      axios.post(`http://localhost:5000/products/create`, formData)
        .then((res) => {
          if (res.data.createdProduct) {
            alert('created successfully')
          }
        })
    }

  }



  return (
    <div className="">
      <h2 className="text-center">Create a new product</h2>
      <form onSubmit={AddToList} encType="multipart/form-data">
        <div className="form-group">
          <label>Name of product</label>
          <input type="text"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter Product"
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

export default CreateProduct;
