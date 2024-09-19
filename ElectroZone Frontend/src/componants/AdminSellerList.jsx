import { useEffect, useState } from "react";
import { fetchSellers, deleteSeller } from "../services/admin";
import { toast } from "react-toastify";
import Delete from '../images/trash3-fill.svg'

function AdminSellerList() {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    const getSellers = async () => {
      try {
        const response = await fetchSellers();
        console.log(response.data)
        setSellers(response.data);
      } catch (error) {
        console.error("Error fetching sellers:", error);
        toast.error("Failed to fetch sellers");
      }
    };
    getSellers();
  }, []);

  const handleDelete = async (sellerId) => {
    try {
      await deleteSeller(sellerId);
      setSellers(sellers.filter(seller => seller.id !== sellerId)); // Update local state
      toast.success("Seller deleted successfully");
    } catch (error) {
      console.error("Error deleting seller:", error);
      toast.error("Failed to delete seller");
    }
  };

  return (
    <div>
      <div className="container col-lg-12">
        <table className="table table-responsive table-striped bg-dark text-white text-center">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>GST No</th>
              <th>Bank Account</th>
              <th>Branch</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sellers.length > 0 ? (
              sellers.map((seller, index) => (
                <tr key={seller.id}>
                  <td>{index + 1}</td>
                  <td>{seller.name}</td>
                  <td>{seller.email}</td>
                  <td>{seller.phoneNo}</td>
                  <td>{seller.gstNo}</td>
                  <td>{seller.bankAccountNo}</td>
                  <td>{seller.branch}</td>
                  <td>{seller.address}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(seller.id)}
                    >
                      <img src={Delete} height="25" alt="Delete" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No sellers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminSellerList;
