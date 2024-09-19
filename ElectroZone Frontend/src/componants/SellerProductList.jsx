import { useEffect, useState } from "react";
import { fetchSellerProducts, deleteProduct } from "../services/seller";
import Update from '../images/pencil-square.svg'
import Delete from '../images/trash3-fill.svg'
import UpdateProduct from "./Update-Product";

function SellerProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetchSellerProducts(sessionStorage.id);
        console.log(response.data)
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      setProducts(products.filter(product => product.id !== productId)); // Update local state
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdateClick = (product) => {
    setSelectedProduct(product); // Set the selected product to be updated
  };

  return (
    <div>
      <div className="container col-lg-12">
        <table className="table table-responsive table-striped bg-dark text-white text-center">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Description</th>
              <th>Image</th>
              <th>MRP</th>
              <th>Discount</th>
              <th>Quantity</th>
              <th>Warranty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>
                    <img
                      src={
                        product.image
                          ? `data:image/${product.imageFormat || 'jpeg'};base64,${product.image}`
                          : 'path/to/default-image.jpg'
                      }
                      alt={product.name}
                      style={{ width: "100px", height: "auto" }}
                    />
                  </td>
                  <td>{product.mrp}</td>
                  <td>{product.discount}</td>
                  <td>{product.quantity}</td>
                  <td>{product.warranty}</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => handleUpdateClick(product)}><img src={Update} height="25" alt="Update" /></button>
                    <button className="btn btn-danger" onClick={() => handleDelete(product.id)}><img src={Delete} height="25" alt="Delete" /></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedProduct && <UpdateProduct product={selectedProduct} />}
    </div>
  );
}

export default SellerProductList;
