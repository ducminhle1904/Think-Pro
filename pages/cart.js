import Head from "next/head";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import { increase, decrease, deleteItem } from "../store/Actions";
import Header from "../components/Header/Header";
import Link from "next/link";
import { getData, postData } from "../utils/fetchData";

const Cart = () => {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth, orders } = state;
  const [total, setTotal] = useState(0);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);
      setTotal(res);
    };
    getTotal();
  }, [cart]);

  useEffect(() => {
    const cartLocal = JSON.parse(localStorage.getItem("next_cart"));
    if (cartLocal && cartLocal.length > 0) {
      let newArr = [];
      const updateCart = async () => {
        for (const item of cartLocal) {
          const res = await getData(`product/${item._id}`);
          const { _id, title, mainImage, price, inStock, sold } = res.product;
          if (inStock > 0) {
            newArr.push({
              _id,
              title,
              mainImage,
              price,
              inStock,
              sold,
              quantity: item.quantity > inStock ? 1 : item.quantity,
            });
          }
        }
        dispatch({ type: "ADD_CART", payload: newArr });
      };
      updateCart();
    }
  }, [callback]);

  const handlePayment = async () => {
    let newCart = [];
    for (const item of cart) {
      const res = await getData(`product/${item._id}`);
      if (res.product.inStock - item.quantity >= 0) {
        newCart.push(item);
      }
    }
    if (newCart.length < cart.length) {
      setCallback(!callback);
      return dispatch({
        type: "NOTIFY",
        payload: {
          error: "The product is out of stock or the quantity is insufficient",
        },
      });
    }
  };
  if (cart.length === 0) return <h2>Cart is empty</h2>;
  return (
    <>
      <Head>
        <title>Gi??? h??ng</title>
      </Head>
      <Header />
      <main className="md:pt-6 mb-auto border-t border-gray-100 md:border-t-0">
        <div className="container mx-auto">
          <div className="pt-4 md:pt-0">
            <div>
              <h1 className=" text-xl md:text-[2rem] leading-7 md:leading-10 text-dark-gray font-bold mb-2 md:mb-6">
                Gi??? h??ng ({cart.length})
              </h1>
            </div>

            <div className="md:flex flex-wrap mb-8 md:mb-14">
              <div className="md:w-9/12">
                <div className="md:border border-gray-100">
                  <div className="px-0 md:px-4 py-4 border-b border-gray-100 last:border-b-0">
                    <div className="flex flex-col">
                      {cart.map((item) => (
                        <div
                          className="flex items-center border-b-[1px]"
                          key={item._id}
                        >
                          <div className="mr-6 w-20 h-20 md:w-[168px] md:h-[168px] border-r-[1px] flex items-center">
                            <Link href={`product/${item._id}`}>
                              <a>
                                <img src={item.mainImage} alt={item.title} />
                              </a>
                            </Link>
                          </div>

                          <div className="flex-1 space-y-2">
                            <h3 className="text-base md:text-xl font-semibold">
                              <Link href={`product/${item._id}`}>
                                <a>{item.title}</a>
                              </Link>
                            </h3>
                            <h2>
                              Gi??: {item.price} <u>??</u>
                            </h2>
                            {item.inStock > 0 ? (
                              <p className="mb-1 text-danger">
                                In stock: {item.inStock}
                              </p>
                            ) : (
                              <p className="mb-1 text-danger">Out of stock</p>
                            )}
                            <span>???? b??n: {item.sold}</span>
                          </div>

                          <div className="flex flex-col items-center">
                            <div className="flex items-center">
                              <button
                                className="text-2xl"
                                onClick={() =>
                                  dispatch(decrease(cart, item._id))
                                }
                                disabled={item.quantity === 1 ? true : false}
                              >
                                -
                              </button>
                              <span className="px-4">{item.quantity}</span>{" "}
                              <button
                                className="text-2xl"
                                onClick={() =>
                                  dispatch(increase(cart, item._id))
                                }
                                disabled={
                                  item.quantity === item.inStock ? true : false
                                }
                              >
                                +
                              </button>
                            </div>
                            <div
                              className="cursor-pointer"
                              onClick={() =>
                                dispatch(deleteItem(cart, item._id, "ADD_CART"))
                              }
                            >
                              X??a
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-3/12 md:-ml-px">
                <div className="py-4 space-y-4 border-t md:border border-gray-100">
                  <div className="flex justify-between px-0 md:px-4 border-b border-gray-100 pb-4">
                    <div className="font-bold text-sm">T???m t??nh: </div>
                    <div className="text-base">
                      {total} <u>??</u>
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-0 md:px-4 border-b border-gray-100 pb-4">
                    <div className="font-bold text-sm">Th??nh ti???n: </div>
                    <div className="text-lg text-red-400 font-bold">
                      {total} <u>??</u>
                    </div>
                  </div>
                  <div className="px-0 md:px-4">
                    <Link href={auth.user ? "/orderInfo" : "/signin"}>
                      <a
                        className="mb-4 block w-full px-8 py-3 rounded-full bg-[#06c1d5] text-white text-base font-bold text-center"
                        onClick={handlePayment}
                      >
                        Ti???n h??nh ?????t h??ng
                      </a>
                    </Link>

                    <Link href="#">
                      <a className="block w-full px-8 py-3 rounded-full bg-white text-gray-600 border border-gray-100 text-base font-bold text-center">
                        T??nh tr??? g??p
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Cart;
