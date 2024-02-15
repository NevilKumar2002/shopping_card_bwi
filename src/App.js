import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter, Link, Navigate, useNavigate } from "react-router-dom";

import ProductList from "./Components/ProductList";
import WatchList from "./Components/WatchList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import "./App.css";
import Logout from "./Components/Logout";

const App = () => {
 
  const [watchlistData, setWatchlistData] = useState(
    JSON.parse(sessionStorage.getItem("watchlistData")) || []
  );

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const addToWatchlist = (product) => {
    toast.success("Product added successfully");
    setWatchlistData((prevWatchlist) => {
      const newWatchlist = [...prevWatchlist, product];
      sessionStorage.setItem("watchlistData", JSON.stringify(newWatchlist));
      return newWatchlist;
    });
  };

  const removeFromWatchlist = (productId) => {
    setWatchlistData((prevWatchlist) => {
      const updatedWatchlist = prevWatchlist.filter(
        (product) => product.id !== productId
      );
      sessionStorage.setItem(
        "watchlistData",
        JSON.stringify(updatedWatchlist)
      );
      return updatedWatchlist;
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
   
    localStorage.removeItem("isLoggedIn");
    toast.success("Logout successful");
  };

  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link to="/">Home</Link>
          {isLoggedIn && <Link to="/watchlist">Watchlist</Link>}
          {!isLoggedIn ? (
            <>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </>
          ) : (
            <Logout />
          )}
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <ProductList
                  addToWatchlist={addToWatchlist}
                  isLoggedIn={isLoggedIn}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/watchlist"
            element={
              isLoggedIn ? (
                <WatchList
                  watchlistData={watchlistData}
                  removeFromWatchlist={removeFromWatchlist}
                />
              ) : (
                <Login setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
        </Routes>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
};

export default App;



// import React, { useEffect, useState } from "react";
// import { Routes, Route, BrowserRouter, Link, Navigate, useNavigate } from "react-router-dom";
// import ProductList from "./Components/ProductList";
// import WatchList from "./Components/WatchList";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Login from "./Components/Login";
// import Register from "./Components/Register";
// import "./App.css";

// const App = () => {
  
//   const [watchlistData, setWatchlistData] = useState(
//     JSON.parse(sessionStorage.getItem("watchlistData")) || []
//   );

//   const [isLoggedIn, setIsLoggedIn] = useState(
//     localStorage.getItem("isLoggedIn") === "true"
//   );

  

//   const addToWatchlist = (product) => {
//     toast.success("Product added successfully");
//     setWatchlistData((prevWatchlist) => {
//       const newWatchlist = [...prevWatchlist, product];
//       sessionStorage.setItem("watchlistData", JSON.stringify(newWatchlist));
//       return newWatchlist;
//     });
//   };

//   const removeFromWatchlist = (productId) => {
//     setWatchlistData((prevWatchlist) => {
//       const updatedWatchlist = prevWatchlist.filter(
//         (product) => product.id !== productId
//       );
//       sessionStorage.setItem(
//         "watchlistData",
//         JSON.stringify(updatedWatchlist)
//       );
//       return updatedWatchlist;
//     });
//   };

//   const handleLogout = () => {
//     localStorage.setItem('isLoggedIn', false);
  
//     setIsLoggedIn(false);
//     localStorage.removeItem("isLoggedIn");
//     toast.success("Logout successful");
   
//   };
  
//   return (
//     <div>
//       <BrowserRouter>
//         <nav>
//           <Link to="/">Home</Link>
//           {isLoggedIn && <Link to="/watchlist">Watchlist</Link>}
//           {!isLoggedIn ? (
//             <>
//               <Link to="/register">Register</Link>
//               <Link to="/login">Login</Link>
//             </>
//           ) : (
//             <button onClick={handleLogout}>Logout</button>
//           )}
//         </nav>
//         <Routes>
//           <Route
//             path="/"
//             element={
//               isLoggedIn ? (
//                 <ProductList
//                   addToWatchlist={addToWatchlist}
//                   isLoggedIn={isLoggedIn}
//                 />
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />
//           <Route
//             path="/watchlist"
//             element={
//               isLoggedIn ? (
//                 <WatchList
//                   watchlistData={watchlistData}
//                   removeFromWatchlist={removeFromWatchlist}
//                 />
//               ) : (
//                 <Login setIsLoggedIn={setIsLoggedIn} />
//               )
//             }
//           />
//           <Route path="/register" element={<Register />} />
//           <Route
//             path="/login"
//             element={<Login setIsLoggedIn={setIsLoggedIn} />}
//           />
//         </Routes>
//       </BrowserRouter>
//       <ToastContainer />
//     </div>
//   );
// };

// export default App;
