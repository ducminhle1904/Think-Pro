import React, { useContext } from "react";
import Link from "next/link";
import { SearchIcon, MenuIcon, UserCircleIcon } from "@heroicons/react/solid";
import "reactjs-popup/dist/index.css";
import { DataContext } from "../../store/GlobalState";
import Cookie from "js-cookie";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);
  const { auth, cart } = state;
  const handleLogout = () => {
    Cookie.remove("refreshtoken", { path: "api/auth/accessToken" });
    localStorage.removeItem("firstLogin");
    dispatch({ type: "AUTH", payload: {} });
    dispatch({ type: "NOTIFY", payload: { success: "Logged out" } });
    return router.push("/");
  };
  return (
    <header className="top-0 w-screen z-50 shadow-sm p-5 md:px-10 transition duration-100">
      <div className="container relative mx-auto w-full grid grid-cols-3">
        <div className="flex items-center">
          <Link href="/">
            <a>
              <img src="https://thinkpro.vn/images/logo.svg" alt="logo" />
            </a>
          </Link>

          <div className="ml-6 min-w-[220px]">
            <ul className="flex justify-between items-center text-lg">
              <li className="cursor-pointer relative leading-8 w-20 text-center">
                Laptop
              </li>
              <li className="cursor-pointer relative leading-8 w-20 text-center">
                PC
              </li>
              <li className="cursor-pointer relative leading-8 w-20 text-center">
                Phụ kiện
              </li>
            </ul>
          </div>
        </div>
        <div className="ml-10 flex items-center md:border-[1px] rounded-full py-[6px] md:shadow-sm">
          <input
            type="text"
            placeholder="Tìm kiếm trên ThinkPro"
            className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-400 placeholder-gray-400"
          />
          <SearchIcon className="hidden md:inline-flex h-8 bg-[#06c1d5] text-white rounded-full p-2 cursor-pointer md:mx-2" />
        </div>
        <ul className="flex items-center space-x-10 ml-auto text-gray-700 z-50">
          <li className="relative">
            <Link href="#">
              <a className="w-[56px] h-[56px] hover:bg-gray-100 hover:text-[#06c1d5] rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </a>
            </Link>
          </li>
          <li className="relative">
            <Link href="#">
              <a className="w-[56px] h-[56px] hover:bg-gray-100 hover:text-[#06c1d5] rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </a>
            </Link>
            <span className="absolute font-semibold text-xs flex items-center justify-center w-6 h-6 rounded-full top-[2px] left-[35px] bg-[#06c1d5]">
              {cart.length}
            </span>
          </li>
          <li className="relative group">
            {Object.keys(auth).length === 0 ? (
              <Link href="/signin">
                <a className="w-[56px] h-[56px] hover:bg-gray-100 hover:text-[#06c1d5] rounded-full flex items-center justify-center">
                  <UserCircleIcon className="h-7 w-7" />
                </a>
              </Link>
            ) : (
              <img
                src={auth.user.avatar}
                alt={auth.user.name}
                style={{
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                  marginRight: "5px",
                  objectFit: "cover",
                }}
                onClick={() => handleLogout()}
              />
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}
