import { useEffect, useState } from "react";
import { fetchBrands, deleteBrand } from "../services/admin"; // Assume these functions are implemented
import UpdateBrand from "./Update-Brand";
import Update from '../images/pencil-square.svg'
import Delete from '../images/trash3-fill.svg'

function AdminBrandList() {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    const getBrands = async () => {
      try {
        const response = await fetchBrands();
        setBrands(response); // Assuming response.data contains the array of brands
      } catch (error) {
        console.error("Error fetching brands:", error);
        setBrands([]); // Optionally set to an empty array in case of error
      }
    };
    getBrands();
  }, []);
  

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this brand?");
    if (confirmDelete) {
      await deleteBrand(id); // Delete the brand using its ID
      setBrands(brands.filter((brand) => brand.id !== id)); // Update the state to remove the deleted brand
    }
  };

  const handleUpdate = (brand) => {
    setSelectedBrand(brand); // Set the selected brand for update
  };

  const handleUpdateComplete = () => {
    setSelectedBrand(null); // Clear the selected brand after update
    fetchBrands().then(setBrands); // Refresh the brand list
  };

  return (
    <div>
      <div className="container col-lg-12">
        <table className="table table-responsive table-striped bg-dark text-white text-center">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand, index) => (
              <tr key={brand.id}>
                <td>{index + 1}</td>
                <td>{brand.name}</td>
                <td>
                  <img src={brand.image ? `data:image/svg+xml;base64,${brand.image}` : null} alt={brand.name} style={{ width: "50px", height: "50px" }} />
                </td>
                <td>
                  <button className="btn btn-warning me-2" onClick={() => handleUpdate(brand)}>
                  <img src={Update} height="25" alt="Update" />
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(brand.id)}>
                  <img src={Delete} height="25" alt="Delete" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedBrand && (
        <UpdateBrand
          id={selectedBrand.id}
          currentName={selectedBrand.name}
          currentImage={selectedBrand.image}
          onUpdate={handleUpdateComplete}
        />
      )}
    </div>
  );
}

export default AdminBrandList;
