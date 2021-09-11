import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

export default class InputPro extends Component {

    constructor() {
        super();
        this.changeClass = this.changeClass.bind(this);

    }
    changeClass(id) {
        document.getElementById("products").classList.remove('active');
        document.getElementById("input").classList.remove('active');
        document.getElementById(id).classList.add('active');
    }

    render() {
        return (
            <div >
                <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
                    <header className="masthead mb-auto">
                        <div>
                            <h3 className="masthead-brand">Scrapper</h3>
                            <nav className="nav nav-masthead justify-content-center">
                                
                                <NavLink className="nav-link active" id="input" onClick={() => this.changeClass("input")} to="/" >Input</NavLink>
                                <NavLink className="nav-link" id="products" onClick={() => this.changeClass("products")} to="/Products">Products</NavLink>
                                
                            </nav>
                        </div>
                    </header>

                </div>
            </div>

        )
    }
}