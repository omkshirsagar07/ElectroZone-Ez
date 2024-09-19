import { useEffect, useState } from "react";
import { fetchBrands, fetchCategories } from "../services/admin";
import { toast } from "react-toastify";
import { updateProduct } from "../services/seller"; // Import the updateProduct function

function UpdateProduct({ product }) {
    console.log(product)
  const [name, setName] = useState(product.name || '');
  const [description, setDescription] = useState(product.description || '');
  const [category, setCategory] = useState(product.category || '');
  const [brand, setBrand] = useState(product.brand || '');
  const [mrp, setMrp] = useState(product.mrp || '');
  const [discount, setDiscount] = useState(product.discount || '');
  const [quantity, setQuantity] = useState(product.quantity || '');
  const [warranty, setWarranty] = useState(product.warranty || '');
  const [brands, setBrands] = useState([]);
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetchCategories();
      setCategories(response.data);
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getBrands = async () => {
      try {
        const response = await fetchBrands();
        setBrands(response);
      } catch (error) {
        console.error("Error fetching brands:", error);
        setBrands([]);
      }
    };
    getBrands();
  }, []);

  const handleUpdateProduct = async () => {
    if(name.length === 0){
      toast.warning("Product Name is Mandatory")
    }else if(description.length === 0){
      toast.warning("Product Description is Mandatory")
    }else if(category.length === 0){
      toast.warning("Category must be selected")
    }else if(brand.length === 0){
      toast.warning("Brand must be selected")
    }else if(mrp.length === 0){
      toast.warning("MRP is Mandatory")
    }else if(discount.length === 0){
      toast.warning("Discount is Mandatory")
    }else if(quantity.length === 0){
      toast.warning("Product Quantity is Mandatory")
    }else if(warranty.length === 0){
      toast.warning("Product Warranty is Mandatory")
    }else{
      const updatedData = { name, description, image, category, brand, mrp, discount, quantity, warranty };
      try {
        const result = await updateProduct(sessionStorage.id, product.id, updatedData);
        console.log(result)
        if(result.status === 200){
          toast.success("Product updated successfully");
        }
      } catch (error) {
        toast.error("Error updating product");
      }
    }
  };

  return (
    <div className="col-lg-12 mb-5 mb-lg-0">
      <div className="card">
        <div className="card-body py-5 px-md-5 bg-dark text-white justify-content-center">
          <div style={{ textAlign: "center" }}>
            <h3>Update Product</h3>
          </div>
          <br />
            <div className="row">
              <div className="col-md-12 mb-4">
                <div data-mdb-input-init className="form-outline">
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Enter Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <textarea
                type="text"
                id="desc"
                className="form-control"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
            <p>Upload Image :</p>
              <input
                type="file"
                id="image"
                className="form-control"
                placeholder="Upload File"
                onChange={handleFileChange}
              />
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <p>Category :</p>
              <select
                id="category"
                className="form-control text-black"
                name="category"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" selected>
                  Select Category
                </option>
                {
                  categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.title}
                    </option>
                  )) 
                }
              </select>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <p>Brand :</p>
              <select
                id="brand"
                className="form-control text-black"
                name="brand"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              >
                <option value="" selected>
                  Select Brand
                </option>
                {
                  brands.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  )) 
                }
              </select>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="number"
                id="mrp"
                className="form-control"
                placeholder="Enter Maximum Retail Price"
                value={mrp}
                onChange={(e) => setMrp(e.target.value)}
              />
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="number"
                id="discount"
                className="form-control"
                placeholder="Enter Discount price"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="number"
                id="quantity"
                className="form-control"
                placeholder="Enter Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="number"
                id="warranty"
                className="form-control"
                placeholder="Enter Warranty (in months)"
                value={warranty}
                onChange={(e) => setWarranty(e.target.value)}
              />
            </div>

            {/* <!-- Submit button --> */}
            <button
              type="submit"
              data-mdb-button-init
              data-mdb-ripple-init
              className="btn btn-success btn-block mb-4 align-items-center"
              onClick={handleUpdateProduct}
            >
              Update Product
            </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
