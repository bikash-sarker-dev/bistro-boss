import React from "react";

const CardPopular = ({ popularItem }) => {
  const { name, image, price, recipe } = popularItem;
  return (
    <div className="flex space-x-4 items-center">
      <div>
        <img className="w-32 rounded-full rounded-tl-none" src={image} alt="" />
      </div>
      <div>
        <h3 className="uppercase">{name}</h3>
        <p>{recipe}</p>
      </div>
      <p>{price}</p>
    </div>
  );
};

export default CardPopular;
