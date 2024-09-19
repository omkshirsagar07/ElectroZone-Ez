import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";
import CategoryList from "../componants/CategoryList";
import ProductDetails from "../componants/ProductDetails";
import Navbar from "../componants/Navbar";
import Footer from "../componants/Footer";

initMDB({ Dropdown, Collapse });
function ProductDetailsPage() {

  return (
    <div>
      {/* <!-- Navbar --> */}
      <Navbar />
      <CategoryList />
      <br />
      <ProductDetails />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ProductDetailsPage;
