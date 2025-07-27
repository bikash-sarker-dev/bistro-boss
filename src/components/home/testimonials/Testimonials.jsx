import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionHead from "../../header/sectionHead/SectionHead";

const Testimonials = () => {
  const [review, setReview] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/reviews").then(({ data }) => {
      setReview(data);
    });
  }, []);

  return (
    <section>
      <div className="container">
        <SectionHead
          heading="TESTIMONIALS"
          subHeading="---What Our Clients Say---"
        />
        <div>
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            {review.map((reviewItem) => (
              <SwiperSlide key={reviewItem._id}>
                <div className="mx-32 my-32">
                  <div>
                    <Rating
                      style={{ maxWidth: 180 }}
                      value={reviewItem.rating}
                      readOnly
                    />
                  </div>
                  <p>{reviewItem.details}</p>
                  <h3>{reviewItem.name}</h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
