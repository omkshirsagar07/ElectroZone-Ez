function OrderItem({ order }) {
  return (
    <div>
      <div className="container">
        <div className="card shadow mb-3">
          <div className="card-body">
            <div className="row">
              {/* <div className="col-3">
                <img src={order.product.image ? `data:image/${order.product.imageFormat || 'jpeg'};base64,${order.product.image}` : 'path/to/default-image.jpg'} alt={order.product.name} className="img-fluid img-left" />
              </div> */}
              <div className="col-4">
                <p><strong>{order.product.name}</strong></p>
                <p>Seller: {order.seller.name}</p>
                <p>Price: ₹{(order.product.mrp - order.product.discount)*order.quantity}</p>
              </div>
              <div className="col-4">
                <p>{order.order.delivaryDate ? `Delivered on: ${order.order.delivaryDate}` : `Estimated Delivery: ${order.order.estimateDeliveryDate}`}</p>
              </div>
              <div className="col-4">
                <p>Status: {order.order.orderStatus}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
