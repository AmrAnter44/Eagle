import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom Arrow Components
const NextArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
      aria-label="Next slide"
    >
      <i className="fa-solid fa-chevron-right text-xl"></i>
    </button>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
      aria-label="Previous slide"
    >
      <i className="fa-solid fa-chevron-left text-xl"></i>
    </button>
  );
};

const MapComp = ({ src, alt, children }) => {
  // لو src Array => هنعرض سلايدر
  const isArray = Array.isArray(src);

  const settings = {
    customPaging: function (i) {
      return (
        <img
          src={src[i]}
          alt={`thumb-${i}`}
          className="w-16 h-12 object-cover rounded"
        />
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="flex flex-col items-center gap-5 py-5 my-20">
      {isArray ? (
        <div className="w-full max-w-2xl">
          <Slider {...settings}>
            {src.map((s, index) => (
              <div key={index}>
                <img
                  src={s}
                  alt={`${alt}-${index}`}
                  className="w-full h-auto object-cover rounded-lg "
                />
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <img src={src} alt={alt} className="w-128 h-128 object-cover" />
      )}

     
      <div className="text-l text-start font-bold pl-4 text-red-600">{children}</div>
    </div>
  );
};

export default MapComp;
