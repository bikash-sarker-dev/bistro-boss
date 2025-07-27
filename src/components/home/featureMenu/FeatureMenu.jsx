import React from "react";
import featureImg from "../../../assets/home/featured.jpg";
import SectionHead from "../../header/sectionHead/SectionHead";
import "./feature.css";

const FeatureMenu = () => {
  return (
    <section className="featuresItem text-white pt-16 pb-32 ">
      <div className="container">
        <SectionHead heading="FROM OUR MENU" subHeading="---Check it out---" />
        <div className="md:flex items-center gap-5">
          <div>
            <img className="max-w-md" src={featureImg} alt="" />
          </div>
          <div className="space-y-3 md:pr-40">
            <h3 className="text-lg font-semibold">
              March 20, 2023 WHERE CAN I GET SOME?
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              voluptate facere, deserunt dolores maiores quod nobis quas quasi.
              Eaque repellat recusandae ad laudantium tempore consequatur
              consequuntur omnis ullam maxime tenetur.
            </p>
            <button className="btn btn-outline border-b-4 border-b-amber-50 text-white">
              Order Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureMenu;
