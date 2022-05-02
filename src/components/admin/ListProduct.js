import React, { useState, useEffect } from "react";
import axios from "axios";

function ListProduct() {

  const [productList, setProductList] = useState([]);

  const getProducts = () => {
    axios.get(`http://localhost:5000/products`).then((res) => {
      const responseTodo = res.data;
      setProductList(responseTodo);
    });
  }
  useEffect(() => {
    getProducts()
  }, []);

  const onDelete = (id) => {
    axios.delete(`http://localhost:5000/products/delete/${id}`).then((res) => {
      alert('Deleted successfully');
      getProducts();
    })
  }

  const filterContent = (products, searchItem) => {
      const result = products.filter((product) => {
        return product.Name.toLowerCase().includes(searchItem.toLowerCase())
      })
  

      setProductList(result)
  }

  
  const handleTextSearch = (e) => {
    const searchItem = e.currentTarget.value;
    axios.get(`http://localhost:5000/products`).then((res) => {
        filterContent(res.data, searchItem)
    
    });
  }

  return (

    <div className="">

      <h1 className="text-center">List of Product</h1>
      <div className="row">
        <div className="col-lg-9 mb-2">
          <a className="btn btn-success" href="/products/create">Add new product</a>
        </div>
        
        <div className="search-form col-lg-3 mb-2">
          <div className="form-group">
            <input  type="text" 
                    name="name" 
                    className="form-control" 
                    id="search-input" 
                    placeholder="Enter keywords..." 
                    style={{ width: "200px" }} 
                    onChange={handleTextSearch}

            />



          </div>

        </div>
      </div>

      <table className="table table-striped table-sm">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col" className="text-center">Action</th>

          </tr>
        </thead>

        <tbody>
          {productList.map((product, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td><img src={`/uploads/${product.Image}`} style={{width: "80px", height: "80px"}}/></td>

                <a className="btn btn-link" href={`products/details/${product._id}`}>{product.Name}</a>
                <td dangerouslySetInnerHTML = {{__html: product.Description}}></td>
                <td>{product.Price}</td>
                <td>{product.Quantity}</td>
                <td className="text-center">
                  <a className="btn btn-warning" href={`/products/edit/${product._id}`}>
                    <i className="fa fa-edit"></i>&nbsp; Edit
                  </a>
                  &nbsp;
                  <a className="btn btn-danger" href="#" onClick={() => onDelete(product._id)}>
                    <i className="fa fa-times-circle"></i>&nbsp; Delete
                  </a>
                </td>
              </tr>)
          })}
        </tbody>

      </table>
    </div>
  );
}

export default ListProduct;
