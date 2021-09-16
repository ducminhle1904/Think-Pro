import React from "react";
import Link from "next/link";
import ScrollContainer from "react-indiana-drag-scroll";

export default function Laptop({ products }) {
  const productsArr = products.slice(1, 11);
  return (
    <div className="relative mb-10">
      <div className="relative mb-[55px]">
        <h2 className="text-3xl mb-6 font-bold">Máy tính xách tay</h2>
      </div>

      <div className="flex items-center">
        <div className="font-semibold mr-4">Thương hiệu</div>
        <ScrollContainer className="grid grid-flow-col" horizontal={true}>
          <div className="w-[115px] mr-2">
            <Link href="#">
              <a className="inline-block w-full border-[1px] rounded-lg hover:border-[#06c1d4]">
                <img
                  src="https://lumen.thinkpro.vn/backend/uploads/brand/icon/2020/8/7/lenovo.png"
                  alt="lenovo"
                />
              </a>
            </Link>
          </div>
          <div className="w-[115px] mr-2">
            <Link href="#">
              <a className="inline-block w-full border-[1px] rounded-lg hover:border-[#06c1d4]">
                <img
                  src="https://lumen.thinkpro.vn/backend/uploads/brand/icon/2020/8/7/razer.png"
                  alt="razer"
                />
              </a>
            </Link>
          </div>
          <div className="w-[115px] mr-2">
            <Link href="#">
              <a className="inline-block w-full border-[1px] rounded-lg hover:border-[#06c1d4]">
                <img
                  src="https://lumen.thinkpro.vn/backend/uploads/brand/icon/2020/8/7/dell.png"
                  alt="dell"
                />
              </a>
            </Link>
          </div>
          <div className="w-[115px] mr-2">
            <Link href="#">
              <a className="inline-block w-full border-[1px] rounded-lg hover:border-[#06c1d4]">
                <img
                  src="https://lumen.thinkpro.vn/backend/uploads/brand/icon/2020/8/7/asus.png"
                  alt="asus"
                />
              </a>
            </Link>
          </div>
          <div className="w-[115px] mr-2">
            <Link href="#">
              <a className="inline-block w-full border-[1px] rounded-lg hover:border-[#06c1d4]">
                <img
                  src="https://lumen.thinkpro.vn/backend/uploads/brand/icon/2020/8/7/hp.png"
                  alt="hp"
                />
              </a>
            </Link>
          </div>
          <div className="w-[115px] mr-2">
            <Link href="#">
              <a className="inline-block w-full border-[1px] rounded-lg hover:border-[#06c1d4]">
                <img
                  src="https://lumen.thinkpro.vn/backend/uploads/brand/icon/2020/8/7/microsoft.png"
                  alt="microsoft"
                />
              </a>
            </Link>
          </div>
          <div className="w-[115px] mr-2">
            <Link href="#">
              <a className="inline-block w-full border-[1px] rounded-lg hover:border-[#06c1d4]">
                <img
                  src="https://lumen.thinkpro.vn/backend/uploads/brand/icon/2020/8/7/apple.png"
                  alt="apple"
                />
              </a>
            </Link>
          </div>
          <div className="w-[115px] mr-2">
            <Link href="#">
              <a className="inline-block w-full border-[1px] rounded-lg hover:border-[#06c1d4]">
                <img
                  src="https://lumen.thinkpro.vn/backend/uploads/brand/icon/2020/9/24/5f6c4ee7ed9fd_1600933607.png"
                  alt="msi"
                />
              </a>
            </Link>
          </div>
          <div className="w-[115px] mr-2">
            <Link href="#">
              <a className="inline-block w-full border-[1px] rounded-lg hover:border-[#06c1d4]">
                <img
                  src="https://lumen.thinkpro.vn/backend/uploads/brand/icon/2020/8/7/acer.png"
                  alt="acer"
                />
              </a>
            </Link>
          </div>
          <div className="w-[115px] mr-2">
            <Link href="#">
              <a className="inline-block w-full border-[1px] rounded-lg hover:border-[#06c1d4]">
                <img
                  src="https://lumen.thinkpro.vn/backend/uploads/brand/icon/2020/8/7/lg.png"
                  alt="lg"
                />
              </a>
            </Link>
          </div>
        </ScrollContainer>
      </div>
      <div className="flex flex-wrap">
        {productsArr.map((product) => (
          <div
            key={product._id}
            className="w-[20%] flex flex-col border-[1px] hover:shadow-md cursor-pointer"
          >
            <div className="px-2 pt-2 md:px-4 md:pt-4 mb-2">
              <img
                src={product.mainImage}
                alt={product.title}
                className="w-[200px] h-[150px] md:w-[250px] md:h-[200px] object-cover m-auto"
              />
              <div className="px-4 h-[100px]">
                <Link href={`product/${product._id}`}>
                  <a className="font-semibold">{product.title}</a>
                </Link>
                <div className="text-[#d53b2a] font-medium text-lg">
                  Giá từ: {product.price} <u>đ</u>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center ">
        <Link href="#">
          <a className="font-bold mt-6 h-12 leading-[44px] inline-block text-[#414956] px-8 rounded-3xl border-[1px] hover:text-white hover:bg-[#06c1d5] transition delay-75">
            {" "}
            Xem tất cả
          </a>
        </Link>
      </div>
    </div>
  );
}
