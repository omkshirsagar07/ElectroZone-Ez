import Navbar from "../componants/Navbar";
import Footer from "../componants/Footer";
import Wishlist from "../componants/WishList";
function WishlistPage() {

  return (
    <div>
      {/* <!-- Navbar --> */}
      <Navbar />
      <Wishlist />

      <br />
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default WishlistPage;
