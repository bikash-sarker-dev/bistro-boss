import React from "react";
import Hero from "../components/hero/Hero";
import Category from "../components/home/category/Category";
import FeatureMenu from "../components/home/featureMenu/FeatureMenu";
import PopularMenu from "../components/home/PopularMenu/PopularMenu";
import Testimonials from "../components/home/testimonials/Testimonials";
import TopTitle from "../components/TapTitle/TopTitle";

const HomePage = () => {
  return (
    <div>
      <TopTitle title="Bistro Boss | Home" />
      <Hero />
      <Category />
      <PopularMenu />
      <FeatureMenu />
      <Testimonials />
    </div>
  );
};

export default HomePage;
