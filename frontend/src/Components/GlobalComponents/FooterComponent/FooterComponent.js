// eslint-disable-next-line
import React from "react"
import { Link } from 'react-router-dom';
import './Footer.css'


const Footer = () => {
    return (
        <div>
            <div className="designddeveloped" >
                <p style={{ margin: 0 }}>© All Rights Reserved | Designed And Developed By</p>
                <Link to='https://www.thecapitalhub.in/'>PlyPicker</Link>
            </div>

        </div>
    )
}

export default Footer