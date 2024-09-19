import { useEffect, useState } from "react";
import { getAddress } from '../services/address';
import PaymentApi from "../services/Paymentapi";
import AddressList from '../componants/AddressList';
import Navbar from "../componants/Navbar";
import Footer from "../componants/Footer";
import { useSelector } from "react-redux";


function CheckoutPage() {

  const userId = sessionStorage.getItem('id'); // Replace with actual user ID


  const cartItems = useSelector(state => state.cart);
  const grandTotal = useSelector(state => state.grandTotal);

  console.log({ cartItems, grandTotal });


  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const items = await getAddress(userId);
        setAddresses(items || []);

      } catch (error) {
        console.error('Error fetching cart items:', error);
        setAddresses([]);
      }
    };
    fetchCartItems();
  }, [userId]);



  const [selectedAddress,setSelectedAddress] = useState(null);



  const handleAddressSelect = (id) => {
    setSelectedAddress(id);
    // Additional logic for selected address can be added here
  };


  return (
    <div>
      {/* <!-- Navbar --> */}
      <Navbar />
      <br />
      {/* Main Content */}
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <h3 className="text-center">Select Address</h3>
              <div>
                <AddressList addresses={addresses} onAddressSelect={handleAddressSelect} selectedAddressId={selectedAddressId} setSelectedAddressId={setSelectedAddressId} />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-9"></div>
          <div className="col-3">
            <div className="card">
              <div className="form-control text-center">
                <PaymentApi selectedAddressId={selectedAddressId} />
              </div>
            </div>
          </div>
        </div>

      </div>
      <br />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default CheckoutPage;
