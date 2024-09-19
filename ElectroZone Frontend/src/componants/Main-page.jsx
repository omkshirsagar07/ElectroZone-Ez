import BrandList from "./BrandList";
import SimpleSlider from "./Carousel";
import Cart from "./Cart";
import Offers from "./Offers";
import WishList from "./WishList";


function MainPage() {
  return (
    <div>
      <div>
        <SimpleSlider />-
        <br />
        <br />
        {/* OFFERS */}
        <Offers />
        <BrandList />
      </div>
    </div>
  );
}

export default MainPage;
