import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";
import CategoryList from "../componants/CategoryList";
import Edit_Profile from "../componants/Edit_Profile";
import Footer from "../componants/Footer";
import Navbar from "../componants/Navbar";

initMDB({ Dropdown, Collapse });
function EditProfilePage() {

  return (
    <div>
      {/* <!-- Navbar --> */}

      <Navbar />

      <CategoryList />
      {/* <MainPage /> */}
      <Edit_Profile />

      <br />
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default EditProfilePage;
