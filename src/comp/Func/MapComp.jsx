import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  };

  return (
    <div className="flex flex-col items-center gap-5 py-5">
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

      <h3 className="text-2xl font-bold text-center text-red-600 mt-12">Details:</h3>
      <div className="text-l text-start font-bold pl-4 text-red-600">{children}</div>
    </div>
  );
};

export default MapComp;
