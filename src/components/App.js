// DataFetcher.js
import React, { useEffect, useState } from "react";

const DataFetcher = () => {
  const API = "https://dummyjson.com/products";
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const getData = () => {
      fetch(API)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Return the JSON response
        })
        .then((data) => {
          if (data.products && data.products.length > 0) {
            setProducts(data.products); // Update state with fetched products
          } else {
            setProducts([]); // Set to empty array if no products found
          }
        })
        .catch((err) => {
          setError(err.message); // Update state with error message
        });
    };
    getData();  
  }, []);

  return (
    <div>
      {error && <h1>An error occurred: {error}</h1>} {/* Display error if exists */}
      {products.length === 0 ? (
        <h1>No data found</h1> // Show no data message if array is empty
      ) : (
        products.map((item) => (
          <pre key={item.id}><h1>{JSON.stringify(item, null, 2)}</h1></pre> // Convert item to JSON string for display
        ))
      )}
    </div>
  );
};

export default DataFetcher;
