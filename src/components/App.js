import React, { useEffect, useState } from "react";
import './../styles/App.css';

const App = () => {
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
          setProducts(data.products); // Update state with fetched products
        })
        .catch((err) => {
          setError(err.message); // Update state with error message
        });
    };
    getData();
  }, []);

  return (
    <div>
      {error && <p>Error: {error}</p>} {/* Display error if exists */}
      {products.length === 0 ? (
        <p>Loading...</p> // Show loading message while fetching data
      ) : (
        products.map((item) => (
          <pre key={item.id}>{JSON.stringify(item, null, 2)}</pre> // Convert item to JSON string for display
        ))
      )}
      {/* Do not remove the main div */}
    </div>
  );
};

export default App;
