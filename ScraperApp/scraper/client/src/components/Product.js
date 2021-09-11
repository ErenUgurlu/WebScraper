import React, { Component } from 'react'



export default class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: []
        };
    }

    async getProduct(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'

            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
        const product = await response.json();

        this.setState({ product: product });

    }

    componentDidMount() {
        this.getProduct('/getProduct', this.props.product);
        document.getElementById("products").classList.remove('active');
        document.getElementById("input").classList.remove('active');
        document.getElementById("products").classList.add('active');
    }
    render() {
        return (
            <div>
                {
                    this.state.product.map(product => {
                        return (
                            <div key={product.id}>
                                <h1>{product.name}</h1>
                                <img alt={product.name + " image"} src={product.img} style={{ width: "400px", height: "400px", margin: "3px" }}></img>
                                <h1>{product.price}</h1>
                                <a className="btn btn-dark " type="button" target="_blank" href={product.url}>Visit Website</a>
                                <h5 style={{ marginTop: "20px" }}>ID in Database:{product.id}</h5></div>
                        )
                    })
                }
            </div>
        )
    }
}
