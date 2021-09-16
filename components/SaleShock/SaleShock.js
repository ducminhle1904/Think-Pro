import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import ScrollContainer from "react-indiana-drag-scroll";
import { addToCart } from "../../store/Actions";
import { DataContext } from "../../store/GlobalState";

export default function SaleShock({ products }) {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth } = state;
  return (
    <div className="relative mb-10">
      <div className="relative mb-[55px]">
        <h2 className="text-3xl mb-6 font-bold">Giảm giá sốc</h2>
      </div>
      <ScrollContainer className="grid grid-flow-col mb-9" horizontal={true}>
        {products.map(
          (product) =>
            product.sale && (
              <div
                key={product._id}
                className="hover:shadow-2xl transition duration-150 cursor-pointer w-[300px] h-[400px] mx-auto border-[1px]"
              >
                <img
                  src={product.mainImage}
                  alt={product.title}
                  className="w-[250px] h-[200px] object-cover m-auto"
                />
                <div className="px-4 h-[100px]">
                  <Link href={`product/${product._id}`}>
                    <a className="font-semibold">{product.title}</a>
                  </Link>
                  <div className="text-[#d53b2a] font-medium text-lg">
                    {product.price} <u>đ</u>
                  </div>
                </div>

                <div className="p-4 text-center">
                  <Link href="#">
                    <a
                      className="w-full text-white py-3 mb-2 leading-4 font-semibold block rounded-full bg-[#06c1d4]"
                      onClick={() => dispatch(addToCart(product, cart))}
                    >
                      Thêm vào giỏ hàng
                    </a>
                  </Link>
                </div>
              </div>
            )
        )}
      </ScrollContainer>

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
