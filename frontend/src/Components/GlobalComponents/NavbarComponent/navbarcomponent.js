/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import './navbarcomponent.css'
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../util/baseurl";

const Navbar = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState(null)

    const fetchData = async () => {
        const email = localStorage.getItem("userEmail");
        try {
            const response = await axiosInstance.get("/api/accountinfo", {
                params: {
                    email: email
                }
            });

            const data = response.data;
            console.log(data.userdata);
            setUserData(data.userdata);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handlelogout = () => {
        localStorage.removeItem("token");
        navigate('/login')
    }
    return (
        <div>
            <div>
                <nav className="navbar bg-body-tertiary" style={{ backgroundColor: "beige" }}>
                    <div className="container-fluid">
                        <Link class="navbar-brand d-flex" to="/homepage">
                           
                            <h4 className='navhirestyle'>Hire<span className='navinstyle'>Link</span></h4>
                        </Link>


                        <div className="d-flex">

                            {userData && userData.accounttype === "Employee" ? (
                                <div className="dropdown ">
                                    <a
                                        className="btn btn-outline-success me-2 dropdown-toggle"
                                        href="#"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i className='bx bx-expand-horizontal'></i>ICT
                                    </a>

                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link className="dropdown-item " to="/ictbookslot">
                                                <i className='bx bxs-user'></i>Book ICT
                                            </Link>
                                        </li>

                                        <li>
                                            <Link className="dropdown-item" to="/ictwelcome">
                                                <i className='bx bxs-user'></i>ICT Test
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            ) : null}


                            <button className="btn btn-outline-success me-2">
                                <Link className="dropdown-item " to="/jobs"><i class='bx bxs-basket' ></i> Jobs</Link>
                            </button>



                            <div class="dropdown">
                                <a class="btn  btn-outline-success me-2 dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Account
                                </a>

                                <ul class="dropdown-menu">
                                    <li> <Link className="dropdown-item" to="/saved"><i class='bx bxs-cart-add' ></i>Saved</Link></li>
                                    <li> <Link className="dropdown-item" to="/accountinfo"><i class='bx bxs-user'></i>Info</Link></li>

                                </ul>
                            </div>


                            <button className="btn btn-outline-success me-2" onClick={handlelogout}>
                                <Link className="dropdown-item">Logout</Link>
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;