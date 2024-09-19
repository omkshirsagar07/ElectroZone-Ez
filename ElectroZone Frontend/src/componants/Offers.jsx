import React from "react";
import image1 from "../images/sale1.jpg";
import image2 from "../images/hdfc.jpg";
import image3 from "../images/hdfc1.jpg";

function Offers() {
  return (
    <div>
      <div
        className="card bg-dark col-12 container"
        style={{
          height: 330,
          borderRadius: 20,
          overflow: 'hidden', // Ensure the image stays within the card's border radius
        }}
      >
        <img
          src={image1}
          alt="Offer 1"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover', // Makes sure the image covers the card without stretching
          }}
        />
      </div>
      <br />
      <div className="container">
        <div className="row">
          <div
            className="card bg-dark col-6"
            style={{
              height: 150,
              borderRadius: 20,
              overflow: 'hidden',
            }}
          >
            <img
              src={image2}
              alt="Offer 2"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>

          <div
            className="card bg-dark col-6"
            style={{
              height: 150,
              borderRadius: 20,
              overflow: 'hidden',
            }}
          >
            <img
              src={image3}
              alt="Offer 3"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Offers;
