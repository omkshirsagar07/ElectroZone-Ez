import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";
import CategoryList from "../componants/CategoryList";
import MainPage from "../componants/Main-page";
import Footer from "../componants/Footer";
import Navbar from "../componants/Navbar";

initMDB({ Dropdown, Collapse });
function Home() {

  return (
    <div>
      {/* <!-- Navbar --> */}

      <Navbar />

      <CategoryList />
      <MainPage />

      <br />
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
