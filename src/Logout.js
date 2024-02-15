import React from "react";

const LogOut = () => {
  const handleLogout = () => {
    // Perform logout actions here
    // For example, clearing localStorage, resetting state, etc.
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    // You may also want to redirect the user to the login page or elsewhere
    // Use the appropriate routing mechanism or window.location.href for redirection
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      {/* You can also add additional UI or messages related to logout */}
    </div>
  );
};

export default LogOut;
