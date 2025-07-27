import React from "react";

const SectionHead = ({ heading, subHeading }) => {
  return (
    <div className="text-center max-w-sm mx-auto my-16">
      <h4 className="text-[#D99904] mb-2">{subHeading}</h4>
      <h2 className="border-y-4 py-4 font-bold text-3xl ">{heading}</h2>
    </div>
  );
};

export default SectionHead;
