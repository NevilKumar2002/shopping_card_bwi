// // // ProductList.js
// // ProductList.js
import React, { useState, useEffect } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

const ProductList = ({ addToWatchlist }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Checking login status...");
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
      // Fetch product details from the API
      console.log("Fetching products...");
      fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(data => {
          setProducts(data.products);
          setFilteredProducts(data.products); // Initially set filtered products to all products
        })
        .catch(error => console.error('Error fetching products:', error));
    } else {
      // Redirect to login if not logged in
      console.log("Redirecting to login...");
      navigate("/login");
    }
  }, [navigate]);


  // Calculate the index range for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Filter products based on search and price
  const filterProducts = () => {
    let filtered = products;

    // Apply search filter
    if (searchQuery.trim() !== '') {
      const searchRegex = new RegExp(searchQuery, 'i');
      filtered = filtered.filter(product => searchRegex.test(product.title));
    }

    // Apply price filter
    if (priceFilter > 0) {
      filtered = filtered.filter(product => product.price <= priceFilter);
    }

    setFilteredProducts(filtered);
  };

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="product-list-container">
      <h1>Product List</h1>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search by product name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select value={priceFilter} onChange={(e) => setPriceFilter(Number(e.target.value))}>
          <option value={0}>Filter by Price</option>
          <option value={50}>$50 and below</option>
          <option value={100}>$100 and below</option>
          <option value={200}>$200 and below</option>
        </select>
        <button className='filter-btn' onClick={filterProducts}>Apply Filters</button>
      </div>
      <div className="product-container">
        {currentProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.thumbnail} alt={product.title} className="product-thumbnail" />
            <div className="product-details">
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Rating: {product.rating}</p>
              <button onClick={() => addToWatchlist(product)}>Add to Watchlist</button>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="pagination-container">
        {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import './style.css';

// const ProductList = ({ addToWatchlist }) => {
//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 10;

//   useEffect(() => {
//     // Fetch product details from the API
//     fetch('https://dummyjson.com/products')
//       .then(res => res.json())
//       .then(data => {
//         setProducts(data.products);
//       })
//       .catch(error => console.error('Error fetching products:', error));
//   }, []);

//   // Calculate the index range for the current page
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

//   // Change page
//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <div className="product-list-container">
//       <h1>Product List</h1>
//       <div className="product-container">
//         {currentProducts.map(product => (
//           <div key={product.id} className="product-card">
//             <img src={product.thumbnail} alt={product.title} className="product-thumbnail" />
//             <div className="product-details">
//               <h2>{product.title}</h2>
//               <p>{product.description}</p>
//               <p>Price: ${product.price}</p>
//               <p>Rating: {product.rating}</p>
//               <button onClick={() => addToWatchlist(product)}>Add to Watchlist</button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="pagination-container">
//         {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
//           <button key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
//             {index + 1}
//           </button>
//         ))}
//       </div>

//       {/* Link to WatchList page */}
//       <Link to="/watchlist">Go to Watchlist</Link>
//     </div>
//   );
// };

// export default ProductList;



// // import React, { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom';
// // import './style.css';

// // const ProductList = () => {
// //   const [products, setProducts] = useState([]);
// //   const [watchlist, setWatchlist] = useState([]);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const productsPerPage = 10;

// //   useEffect(() => {
// //     // Fetch product details from the API
// //     fetch('https://dummyjson.com/products')
// //       .then(res => res.json())
// //       .then(data => {
// //         setProducts(data.products);
// //       })
// //       .catch(error => console.error('Error fetching products:', error));
// //   }, []);

// //   const addToWatchlist = (product) => {
// //     setWatchlist(prevWatchlist => [...prevWatchlist, product]);
// //   };

// //   // Calculate the index range for the current page
// //   const indexOfLastProduct = currentPage * productsPerPage;
// //   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
// //   const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

// //   // Change page
// //   const paginate = (pageNumber) => {
// //     setCurrentPage(pageNumber);
// //   };

// //   return (
// //     <div className="product-list-container">
// //       <h1>Product List</h1>
// //       <div className="product-container">
// //         {currentProducts.map(product => (
// //           <div key={product.id} className="product-card">
// //             <img src={product.thumbnail} alt={product.title} className="product-thumbnail" />
// //             <div className="product-details">
// //               <h2>{product.title}</h2>
// //               <p>{product.description}</p>
// //               <p>Price: ${product.price}</p>
// //               <p>Rating: {product.rating}</p>
// //               <button onClick={() => addToWatchlist(product)}>Add to Watchlist</button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Pagination */}
// //       <div className="pagination-container">
// //         {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
// //           <button key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
// //             {index + 1}
// //           </button>
// //         ))}
// //       </div>

// //       {/* Link to WatchList page */}
    
// //     </div>
// //   );
// // };

// // export default ProductList;



// // // import React, { useState, useEffect } from 'react';
// // // import './style.css';
// // // import WatchList from './WatchList';

// // // const ProductList = () => {
// // //   const [products, setProducts] = useState([]);
// // //   const [watchlist, setWatchlist] = useState([]);
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const productsPerPage = 10;

// // //   useEffect(() => {
// // //     // Fetch product details from the API
// // //     fetch('https://dummyjson.com/products')
// // //       .then(res => res.json())
// // //       .then(data => {
// // //         setProducts(data.products);
       
// // //       })
// // //       .catch(error => console.error('Error fetching products:', error));
// // //   }, []);

// // //   const addToWatchlist = (product) => {
// // //     setWatchlist(prevWatchlist => [...prevWatchlist, product]);
// // //     <WatchList watchlist={watchlist} />
   
// // //   };

// // //   // Calculate the index range for the current page
// // //   const indexOfLastProduct = currentPage * productsPerPage;
// // //   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
// // //   const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

// // //   // Change page
// // //   const paginate = (pageNumber) => {
// // //     setCurrentPage(pageNumber);
// // //   };

// // //   return (
// // //     <div className="product-list-container">
// // //       <h1>Product List</h1>
// // //       <div className="product-container">
// // //         {currentProducts.map(product => (
// // //           <div key={product.id} className="product-card">
// // //             <img src={product.thumbnail} alt={product.title} className="product-thumbnail" />
// // //             <div className="product-details">
// // //               <h2>{product.title}</h2>
// // //               <p>{product.description}</p>
// // //               <p>Price: ${product.price}</p>
// // //               <p>Rating: {product.rating}</p>
// // //               <button onClick={() => addToWatchlist(product)}>Add to Watchlist</button>
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       {/* Pagination */}
// // //       <div className="pagination-container">
// // //         {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
// // //           <button key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
// // //             {index + 1}
// // //           </button>
// // //         ))}
// // //       </div>

    
// // //     </div>
// // //   );
// // // };

// // // export default ProductList;
