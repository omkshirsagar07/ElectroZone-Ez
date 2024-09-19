import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { updateBrand } from "../services/admin"; // Assuming you have an updateBrand function in your services

function UpdateBrand({ id, currentName, currentImage, onUpdate }) {
  const [name, setName] = useState(currentName || '');
  const [image, setImage] = useState(null);

  useEffect(() => {
    setName(currentName);
  }, [currentName]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]); // Get the selected file
  };

  const handleUpdateBrand = async () => {
    if (name.length === 0) {
      toast.warning("Brand name must be filled");
    } else if (!image && !currentImage) {
      toast.warning("Image must be uploaded");
    } else {
      try {
        const result = await updateBrand(id, name, image);
        if (result.status === 200) {
          toast.success("Brand updated successfully");
          onUpdate(); // Callback to refresh the brand list after update
        }
      } catch (error) {
        toast.error("Failed to update brand");
      }
    }
  };

  return (
    <div className="col-lg-12 mb-5 mb-lg-0">
      <div className="card">
        <div className="card-body py-5 px-md-5 bg-dark text-white justify-content-center">
          <div style={{ textAlign: "center" }}>
            <h3>Update Brand</h3>
          </div>
          <br />
          <div className="row">
            <div className="col-md-12 mb-4">
              <div data-mdb-input-init className="form-outline">
                <input
                  type="text"
                  id="form3Example1"
                  className="form-control"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div data-mdb-input-init className="form-outline mb-4">
            <input
              type="file"
              id="form3Example3"
              className="form-control"
              onChange={handleFileChange}
            />
            {currentImage && (
              <img
                src={currentImage ? `data:image/svg+xml;base64,${currentImage}` : null}
                alt="Current brand"
                style={{ width: "50px", height: "50px", marginTop: "10px" }}
              />
            )}
          </div>

          <button
            type="submit"
            data-mdb-button-init
            data-mdb-ripple-init
            className="btn btn-success btn-block mb-4 align-items-center"
            onClick={handleUpdateBrand}
          >
            Update Brand
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateBrand;
