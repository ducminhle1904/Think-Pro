import { useState, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "../../components/Header/Header";
import { getData } from "../../utils/fetchData";
import { DataContext } from "../../store/GlobalState";
import { addToCart } from "../../store/Actions";

const DetailProduct = (props) => {
  const [product] = useState(props.product);
  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;
  return (
    <>
      <Head>
        <title>{product.title}</title>
      </Head>
      <Header />
      <div className="container mx-auto flex mt-20">
        <div className="md:w-1/2 md:pr-6">
          <img src={product.mainImage} alt={product.title} />
        </div>
        <div className="flex flex-col text-sm md:w-1/2">
          <div className="hidden md:block">
            <h1 className="mb-4 font-bold leading-tight text-[2rem]">
              {product.title}
            </h1>
          </div>
          <div className="flex flex-col justify-between mb-2 md:flex-row">
            <div className="flex-1 mb-4">
              <div className="flex items-center mb-3">
                <span>Thương hiệu: {product.brand}</span>
              </div>
              <div className="pr-12">
                <ul>
                  <li className="mb-1">
                    <strong>Vi xử lý: </strong>
                    {product.cpu}
                  </li>
                  <li className="mb-1">
                    <strong>Màn hình: </strong>
                    {product.display}
                  </li>
                  <li className="mb-1">
                    <strong>RAM: </strong>
                    {product.ram}
                  </li>
                  <li className="mb-1">
                    <strong>Card đồ họa: </strong>
                    {product.card}
                  </li>
                  <li className="mb-1">
                    <strong>Lưu trữ: </strong>
                    {product.storage}
                  </li>
                  <li className="mb-1">
                    <strong>Pin: </strong>
                    {product.pin}
                  </li>
                  <li className="mb-1">
                    <strong>Cân nặng: </strong>
                    {product.weight}
                  </li>
                  <li className="mb-1">
                    <strong>Hệ điều hành: </strong>
                    {product.os}
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <div className="mb-4 text-sm">
                <div className="p-4 border border-gray-100 rounded min-w-[262px] max-w-[262px]">
                  <div className="mb-2 text-base font-semibold leading-6">
                    Bảo hành
                  </div>
                  <div>
                    <ul className="pl-4 list-disc">
                      <li>
                        Sản phẩm <strong>chính hãng</strong>
                      </li>
                      <li>
                        Bảo hàng{" "}
                        <strong> 12 tháng tại TTBH Dell Việt Nam</strong>
                      </li>
                      <li>
                        <strong>
                          Áp dụng chính sách Bảo hành tại nhà 24/7 (Hotline:
                          1800 54 54 55)
                        </strong>
                      </li>
                      <li>Đổi mới trong 15 ngày đầu tiiên</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="p-4 text-red-400 border border-gray-100 rounded min-w-[262px] max-w-[262px]">
                Từ 10/08 - 31/08 giảm 550.000đ khi mua Microsoft Office 365 kèm
                laptop.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#dfdede] py-3 fixed bottom-0 z-50 left-0 right-0">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span>Hotline</span>
            <strong className="font-semibold text-2xl">1900.63.3579</strong>
          </div>
          <div className="flex items-center">
            <strong className="text-2xl text-red-500 mr-5">
              Giá từ: {product.price} <u>đ</u>
            </strong>
            <Link href="#">
              <a
                className="flex items-center px-3 md:px-8 py-10px md:py-3 space-x-2 text-sm md:text-lg font-semibold bg-[#06c1d4] text-white rounded-full"
                onClick={() => dispatch(addToCart(product, cart))}
              >
                Thêm vào giỏ hàng
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`product/${id}`);
  return {
    props: {
      product: res.product,
    },
  };
}

export default DetailProduct;
