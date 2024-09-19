import { useState } from "react";
import { toast } from "react-toastify";
import { additionalInfo } from "../services/seller";

function MandatoryInfo() {
  const [GSTINNo,setGSTINNo] = useState('')
  const [bankAccount,setBankAccount] = useState('')
  const [IFSCode,setIFSCode] = useState('')
  const [branch,setBranch] = useState('')
  const [address,setAddress] = useState('')

  const onSubmit = async () => {
    if(GSTINNo.length === 0){
      toast.warning("GST Number is mandatory")
    }else if(GSTINNo.length < 15){
      toast.warning("Bank Account Number is mandatory")
    }
    else if(bankAccount.length === 0){
      toast.warning("Bank Account Number is mandatory")
    }else if(IFSCode.length === 0){
      toast.warning("IFSC Number is mandatory")
    }else if(branch.length === 0){
      toast.warning("Branch is mandatory")
    }else if(address.length === 0){
      toast.warning("Address is mandatory")
    }else{
      try {
        const result = await additionalInfo(sessionStorage.getItem('sellerId'),GSTINNo,bankAccount,IFSCode,branch,address)
        if(result.status === 200){
          toast.success("Additional Information Submitted. Now, you can add Products")
        }
      } catch (error) {
        
      }
    }
  } 

  return (
    <div className="col-lg-12 mb-5 mb-lg-0">
      <div className="card">
        <div className="card-body py-5 px-md-5 bg-dark text-white justify-content-center">
          <div style={{ textAlign: "center" }}>
            <h3>Additional Information</h3>
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
                    placeholder="Enter GSTIN Number"
                    onChange={(e) => setGSTINNo(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="number"
                id="form3Example3"
                className="form-control"
                placeholder="Enter Bank Account Number"
                onChange={(e) => setBankAccount(e.target.value)}
              />
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="text"
                id="form3Example4"
                className="form-control"
                placeholder="Enter IFSC Number"
                onChange={(e) => setIFSCode(e.target.value)}
              />
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="text"
                id="form3Example4"
                className="form-control"
                placeholder="Enter Branch Name"
                onChange={(e) => setBranch(e.target.value)}
              />
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <textarea
                type="text"
                id="form3Example4"
                className="form-control"
                placeholder="Enter Address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            {/* <!-- Submit button --> */}
            <button
              type="submit"
              data-mdb-button-init
              data-mdb-ripple-init
              className="btn btn-success btn-block mb-4 align-items-center"
              onClick={onSubmit}
            >
              Submit
            </button>
        </div>
      </div>
    </div>
  );
}

export default MandatoryInfo;