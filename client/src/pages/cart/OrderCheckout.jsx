import React from "react";

const OrderCheckout = ({ items = [] }) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-medium mt-4">
        Paying with pay on Delivery/Cash on Delivery
      </h2>
      <p>
        Scan and pay at delivery with cartify pay UPI and win reword up to 500
      </p>
      <h2 className="text-xl font-medium mt-4">Delivering At</h2>
      <p className="capitalize">
        Addres here
        {/* {Object.values(formData).join(", ").toLowerCase()} */}
      </p>
      <p></p>
      <h2 className="text-xl font-medium mt-4">
        Guaranteed Delivery: Tomorrow 7 pm - 12 pm
      </h2>
      {items?.map((i) => {
        const { title, _id, thumbnail, price } = i.productId;
        return (
          <div
            key={_id}
            className="flex items-center gap-5 p-1 border-b border-gray-300">
            <img src={thumbnail} alt={title} width={100} />
            <div className="text-sm">
              <p className="font-medium">{title}</p>
              <p>
                Unit Price: : ${price} x {i.quantity}
              </p>
              <p>Totals: ${(price * i.quantity).toFixed(2)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderCheckout;
