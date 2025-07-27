import React from "react";

import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import slide1 from "../../../assets/home/slide1.jpg";
import slide2 from "../../../assets/home/slide2.jpg";
import slide3 from "../../../assets/home/slide3.jpg";
import slide4 from "../../../assets/home/slide4.jpg";
import slide5 from "../../../assets/home/slide5.jpg";
import SectionHead from "../../header/sectionHead/SectionHead";

const Category = () => {
  return (
    <section>
      <SectionHead
        heading="ORDER ONLINE"
        subHeading="---From 11:00am to 10:00pm---"
      />
      <div>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src={slide1} alt="" />
            <h3 className="text-4xl text-center -mt-16 text-white">salads</h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide2} alt="" />
            <h3 className="text-4xl text-center -mt-16 text-white">salads</h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide3} alt="" />
            <h3 className="text-4xl text-center -mt-16 text-white">salads</h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide4} alt="" />
            <h3 className="text-4xl text-center -mt-16 text-white">salads</h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide5} alt="" />
            <h3 className="text-4xl text-center -mt-16 text-white">salads</h3>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Category;
