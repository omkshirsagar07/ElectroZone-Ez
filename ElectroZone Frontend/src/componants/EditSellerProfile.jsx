import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchSeller, updateSellerProfileData } from "../services/seller";

function EditSellerProfile() {
  const [name,setName] = useState('')
  const [phoneNo,setPhoneNo] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [gstNo,setGSTINNo] = useState('')
  const [bankAccountNo,setBankAccount] = useState('')
  const [ifscNumber,setIFSCode] = useState('')
  const [branch,setBranch] = useState('')
  const [address,setAddress] = useState('')

  const fetchInfo = async () => {
    const result = await fetchSeller(sessionStorage.id); // Corrected sessionStorage access
    return result;
  };

  useEffect(() => {
    const fetchData = async () => {
      const prop = await fetchInfo();
      console.log(prop)
      const { name, phoneNo, email, gstNo, bankAccountNo, ifscNumber, branch, address } = prop;
      setName(name);
      setPhoneNo(phoneNo);
      setEmail(email);
      setGSTINNo(gstNo)
      setBankAccount(bankAccountNo)
      setIFSCode(ifscNumber)
      setBranch(branch)
      setAddress(address)
    };
    fetchData(); // Corrected async usage in useEffect
  }, []); // Added dependency array
  

  const onSubmit = async () => {
    if(name.length === 0){
      toast.warning("Name is mandatory")
    }else if(phoneNo.length === 0){
      toast.warning("Phone Number is mandatory")
    }else if(password.length === 0){
      toast.warning("Password is mandatory")
    }else if(password !== confirmPassword){
      toast.warning("Password should be same")
    }else if(gstNo.length === 0){
        toast.warning("GST Number is mandatory")
      }else if(gstNo.length < 15){
        toast.warning("Bank Account Number is mandatory")
      }
      else if(bankAccountNo.length === 0){
        toast.warning("Bank Account Number is mandatory")
      }else if(ifscNumber.length === 0){
        toast.warning("IFSC Number is mandatory")
      }else if(branch.length === 0){
        toast.warning("Branch is mandatory")
      }else if(address.length === 0){
        toast.warning("Address is mandatory")
      }
        else {
      const result = await updateSellerProfileData(sessionStorage.id,name,phoneNo,email,password,gstNo,bankAccountNo,ifscNumber,branch,address)
      if (result.status === 200) {
        toast.success("Profile Updated")
      }
    }
  }
  return (
    <div>
      <section>
        <div className="container">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12">
              <div className="card shadow-2-strong">
                <div className="card-body p-5 text-center bg-dark text-white">
                  <h4 className="mb-5">Edit Profile</h4>
                  
                  <div className="col-12">
                    <div className="row">
                      <div className="col-12">
                        <div data-mdb-input-init className="form-outline mb-4">
                          <input
                            type="text"
                            id="name"
                            className="form-control form-control-lg"
                            placeholder="Enter Name"
                            onChange={(e) => setName(e.target.value)} 
                            value={name}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="row">
                      <div className="col-6">
                        <div data-mdb-input-init className="form-outline mb-4">
                          <input
                            type="email"
                            id="email"
                            className="form-control form-control-lg"
                            value={email}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div data-mdb-input-init className="form-outline mb-4">
                          <input
                            type="tel"
                            id="phoneNo"
                            className="form-control form-control-lg"
                            placeholder="Enter Phone Number"
                            onChange={(e) => setPhoneNo(e.target.value)}
                            value={phoneNo}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
              <div className="col-md-12 mb-4">
                <div data-mdb-input-init className="form-outline">
                  <input
                    type="text"
                    id="gst"
                    className="form-control form-control-lg"
                    placeholder="Enter GSTIN Number"
                    onChange={(e) => setGSTINNo(e.target.value)}
                    value={gstNo}
                  />
                </div>
              </div>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="number"
                id="bank"
                className="form-control form-control-lg"
                placeholder="Enter Bank Account Number"
                onChange={(e) => setBankAccount(e.target.value)}
                value={bankAccountNo}
              />
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="text"
                id="ifsc"
                className="form-control form-control-lg"
                placeholder="Enter IFSC Number"
                onChange={(e) => setIFSCode(e.target.value)}
                value={ifscNumber}
              />
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="text"
                id="branch"
                className="form-control form-control-lg"
                placeholder="Enter Branch Name"
                onChange={(e) => setBranch(e.target.value)}
                value={branch}
              />
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <textarea
                type="text"
                id="address"
                className="form-control form-control-lg"
                placeholder="Enter Address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
            </div>

                  <div className="col-12">
                    <div className="row">
                      <div className="col-6">
                        <div data-mdb-input-init className="form-outline mb-4">
                          <input
                            type="password"
                            id="password"
                            className="form-control form-control-lg"
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div data-mdb-input-init className="form-outline mb-4">
                          <input
                            type="password"
                            id="confirmpassword"
                            className="form-control form-control-lg"
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
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

                  <hr />

                  <button
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-danger btn-lg btn-block"
                    type="submit"
                  >
                    Deactivate Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EditSellerProfile;
