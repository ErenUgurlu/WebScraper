import React, { Component } from 'react';

export default class InputPro extends Component {

    constructor() {
        super();
        this.state = {
            value: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.postData = this.postData.bind(this);

    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    async postData(url = '', data = { }) {
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

        const product = response.json();
        this.props.getProduct(product);

        
    }



    render() {
        return (
            <div>
                <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">

                    <div className="cover inner">
                        <h1 className="cover-heading">Please Enter URL</h1>
                        <li style={{ listStyleType: 'none' }}><input value={this.state.value} onChange={this.handleChange} className="lead m-1" id="input"></input></li>
                        <li style={{ listStyleType: 'none' }}><button onClick={() => this.postData('/scrape', { url: this.state.value })} className="btn btn-dark m-1">Scrape</button></li>
                    </div>
                </div>
            </div>

        )
    }
}
