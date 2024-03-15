import React, { useEffect, useState } from "react";
import Navbar from "./GlobalComponents/NavbarComponent/navbarcomponent";
import Canvas from "./GlobalComponents/CanvasComponent/canvascomponent";
import { axiosInstance } from "../util/baseurl";
import '../Styles/User.css'
import Footer from "./GlobalComponents/FooterComponent/FooterComponent";
const User = () => {
    const [userData, setUserData] = useState([]);

    const fetchUserData = async () => {
        try {
            const response = await axiosInstance.get("/api/userdata");
            setUserData(response.data.userData);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleUpdateStatus = async (data, status) => {
        try {
            // Implement logic to update user status
            const response = await axiosInstance.post('/api/updateuserstatus', {
                email: data.email,
                status: status
            });

            if (response) {
                fetchUserData()
            }

            // Handle response if needed
            console.log('Update status response:', response.data);
        } catch (error) {
            console.error('Error updating user status:', error);
        }
    };


    return (
        <div>
            <Navbar />
            <div className="dashboard-container">
                <Canvas />
                <div className="dashboardtwosidecontainer">
                    <div className="reqeustcount">
                        {/* Update your JSX code to use a table for displaying user details */}

                        <div className="user-card">
                            <table className="user-details-table">
                                <thead>
                                    <th>Email</th>
                                    <th>Account Type</th>
                                    <th>Account Status</th>
                                    <th>Action</th>
                                </thead>
                                <tbody>
                                    {userData && userData.map((data, index) => (
                                        <tr>

                                            <td><p className='usermail'>{data.email}</p></td>


                                            <td><p className='useraccounttype'>{data.accounttype}</p></td>

                                            <td><p className='useraccountstatus'>{data.accountstatus}</p></td>
                                            {data.accountstatus === "Active" ?
                                                <td><button type="button" className="btn btn-primary" onClick={() => handleUpdateStatus(data, "Blocked")} >
                                                    Block
                                                </button></td>
                                                :
                                                <td> <button type="button" className="btn btn-primary" onClick={() => handleUpdateStatus(data, "Active")} >
                                                    Activate
                                                </button></td>}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>


                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default User;
