import React from 'react';
import './style.css';
import { toast } from 'react-toastify';

const WatchList = ({ watchlistData, removeFromWatchlist }) => {
  const handleRemoveFromWatchlist = (productId) => {
    // Call the provided removeFromWatchlist function with the productId
    removeFromWatchlist(productId);
    toast.success("Product removed successfully");
  };

  return (
    <div className="product-list-container">
      <h1>Watchlist</h1>
      {watchlistData.length === 0 ? (
        <h2 className='no-products'>Your watchlist is empty. Add some products to watchlist.</h2>
      ) : (
        <div className="product-container">
          {watchlistData.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.thumbnail} alt={product.title} className="product-thumbnail" />
              <div className="product-details">
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Rating: {product.rating}</p>
                <button onClick={() => handleRemoveFromWatchlist(product.id)} className='remove-btn'>
                  Remove from Watchlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchList;


// import React from 'react';
// import './style.css';
// import { toast } from 'react-toastify';

// const WatchList = ({ watchlistData, removeFromWatchlist }) => {
//   const handleRemoveFromWatchlist = (productId) => {
//     // Call the provided removeFromWatchlist function with the productId
//     removeFromWatchlist(productId);
//     toast.success("product removed successfully");
//   };

//   return (
//     <div className="product-list-container">
//       <h1>Watchlist</h1>
//       <div className="product-container">
//         {watchlistData.map(product => (
//           <div key={product.id} className="product-card">
//             <img src={product.thumbnail} alt={product.title} className="product-thumbnail" />
//             <div className="product-details">
//               <h2>{product.title}</h2>
//               <p>{product.description}</p>
//               <p>Price: ${product.price}</p>
//               <p>Rating: {product.rating}</p>
//               <button onClick={() => handleRemoveFromWatchlist(product.id)} className='remove-btn'>
//                 Remove from Watchlist
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default WatchList;
