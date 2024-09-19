import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addaddress, fetchSavedAddresses } from "../services/user";
import AddressList from "./AddressList";

function AddAddress() {
  const [name,setName] = useState('')
  const [phoneNo,setPhoneNo] = useState('')
  const [addressLine1,setAddressLine1] = useState('')
  const [addressLine2,setAddressLine2] = useState('')
  const [landmark,setLandmark] = useState('')
  const [city,setCity] = useState('')
  const [state,setState] = useState('')
  const [pincode,setPincode] = useState('')
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const loadAddresses = async () => {
      try {
        const result = await fetchSavedAddresses(sessionStorage.getItem('id'));
        setAddresses(result.data);
      } catch (error) {
        toast.error("Failed to load saved addresses");
      }
    };
    loadAddresses();
  }, []);

  const onSubmit = async () => {
    if(name.length === 0){
      toast.warning('Name is mandatory')
    }else if(phoneNo.length === 0){
      toast.warning('Name is mandatory')
    }else if(addressLine1.length === 0){
      toast.warning('Name is mandatory')
    }else if(city.length === 0){
      toast.warning('Name is mandatory')
    }else if(pincode.length === 0){
      toast.warning('Name is mandatory')
    }else if(state.length === 0){
      toast.warning('Name is mandatory')
    }else{
      const result = await addaddress(sessionStorage['id'],name,phoneNo,addressLine1,addressLine2,landmark,city,state,pincode)
      if (result.status === 201) {
        toast.success("Address Added")
        setAddresses([...addresses, result.data]);
      }
    }
  }
  return (
    <div>
      <section>
        <div className="container py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-4 col-lg-12">
              <div className="card shadow text-white">
                <div className="card-body p-5 text-center bg-dark fill-flex text-white">
                  <h3 className="mb-5">My Addresses</h3>
                  <div className="row">
                    <div className="col-lg-6">
                      <h4>Add New Address</h4>
                      <hr />
                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="text"
                          id="name"
                          className="form-control form-control-lg"
                          placeholder="Enter Name"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="tel"
                          id="phone"
                          className="form-control form-control-lg"
                          placeholder="Enter Phone Number"
                          onChange={(e) => setPhoneNo(e.target.value)}
                        />
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="text"
                          id="line1"
                          className="form-control form-control-lg"
                          placeholder="Enter Address Line 1"
                          onChange={(e) => setAddressLine1(e.target.value)}
                        />
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="text"
                          id="line2"
                          className="form-control form-control-lg"
                          placeholder="Enter Address Line 2"
                          onChange={(e) => setAddressLine2(e.target.value)}
                        />
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="text"
                          id="landmark"
                          className="form-control form-control-lg"
                          placeholder="Enter Landmark"
                          onChange={(e) => setLandmark(e.target.value)}
                        />
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="text"
                          id="city"
                          className="form-control form-control-lg"
                          placeholder="Enter City"
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="text"
                          id="state"
                          className="form-control form-control-lg"
                          placeholder="Enter State"
                          onChange={(e) => setState(e.target.value)}
                        />
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="number"
                          id="pincode"
                          className="form-control form-control-lg"
                          placeholder="Enter Pin Code"
                          onChange={(e) => setPincode(e.target.value)}
                        />
                      </div>

                      <button
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-success btn-lg btn-block"
                        type="submit"
                        onClick={onSubmit}
                      >
                        Submit
                      </button>
                    </div>
                    <div className="col-lg-6">
                      <h4>Saved Addresses</h4>
                      <hr />
                      <AddressList addresses={addresses} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddAddress;
