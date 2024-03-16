// auth.js

// auth.js

const setisMaintenanceMode = true;


export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token; // Returns true if token exists, otherwise false
};


export const isMaintenanceMode = () => {
  // Logic to check if the site is in maintenance mode
  // You can use a flag, API call, or any other method to determine maintenance mode
  return setisMaintenanceMode; // Change this based on your implementation
};



