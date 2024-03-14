/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import './canvascomponent.css'
const Canvas = () => {

    
    return (
        <div className="onesidecontainer">
            <div className='side-canvas'>
                <button className='btn btn-secondary'><Link  to="/dashboard">Dashboard</Link></button>
                <button className='btn btn-secondary'><Link to="/products">Products</Link></button>
                <button className='btn btn-secondary'><Link to="/users">Users</Link></button>
            </div>
        </div>
    );
}

export default Canvas;