/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import './navbarcomponent.css'
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../util/baseurl";

const Navbar = () => {
    const navigate = useNavigate()

    const [accountStatus, setAccountStatus] = useState(null);
    // Retrieve email from localStorage
    const userEmail = localStorage.getItem("userEmail");

    // Extract name from email by removing '@gmail.com'
    const atIndex = userEmail.indexOf('@');
    const userName = atIndex !== -1 ? userEmail.slice(0, atIndex) : userEmail;

    // Use the extracted userName in your code
    // For example, console.log(userName);

    const fetchUserData = async () => {
        try {
            const response = await axiosInstance.get('/api/getuserdata', {
                params: {
                    email: userEmail
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
    }, []); // Empty dependency array to execute only once on component mount

    const handlelogout = () => {
        localStorage.removeItem("token");
        navigate('/login')
    }
    return (
        <div>
            <div>
                <nav className="navbar bg-body-tertiary" style={{ backgroundColor: "beige" }}>
                    <div className="container-fluid">
                        <Link class="navbar-brand d-flex" to="/dashboard">
                            {accountStatus === "Member" ?
                                <div className="accountnamecontainer">
                                    <h4 className='navhirestyle'>Welcome<span className='navinstyle'>{userName}</span></h4>
                                    <p className="accounttype">(Member)</p>
                                </div>
                                :
                                <div className="accountnamecontainer">
                                    <h4 className='navhirestyle'>Welcome<span className='navinstyle'>{userName}</span></h4>
                                    <p className="accounttype">(Admin)</p>
                                </div>
                            }
                        </Link>
                            <button className="btn btn-outline-success me-2" onClick={handlelogout}>
                                <Link className="dropdown-item">Logout</Link>
                            </button>
                        </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;