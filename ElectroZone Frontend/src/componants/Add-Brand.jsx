import { useState } from "react";
import { toast } from "react-toastify";
import { addBrand } from "../services/admin";

function AddBrand() {
  const [name,setName] = useState('')
  const [image,setImage] = useState(null)

  const handleFileChange = (e) => {
    setImage(e.target.files[0]); // Get the selected file
  };

  const InsertBrand = async () => {
    if(name.length === 0){
      toast.warning("Category name must be filled")
    }
    else if(!image){
      toast.warning("Image must be uploaded")
    }
    else{
      const result = await addBrand(name,image)
      if(result.status == 201){
        toast.success("Brand added successfully")
      }
    }
  }
  return (
    <div className="col-lg-12 mb-5 mb-lg-0">
      <div className="card">
        <div className="card-body py-5 px-md-5 bg-dark text-white justify-content-center">
          <div style={{ textAlign: "center" }}>
            <h3>Add Brand</h3>
          </div>
          <br />
            {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
            <div className="row">
              <div className="col-md-12 mb-4">
                <div data-mdb-input-init className="form-outline">
                  <input
                    type="text"
                    id="form3Example1"
                    className="form-control"
                    placeholder="Enter Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* <!-- Phone input --> */}
            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="file"
                id="form3Example3"
                className="form-control"
                placeholder="Upload File"
                onChange={handleFileChange}
              />
            </div>

            {/* <!-- Submit button --> */}
            <button
              type="submit"
              data-mdb-button-init
              data-mdb-ripple-init
              className="btn btn-success btn-block mb-4 align-items-center"
              onClick={InsertBrand}
            >
              Add Brand
            </button>
        </div>
      </div>
    </div>
  );
}

export default AddBrand;
