import React, { useEffect, useState } from "react";
import Navbar from "./GlobalComponents/NavbarComponent/navbarcomponent";
import Canvas from "./GlobalComponents/CanvasComponent/canvascomponent";
import { axiosInstance } from "../util/baseurl";
import { Link } from "react-router-dom";
import Footer from "./GlobalComponents/FooterComponent/FooterComponent";

const Dashboard = () => {
    const email = localStorage.getItem("userEmail")

    const [formData, setFormData] = useState({
        pendingrequest: "",
        approvedrequest: "",
        rejectedrequest: ""
    });

    const fetchrequestcount = async () => {
        try {
            const response = await axiosInstance.get("/api/requestcount", {
                params: {
                    email
                }
            });
            const { pendingCount, approvedCount, rejectedCount } = response.data;

            // Set the form data with the counts
            setFormData({
                pendingrequest: pendingCount,
                approvedrequest: approvedCount,
                rejectedrequest: rejectedCount
            });
        } catch (error) {
            console.error('Error fetching request count:', error);
        }
    }

    useEffect(() => {
        fetchrequestcount();
    }, []);



    return (
        <div>
            <Navbar />
            <div className="dashboard-container">
                <Canvas />
                <div className="dashboardtwosidecontainer">
                    <div className="reqeustcount">
                        <ul class="box-info">
                            <li>
                                <i class='bx bx-loader' ></i>
                                <a href="/reviewproduct" class="bg-light">
                                    <span class="text">
                                        <h3>{formData.pendingrequest}</h3>
                                        <p>Pending Request</p>
                                    </span>
                                </a>
                            </li>
                            <li>
                                <i class='bx bx-check' style={{ color: '#00e3ff' }}  ></i>
                                <a href="/reviewproduct" class="bg-light">
                                    <span class="text">
                                        <h3>{formData.approvedrequest}</h3>
                                        <p>Approved Request</p>
                                    </span>
                                </a>
                            </li>
                            <li>
                                <i class='bx bx-x' style={{ color: '#ff0000' }}  ></i>
                                <a href="/reviewproduct" class="bg-light">
                                    <span class="text">
                                        <h3>{formData.rejectedrequest}</h3>
                                        <p>Rejected Request</p>
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
           <Footer/>
        </div>
    );
};

export default Dashboard;
