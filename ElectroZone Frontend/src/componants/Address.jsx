function Address({ address }) {
    return (
      <div className="card mb-3">
        <div className="card-body">
          <h5>{address.custName}</h5>
          <p>{address.phoneNo}</p>
          <p>{address.addressLine1}, {address.addressLine2}</p>
          <p>{address.landMark}</p>
          <p>{address.city}, {address.state} - {address.pinCode}</p>
        </div>
      </div>
    );
  }
  
  export default Address;
  