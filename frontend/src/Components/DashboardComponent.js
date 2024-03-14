import React from "react";
import Navbar from "./GlobalComponents/NavbarComponent/navbarcomponent";
import Canvas from "./GlobalComponents/CanvasComponent/canvascomponent";

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <div className="dashboard-container">
                <Canvas />
                <div className="twosidecontainer">

                </div>
            </div>

            {/* Delete Modal */}

        </div>
    )
}

export default Dashboard