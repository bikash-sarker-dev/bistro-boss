import React from "react";
import { Link } from "react-router-dom";
import Cover from "../../cover/Cover";
import CardPopular from "../../home/PopularMenu/CardPopular";

const MenuCategory = ({ items, title, coverImg, description }) => {
  console.log(items, title, coverImg, description);
  return (
    <>
      {title && (
        <Cover title={title} description={description} coverImg={coverImg} />
      )}
      <div className="container">
        <div className="grid md:grid-cols-2 gap-5 my-20">
          {items.map((popularItem) => (
            <CardPopular key={popularItem._id} popularItem={popularItem} />
          ))}
        </div>
        <Link
          to={`/order/${title}`}
          className="btn btn-outline border-b-4 border-b-black mb-10 "
        >
          Order Now
        </Link>
      </div>
    </>
  );
};

export default MenuCategory;
