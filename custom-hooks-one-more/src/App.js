import React, { useEffect, useState } from "react";
import Products from "./components/Products/Products";
import NewProduct from "./components/NewProduct/NewProduct";
import useHttp from "./hooks/use-http";

const App = () => {
  const [products, setProducts] = useState([]);

  const httpRequestData = useHttp();

  const { isLoading, error, sendHttpRequest: fetchProducts } = httpRequestData;

  useEffect(() => {
    const manageProducts = (productsData) => {
      const loadedProducts = [];

      for (const productKey in productsData) {
        loadedProducts.push({ id: productKey, text: productsData[productKey].text });
      }
      setProducts(loadedProducts);
    };
    fetchProducts({ url: "https://react-curse-http-730fa-default-rtdb.firebaseio.com/products.json" }, manageProducts);
  }, [fetchProducts]);

  const productAddHandler = (product) => {
    setProducts((prevProducts) => prevProducts.concat(product));
  };

  return (
    <React.Fragment>
      <NewProduct onAddProduct={productAddHandler} />
      <Products
        items={products}
        loading={isLoading}
        error={error}
        onFetch={fetchProducts}
      />
    </React.Fragment>
  );
};

export default App;