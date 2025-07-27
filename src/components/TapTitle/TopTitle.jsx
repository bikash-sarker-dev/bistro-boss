import React from "react";
import { Helmet } from "react-helmet-async";

const TopTitle = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default TopTitle;
