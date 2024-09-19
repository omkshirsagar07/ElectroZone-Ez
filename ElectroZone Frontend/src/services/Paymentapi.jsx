import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function PaymentApi({ selectedAddressId }) {

  const grandTotal = useSelector(state => state.grandTotal);

  const amount = parseInt(grandTotal)

  const navigate = useNavigate();

  const Pay = () => {
    if (selectedAddressId != null) {


      var options = {
        key: "rzp_test_KfkSVTMrjRudas",
        key_secret: "WkTAxsYbM61XV2zLioGlRphd",
        currency: "INR",
        amount: amount * 100,
        name: "STARTUP_PROJECTS",
        description: "for testing purpose",
        handler: function (response) {
          toast.success("Your Order Is Placed");
          const res = axios.post(`http://localhost:8080/order/checkout`, {
            userId: sessionStorage.getItem('id'),
            addressId: selectedAddressId,
          });
          navigate("/")
        },
        prefill: {
          name: "ElectroZone",
          email: "admin@gmail.com",
          contact: "7904425033",
        },
        notes: {
          address: "Razorpay Corporate office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var pay = new window.Razorpay(options);
      const resp = pay.open();
      console.log(resp)
    }
    else {
      toast.error("Please Select Address");
    }


  }
  return <div>
    <button className="btn btn-success col-12" onClick={Pay}>
      Proceed to Pay
    </button>
  </div>
}

export default PaymentApi