import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";
import CategoryList from "../componants/CategoryList";
import AddAddress from "../componants/Add-Address";
import Footer from "../componants/Footer";
import Navbar from "../componants/Navbar";

initMDB({ Dropdown, Collapse });
function AddressInfoPage() {

  return (
    <div>
      {/* <!-- Navbar --> */}

      <Navbar />

      <CategoryList />
      {/* <MainPage /> */}
      <AddAddress />

      <br />
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default AddressInfoPage;
