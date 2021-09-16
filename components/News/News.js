import React from "react";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function News() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <div className="homepage z-10">
      <div className="flex mb-[55px] justify-center">
        <div className="w-[800px] rounded-md overflow-hidden">
          <Slider {...settings}>
            <div>
              <img
                src="https://res.cloudinary.com/dppndtfp8/image/upload/v1631779188/ThinkPro/Trung_thu_808x288_zlvvfb_ziyxgw.jpg"
                alt="trungthu"
              />
            </div>
            <div>
              <img
                src="https://res.cloudinary.com/dppndtfp8/image/upload/v1631779135/ThinkPro/808x288_copy_efq9dj_eh9rka.jpg"
                alt="trungthu"
              />
            </div>
            <div>
              <img
                src="https://res.cloudinary.com/dppndtfp8/image/upload/v1631779279/ThinkPro/808x288-2_copy_rdyepy_eg1z3y.jpg"
                alt="trungthu"
              />
            </div>
            <div>
              <img
                src="https://res.cloudinary.com/dppndtfp8/image/upload/v1631779247/ThinkPro/KV_back2school-808x288_copy_gkt9ib_ziuyxa.jpg"
                alt="trungthu"
              />
            </div>
          </Slider>
        </div>
        <div className="w-[415px] pl-6">
          <h3 className="relative text-base h-20 leading-5 px-5 py-2 mb-2 bg-[#242368] rounded-md font-semibold text-white flex items-center before:content-[''] before:bg-[#06c1d4] before:h-[5px] before:absolute before:w-full before:left-0 before:bottom-0 after:content-[''] after:bg-[#06c1d4] after:w-[5px] after:absolute after:h-full after:left-0 after:bottom-0 cursor-pointer">
            Trung Thu Kiểu Mới - Quà Tặng Phơi Phới Cùng ThinkPro
          </h3>
          <h3 className="text-base h-20 leading-5 px-5 py-2 mb-2 bg-gray-200 rounded-md flex items-center cursor-pointer">
            Dell Inspiron 15 7501: Sự khác biệt tạo nên điều đỉnh cao
          </h3>
          <h3 className="text-base h-20 leading-5 px-5 py-2 mb-2 bg-gray-200 rounded-md flex items-center cursor-pointer">
            Màn hình OLED trên laptop giá rẻ: Được thế nào? Mất ra sao?
          </h3>
          <div className="text-lg text-left px-5 py-2 font-semibold flex items-center">
            <Link href="#">
              <a>Tất cả tin tức</a>
            </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#06c1d4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
