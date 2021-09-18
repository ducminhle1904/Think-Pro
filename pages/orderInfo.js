import Head from "next/head";
import Header from "../components/Header/Header";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import Link from "next/link";
import { postData } from "../utils/fetchData";
import { useRouter } from "next/router";

export default function orderInfo() {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth, orders } = state;
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);
      setTotal(res);
    };
    getTotal();
  }, [cart]);

  const handleSubmit = async () => {
    if (!name || !address || !mobile)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Please add your address and mobile" },
      });
    dispatch({
      type: "NOTIFY",
      payload: {
        loading: true,
      },
    });

    postData("order", { name, mobile, address, cart, total }, auth.token).then(
      (res) => {
        if (res.err)
          return dispatch({
            type: "NOTIFY",
            payload: { error: res.err },
          });
        dispatch({ type: "ADD_CART", payload: [] });

        const newOrder = {
          ...res.newOrder,
          user: auth.user,
        };
        dispatch({ type: "ADD_ORDERS", payload: [...orders, newOrder] });
        dispatch({ type: "NOTIFY", payload: { success: res.msg } });

        return router.push(`/order/${res.newOrder._id}`);
      }
    );
  };
  return (
    <>
      <Head>
        <title>Đặt hàng | ThinkPro</title>
      </Head>
      <Header />
      <main className="md:pt-6 mb-auto border-t border-gray-100 md:border-t-0">
        <div className="container mx-auto">
          <div className="pt-4 md:pt-0">
            <div>
              <h1 className=" text-xl md:text-[2rem] leading-7 md:leading-10 text-dark-gray font-bold mb-2 md:mb-6">
                Đặt hàng
              </h1>

              <div className="mb-10 flex flex-wrap">
                <div className="w-full md:w-9/12 md:border border-gray-100 md:px-6 md:py-9">
                  <div className="max-w-[760px]">
                    <div className="mb-4">
                      <strong>Thông tin người nhận</strong>
                    </div>
                    <div className="flex flex-wrap mx-4">
                      <div className="px-2 mb-4 w-1/2">
                        <div className="w-full">
                          <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Họ và Tên"
                            className="py-3 px-4 h-[48px] text-[#0e0e0e] rounded bg-gray-50 outline-none w-full"
                          />
                        </div>
                      </div>

                      <div className="px-2 mb-4 w-1/2">
                        <div className="w-full">
                          <input
                            type="text"
                            name="mobile"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            placeholder="Số điện thoại"
                            className="py-3 px-4 h-[48px] text-[#0e0e0e] rounded bg-gray-50 outline-none w-full"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 mb-4">
                      <strong>Địa chỉ</strong>
                    </div>
                    <div className="mx-4">
                      <div className="px-2 mb-4 w-full">
                        <div className="w-full">
                          <input
                            type="text"
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Địa chỉ"
                            className="py-3 px-4 h-[48px] text-[#0e0e0e] rounded bg-gray-50 outline-none w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-3/12 md:border-l md:border-t border-gray-100 md:-ml-px">
                  <div className="border-r-0 md:border-r border border-l-0 border-t-0 border-gray-100 pt-4">
                    <div className="flex justify-between px-4 border-b border-gray-100 pb-4">
                      <div>Đơn hàng ({cart.length} sp)</div>
                      <Link href="/cart">
                        <a className="font-bold">Sửa</a>
                      </Link>
                    </div>
                    <div className="flex flex-col justify-between px-4 py-4 border-b border-gray-100 last:border-t-0">
                      {cart.map((item) => (
                        <div className="flex justify-between">
                          <div className="font-semibold leading-5 text-sm">
                            <span>{item.quantity} x </span> {item.title}
                          </div>
                          <div className="font-primary font-bold leading-5 text-sm">
                            {item.quantity * item.price}
                            <u>đ</u>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="py-4 px-4 space-y-4">
                      <div className="flex justify-between">
                        <div>Tạm tính</div>
                        <div className="font-bold">
                          {total} <u>đ</u>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between border-t border-gray-100 py-5 px-4">
                      <div className="mt-1">Thành tiền: </div>
                      <div className="font-bold text-red-500 text-lg">
                        {total} <u>đ</u>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-6 w-full md:flex items-center md:space-x-8">
            <Link href="#">
              <a
                className="w-[200px] text-white py-3 mb-2 leading-4 font-semibold block rounded-full bg-[#06c1d4]"
                onClick={handleSubmit}
              >
                Thanh toán
              </a>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
