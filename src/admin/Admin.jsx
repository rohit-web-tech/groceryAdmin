import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const { TabPane } = Tabs;
import "./style.scss"
const Admin = () => {
    return (
        <div id="admin-panel">
            <h1>Admin Panel</h1>
            <Tabs defaultActiveKey="1">
                <TabPane tab="ORDERS" key="1">
                    <Orders />
                </TabPane>
                <TabPane tab="PRODUCTS" key="2">
                    <Products />
                </TabPane>
                <TabPane tab="ADD PRODUCTS" key="4">
                    <AddProduct />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Admin;

export function Orders() {
    const [orders, setorders] = useState([]);

    const outForDelievery=(orderId)=>{
        fetch('https://grocerystore-oaf1-qgsr.onrender.com/outForDelievery',{
            "method" : "POST" ,
            "body" : JSON.stringify({orderId}),
            "headers" : {
                "content-type" : "application/json"
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.message === "success") {
                    setorders(res.orders);
                    console.log(res.orders);
                } else {
                    alert(res.message);
                }
            }).catch(err => console.log(err));
    }

    const deliever=(orderId)=>{
        fetch('https://grocerystore-oaf1-qgsr.onrender.com/deliever',{
            "method" : "POST" ,
            "body" : JSON.stringify({orderId}),
            "headers" : {
                "content-type" : "application/json"
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.message === "success") {
                    setorders(res.orders);
                    console.log(res.orders);
                } else {
                    alert(res.message);
                }
            }).catch(err => console.log(err));
    }
    useEffect(() => {
        fetch('https://grocerystore-oaf1-qgsr.onrender.com/getAllOrders')
            .then(res => res.json())
            .then(res => {
                if (res.message === "success") {
                    setorders(res.orders);
                    console.log(res.orders);
                } else {
                    alert(res.message);
                }
            }).catch(err => console.log(err));
    }, [])
    return (
        <div className="container-box">
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Sr.No.</th>
                        <th>Procduct</th>
                        <th>Quantitiy</th>
                        <th>Customer Name</th>
                        <th>Email</th>
                        <th>Contact No</th>
                        <th>Payment Id</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((order, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{order?.productName}</td>
                                    <td>{order?.productQuantity}</td>
                                    <td>{order?.userName}</td>
                                    <td>{order?.userEmail}</td>
                                    <td>{order?.userContact}</td>
                                    <td>{order?.paymentId}</td>
                                    <td>{order?.status}</td>
                                    <td>
                                        {
                                            order?.status=="delievered" ? "PROCESS COMPLETED" :
                                        (<Button variant="success" onClick={()=>{
                                        if(order?.status=="processing"){
                                            outForDelievery(order?._id);
                                        }else if(order?.status=="out for delievery"){
                                            deliever(order?._id);
                                        }
                                    }}>{order?.status=="processing"?"Out For Delievery":"Deliever"}</Button>)}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export function Products() {
    const [products, setproducts] = useState([]);

    const removeProuct = (productId) =>{
        fetch('https://grocerystore-oaf1-qgsr.onrender.com/removeProduct',{
            "method" : "DELETE" ,
            "body" : JSON.stringify({productId}),
            "headers" : {
                "content-type" : "application/json"
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.message === "success") {
                    setproducts(res.products);
                } else {
                    alert(res.message);
                }
            }).catch(err => console.log(err));
    }

    useEffect(() => {
        fetch('https://grocerystore-oaf1-qgsr.onrender.com/getProductsDetail')
            .then(res => res.json())
            .then(res => {
                setproducts(res.products);
                console.log(res.products);
            }).catch(err => console.log(err));
    }, [])
    return (
        <div className="container-box">
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Sr.No.</th>
                        <th>Product Id</th>
                        <th>Product Name</th>
                        <th>Product Category</th>
                        <th>Price</th>
                        <th>Remove Product</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((Product, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{Product?._id}</td>
                                    <td>{Product?.productName}</td>
                                    <td>{Product?.productCategory}</td>
                                    <td>{Product?.productPrice}</td>
                                    <td><Button variant="danger" onClick={()=>{removeProuct(Product._id)}}>REMOVE</Button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}


export function AddProduct() {
    const [ProductData, setProductData] = useState({
        ProductName: "",
        ProductPrice: "",
        ProductCategory: "",
        Unit: "",
        imageUrl: ""
    });
    let handleProductInput = (e) => {
        setProductData({ ...ProductData, [e.target.name]: e.target.value });
    }
    let handleproductsubmit = (e) => {
        e.preventDefault();
        fetch('https://grocerystore-oaf1-qgsr.onrender.com/addNewProduct', {
            "method": "POST",
            "body": JSON.stringify({ProductData}),
            "headers": {
                "content-type": "application/json"
            }
        }).then(res => res.json())
            .then(res => {
                console.log(res)
                console.log(res.message)
                if (res.message === "success") {
                    setProductData({
                        ProductName: "",
                        ProductPrice: "",
                        ProductCategory: "",
                        Unit: "",
                        imageUrl: ""
                    });
                    alert("Product saved");
                } else {
                    alert(res.message);
                }
            }).catch(err => console.log(err))
    }
    return (
        <Form onSubmit={handleproductsubmit}>
            <fieldset>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="disabledTextInput">Product Name</Form.Label>
                    <Form.Control id="disabledTextInput" placeholder="Enter Product Name" required onChange={handleProductInput} value={ProductData.ProductName} name="ProductName" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="disabledTextInput">Category</Form.Label>
                    <Form.Control id="disabledTextInput" placeholder="Enter Product Category" required onChange={handleProductInput} value={ProductData.ProductCategory} name="ProductCategory" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="disabledTextInput">Price</Form.Label>
                    <Form.Control id="disabledTextInput" placeholder="Product Price" required onChange={handleProductInput} value={ProductData.ProductPrice} name="ProductPrice" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="disabledTextInput">Per</Form.Label>
                    <Form.Control id="disabledTextInput" placeholder="Price Per Unit" required onChange={handleProductInput} value={ProductData.Unit} name="Unit" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="disabledTextInput">Image Url</Form.Label>
                    <Form.Control id="disabledTextInput" placeholder="Enter Image Url" required onChange={handleProductInput} value={ProductData.imageUrl} name="imageUrl" />
                </Form.Group>
                <Button type="submit">Submit</Button>
            </fieldset>
        </Form>
    )
}
