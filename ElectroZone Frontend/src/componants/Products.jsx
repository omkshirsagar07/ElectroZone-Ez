import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";
import ProductList from "./ProductList";
import { getBrands } from "../services/brand";
import { useEffect, useState } from "react";

initMDB({ Dropdown, Collapse });

function Products() {
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceOrder, setPriceOrder] = useState(true);

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      const result = await getBrands();
      if (result) {
        setBrands(result);
      } else {
        console.error('Failed to load brands: ', result.message);
      }
    } catch (error) {
      console.error('Failed to load brands:', error);
    }
  };

  const handleBrandChange = (e) => {
    const brandId = parseInt(e.target.value);
    if (e.target.checked) {
      setSelectedBrands([...selectedBrands, brandId]);
    } else {
      setSelectedBrands(selectedBrands.filter(id => id !== brandId));
    }
  };

  const handlePriceChange = (e) => {
    setPriceOrder(e.target.value);
  };

  return (
    <div className="products-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3">
            <div className="vertical-nav bg-white p-3">
              <div className="accordion accordion-flush" id="accordionFlushExample">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed bg-white text-dark"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                      Filters
                    </button>
                  </h2>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed bg-dark text-white"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                      Brands
                    </button>
                  </h2>
                  <div
                    id="flush-collapseOne"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      {brands.map((brand) => (
                        <div key={brand.id}>
                          <input
                            type="checkbox"
                            name={brand.name}
                            id={brand.id}
                            value={brand.id}
                            onChange={handleBrandChange}
                          />{" "}
                          <label className="font-weight">{brand.name}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed bg-dark text-white"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseTwo"
                      aria-expanded="false"
                      aria-controls="flush-collapseTwo"
                    >
                      Price
                    </button>
                  </h2>
                  <div
                    id="flush-collapseTwo"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      <input
                        type="radio"
                        name="priceOrder"
                        value={true}
                        onChange={handlePriceChange}
                      />{" "}
                      <label>Low To High</label><br />
                      <input
                        type="radio"
                        name="priceOrder"
                        value={false}
                        onChange={handlePriceChange}
                      />{" "}
                      <label>High To Low</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <ProductList selectedBrands={selectedBrands} priceOrder={priceOrder} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
