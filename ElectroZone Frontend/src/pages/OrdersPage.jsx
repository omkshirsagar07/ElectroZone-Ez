import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";
import CategoryList from "../componants/CategoryList";
import OrderItems from "../componants/OrderItems";
import Navbar from "../componants/Navbar";
import Footer from "../componants/Footer";

initMDB({ Dropdown, Collapse });
function OrdersPage() {

  return (
    <div>
      {/* <!-- Navbar --> */}
      <Navbar />

      <CategoryList />
      <br />
      <OrderItems userId={sessionStorage.getItem('id')} />
      <br />
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default OrdersPage;
