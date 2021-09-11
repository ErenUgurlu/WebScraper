import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class Products extends Component {


    constructor() {
        super();
        this.state = {
            datas: []
        }
        this.getProducts = this.getProducts.bind(this);

    }
    async getProducts(url = '') {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        });
        const jsonData = await response.json();
        this.setState({ datas: jsonData });

    }

    componentDidMount() {
        this.getProducts('/getProducts');
        document.getElementById("products").classList.remove('active');
        document.getElementById("input").classList.remove('active');
        document.getElementById("products").classList.add('active');
    }

    render() {
        
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <table className="table table-image">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.datas.map(product => {
                                    return (<tr key={product.id}>
                                        <th scope="row">{product.id}</th>
                                        <td className="w-25">
                                            <img src={product.img} className="img-fluid img-thumbnail" alt="img"></img>
                                        </td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td><Link to="/Product"><button className="btn btn-dark " onClick={()=>this.props.getProduct(product)} >Details</button></Link></td>
                                    </tr>)
                                })}
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
