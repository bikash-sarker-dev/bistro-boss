import React from "react";
import OrderCard from "./OrderCard";

const TabOrder = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {items.map((item) => (
        <OrderCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default TabOrder;
