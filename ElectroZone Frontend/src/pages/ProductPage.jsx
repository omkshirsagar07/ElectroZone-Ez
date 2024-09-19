import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";
import CategoryList from "../componants/CategoryList";
import Products from "../componants/Products";
import Navbar from "../componants/Navbar";
import Footer from "../componants/Footer";

initMDB({ Dropdown, Collapse });
function ProductPage() {

  return (
    <div>
      {/* <!-- Navbar --> */}
      <Navbar />
      <CategoryList />
      <br />
      <Products />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ProductPage;
