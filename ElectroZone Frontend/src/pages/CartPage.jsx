import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";
import Cart from "../componants/Cart";
import Navbar from "../componants/Navbar";
import Footer from "../componants/Footer";

initMDB({ Dropdown, Collapse });
function CartPage() {
  return (
    <div>
      {/* <!-- Navbar --> */}
      <Navbar />

      <Cart />

      <br />
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default CartPage;
