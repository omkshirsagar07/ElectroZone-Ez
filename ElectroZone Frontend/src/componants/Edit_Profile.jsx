import { useEffect, useState } from "react";
import { fetchProfileData, updateProfileData } from "../services/user";
import { toast } from "react-toastify";

function Edit_Profile() {
  const [name,setName] = useState('')
  const [phoneNo,setPhoneNo] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')

  const fetchInfo = async () => {
    const result = await fetchProfileData(sessionStorage.getItem('id')); // Corrected sessionStorage access
    return result;
  };

  useEffect(() => {
    const fetchData = async () => {
      const prop = await fetchInfo();
      const { name, phoneNo, email } = prop;
      setName(name);
      setPhoneNo(phoneNo);
      setEmail(email);
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
    }else {
      const result = await updateProfileData(sessionStorage.id,name,phoneNo,email,password)
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
            <div className="col-9">
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

export default Edit_Profile;
