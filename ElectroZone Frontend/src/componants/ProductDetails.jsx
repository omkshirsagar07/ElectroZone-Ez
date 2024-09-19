import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById, addReview, getReviewsByProduct, getAverageRating } from '../services/product';
import { addProductToWishlist } from '../services/wishlist';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { addProductToCart } from '../services/cart';
import { toast } from "react-toastify";
import { FaRegHeart, FaHeart, FaShoppingCart, FaCartPlus } from 'react-icons/fa'; // Import the trash icon


function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [userLogin, setUserLogin] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('id') && sessionStorage.getItem('id').length > 0) {
      setUserLogin(true);
    }
  }, []);

  useEffect(() => {
    fetchProduct(id);
    fetchReviews(id);
    fetchAverageRating(id);
  }, [id]);

  useEffect(() => {
    if (product) {
      magnify("myimage", 1.3);
    }
  }, [product]);

  const fetchProduct = async (id) => {
    try {
      const result = await getProductById(id);
      if (result) {
        const productWithImage = {
          ...result,
          image: result.image
            ? `data:image/${result.imageFormat || 'jpeg'};base64,${result.image}`
            : null,
        };
        setProduct(productWithImage);
      } else {
        console.error('Failed to load product details:', result.message);
      }
    } catch (error) {
      console.error('Failed to load product details:', error);
    }
  };

  const fetchReviews = async (productId) => {
    try {
      const result = await getReviewsByProduct(productId);
      setReviews(result);
    } catch (error) {
      console.error('Failed to load reviews:', error);
    }
  };

  const fetchAverageRating = async (productId) => {
    try {
      const result = await getAverageRating(productId);
      setAverageRating(result);
    } catch (error) {
      console.error('Failed to load average rating:', error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      await addReview({
        rating,
        description: reviewText,
        productId: id,
        userId: sessionStorage.getItem('id'), // Replace with actual user ID
      });
      setReviewText('');
      setRating(0);
      fetchReviews(id); // Refresh reviews list
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  const addToWishlist = async () => {
    try {
      const wishlistDTO = {
        productId: id,
        userId: sessionStorage.getItem('id'), // Replace with actual user ID
      };
      await addProductToWishlist(wishlistDTO);
      setIsInWishlist(true);
      toast.success("Product Added to Wishlist Successfully")
    } catch (error) {
      toast.error("Product Failed to Add to Wishlist");
    }
  };

  const addToCart = async () => {
    try {
      const cartDTO = {
        productId: id,
        userId: sessionStorage.getItem('id'), // Replace with actual user ID
        quantity: quantity,
      };
      await addProductToCart(cartDTO);
      setIsInCart(true);
      toast.success("Product Added to Cart Successfully")
    } catch (error) {
      toast.error("Product Failed to Add to Cart");
    }
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);
  const handleRating = (value) => setRating(value);

  const renderStars = (rating) => (
    [...Array(5)].map((_, index) => (
      index < rating ? <FaStar key={index} className="text-warning" /> : <FaRegStar key={index} className="text-warning" />
    ))
  );

  const magnify = (imgID, zoom) => {
    const img = document.getElementById(imgID);
    if (!img) return;

    const glass = document.createElement("DIV");
    glass.setAttribute("class", "img-magnifier-glass");

    img.parentElement.insertBefore(glass, img);

    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";

    const bw = 3;
    const w = glass.offsetWidth / 2;
    const h = glass.offsetHeight / 2;

    const moveMagnifier = (e) => {
      e.preventDefault();
      const pos = getCursorPos(e);
      let x = pos.x;
      let y = pos.y;

      if (x > img.width - (w / zoom)) x = img.width - (w / zoom);
      if (x < w / zoom) x = w / zoom;
      if (y > img.height - (h / zoom)) y = img.height - (h / zoom);
      if (y < h / zoom) y = h / zoom;

      glass.style.left = (x - w) + "px";
      glass.style.top = (y - h) + "px";
      glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
    };

    const getCursorPos = (e) => {
      let a, x = 0, y = 0;
      e = e || window.event;
      a = img.getBoundingClientRect();
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x: x, y: y };
    };

    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);
    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12 mb-4 d-flex">
          <div className="border-0 img-magnifier-container rounded flex-fill d-flex align-items-center">
            <img
              id="myimage"
              src={product.image || 'path/to/default-image.jpg'}
              className="card-img-top rounded"
              alt={product.name}
              style={{ height: '100%', objectFit: 'cover', width: '100%' }}
            />
          </div>


          <div className="col-md-6 d-flex flex-column">
            <div className="card border-0 shadow rounded p-4 flex-fill d-flex flex-column" style={{ height: '100%' }}>
              <div className="flex-grow-1">
                <h2 className="mb-3">{product.name}</h2>
                <h4 className="text-muted">
                  <strike>₹{product.mrp}</strike>
                </h4>
                <h3 className="text-success">₹{product.mrp - product.discount}</h3>
                <p className="mb-3">{product.description}</p>
                <p className="text-muted mb-4">Warranty: {product.warranty} months</p>
              </div>

              <div className="d-flex align-items-center mb-3">
                <button className="btn btn-secondary" onClick={decreaseQuantity}>-</button>
                <input
                  type="text"
                  className="form-control mx-2 text-center"
                  value={quantity}
                  readOnly
                  style={{ width: '60px' }}
                />
                <button className="btn btn-secondary" onClick={increaseQuantity}>+</button>
              </div>

              <div className="text-center mb-3">
                {
                  userLogin && (
                    <>
                      {isInWishlist ? (
                        <button
                          className="btn btn-outline-danger mx-2"
                          onClick={() => navigate('/wishlist')}
                        >
                          <FaHeart size={25} className="text-danger" />
                        </button>
                      ) : (
                        <button
                          className="btn btn-outline-danger mx-2"
                          onClick={addToWishlist}
                        >
                          <FaRegHeart size={25} />
                        </button>
                      )}
                      {isInCart ? (
                        <button
                          className="btn btn-success mx-2"
                          onClick={() => navigate('/cart')}
                        >
                          <FaShoppingCart size={25} />
                        </button>
                      ) : (
                        <button
                          className="btn btn-outline-success mx-2"
                          onClick={addToCart}
                        >
                          <FaCartPlus size={25} />
                        </button>
                      )}
                    </>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card border-0 shadow rounded p-4">
            <h3 className="text-center mb-4">Review Product</h3>
            <form onSubmit={handleSubmitReview}>
              <div className="row mb-4">
                <div className="col-md-12">
                  <div className="d-flex justify-content-center mb-3">
                    {[...Array(5)].map((_, index) => (
                      <button
                        type="button"
                        key={index}
                        className="btn btn-outline-warning"
                        onClick={() => handleRating(index + 1)}
                        style={{ border: 'none', backgroundColor: 'transparent' }}
                      >
                        {rating > index ? <FaStar className="text-warning" /> : <FaRegStar className="text-warning" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <textarea
                  className="form-control"
                  placeholder="Enter Review"
                  rows="4"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary mx-2">Submit</button>
                <button type="button" className="btn btn-secondary" onClick={() => { setReviewText(''); setRating(0); }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card border-0 shadow rounded p-4">
            <h3 className="text-center mb-4">Product Reviews</h3>
            <div className="text-center mb-4">
              <h4>Average Rating:</h4>
              <div className="d-flex justify-content-center">
                {renderStars(Math.round(averageRating))}
              </div>
            </div>
            {reviews.length > 0 ? (
              <div className="table-responsive" style={{ maxHeight: '170px', overflowY: 'auto' }}>
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Rating</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews.map((review) => (
                      <tr key={review.id}>
                        <td>{review.userName}</td>
                        <td>
                          {renderStars(review.rating)}
                        </td>
                        <td>{review.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
