import React, { useState } from 'react';
import Address from "./Address";

function AddressList({ addresses, onAddressSelect,selectedAddressId, setSelectedAddressId }) {

  const handleAddressSelect = (id) => {
    setSelectedAddressId(id);
    if (onAddressSelect) {
      onAddressSelect(id); // Call the callback function to notify the parent component
    }
  };

  return (
    <div className="table-responsive" style={{ maxHeight: '170px', overflowY: 'auto' }}>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Select</th>
            <th>Customer Name</th>
            <th>Phone No</th>
            <th>Address</th>
            <th>Landmark</th>
            <th>City, State - Pin Code</th>
          </tr>
        </thead>
        <tbody>
          {addresses.length > 0 ? (
            addresses.map((address) => (
              <tr key={address.id}>
                <td>
                  <input
                    type="radio"
                    name="address"
                    checked={selectedAddressId === address.id}
                    onChange={() => handleAddressSelect(address.id)}
                  />
                </td>
                <td>{address.custName}</td>
                <td>{address.phoneNo}</td>
                <td>{address.addressLine1}, {address.addressLine2}</td>
                <td>{address.landMark}</td>
                <td>{address.city}, {address.state} - {address.pinCode}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No saved addresses found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AddressList;
