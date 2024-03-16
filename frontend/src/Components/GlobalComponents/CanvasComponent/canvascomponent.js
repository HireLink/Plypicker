/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './canvascomponent.css'
import { axiosInstance } from "../../../util/baseurl";
const Canvas = () => {

    const [accountStatus, setAccountStatus] = useState(null);
    const email = localStorage.getItem("userEmail")
    const fetchUserData = async () => {
        try {
            const response = await axiosInstance.get('/api/getuserdata', {
                params: {
                    email
                }
            });
            console.log(response);
            if (response) {
                setAccountStatus(response.data.accountStatus);
            }
        } catch (error) {
            // Handle error
        }
    };

    useEffect(() => {
        fetchUserData();
    }); // Empty dependency array to execute only once on component mount


    return (
        <div className="onesidecontainer">
            <div className='side-canvas'>
                <button className='btn btn-secondary'><Link to="/dashboard">Dashboard</Link></button>
                <button className='btn btn-secondary'><Link to="/products">Products</Link></button>

                {accountStatus === "Admin" ?
                    <>
                        <button className='btn btn-secondary'><Link to="/reviewproduct">Update Request</Link></button>
                        <button className='btn btn-secondary'><Link to="/userstatus">Users Status</Link></button>
                    </>
                    : <button className='btn btn-secondary'><Link to="/memberupdatedproduct">My Requests</Link></button>}

            </div>
        </div>
    );
}

export default Canvas;