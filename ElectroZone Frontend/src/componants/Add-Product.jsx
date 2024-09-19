import { useEffect, useState } from "react";
import { fetchBrands, fetchCategories } from "../services/admin";
import { toast } from "react-toastify";
import { addProduct } from "../services/seller";

function AddProduct() {
  const [name,setName] = useState('')
  const [description,setDescription] = useState('')
  const [category,setCategory] = useState('')
  const [brand,setBrand] = useState('')
  const [mrp,setMrp] = useState('')
  const [discount,setDiscount] = useState('')
  const [quantity,setQuantity] = useState('')
  const [warranty,setWarranty] = useState('')
  const [brands, setBrands] = useState([])
  const [image,setImage] = useState(null)

  const handleFileChange = (e) => {
    setImage(e.target.files[0]); // Get the selected file
  };
  
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetchCategories();
      //console.log(response) // Fetch the list of categories from the backend
      setCategories(response.data); 
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getBrands = async () => {
      try {
        const response = await fetchBrands();
        //console.log(response)
        setBrands(response); // Assuming response.data contains the array of brands
      } catch (error) {
        console.error("Error fetching brands:", error);
        setBrands([]); // Optionally set to an empty array in case of error
      }
    };
    getBrands();
  }, []);

  const InsertProduct = async () =>{
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
      const result = await addProduct(sessionStorage.id,name,description,image,category,brand,mrp,discount,quantity,warranty)
      if(result.status == 201){
        toast.success("Product added successfully")
      }
    }
  }

  return (
    <div className="col-lg-12 mb-5 mb-lg-0">
      <div className="card">
        <div className="card-body py-5 px-md-5 bg-dark text-white justify-content-center">
          <div style={{ textAlign: "center" }}>
            <h3>Add Product</h3>
          </div>
          <br />
            {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
            <div className="row">
              <div className="col-md-12 mb-4">
                <div data-mdb-input-init className="form-outline">
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Enter Product Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* <!-- Email input --> */}
            <div data-mdb-input-init className="form-outline mb-4">
              <textarea
                type="text"
                id="desc"
                className="form-control"
                placeholder="Enter Description"
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
                onChange={(e) => setMrp(e.target.value)}
              />
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="number"
                id="discount"
                className="form-control"
                placeholder="Enter Discount price"
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="number"
                id="quantity"
                className="form-control"
                placeholder="Enter Quantity"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="number"
                id="warranty"
                className="form-control"
                placeholder="Enter Warranty (in months)"
                onChange={(e) => setWarranty(e.target.value)}
              />
            </div>

            {/* <!-- Submit button --> */}
            <button
              type="submit"
              data-mdb-button-init
              data-mdb-ripple-init
              className="btn btn-success btn-block mb-4 align-items-center"
              onClick={InsertProduct}
            >
              Add Product
            </button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
