import Head from "next/head";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import { postData } from "../utils/fetchData";
import { useRouter } from "next/router";
import Cookie from "js-cookie";

export default function Signin() {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;
  const { state, dispatch } = useContext(DataContext);
  const router = useRouter();
  const { auth } = state;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    const res = await postData("auth/signin", userData);

    if (res.err)
      return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    dispatch({ type: "NOTIFY", payload: { success: res.msg } });

    dispatch({
      type: "AUTH",
      payload: { token: res.access_token, user: res.user },
    });

    Cookie.set("refreshtoken", res.refresh_token, {
      path: "api/auth/accessToken",
      expires: 7,
    });
    localStorage.setItem("firstLogin", true);
  };

  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push("/");
  }, [auth]);

  return (
    <div className="flex">
      <Head>
        <title>Sign In</title>
      </Head>
      <img
        src="https://res.cloudinary.com/dppndtfp8/image/upload/v1631778894/ThinkPro/austin-poon-JO_S6ewBqAk-unsplash_wksujv_wjaslt.jpg"
        alt="img"
        style={{ height: "100vh", width: "50%", objectFit: "cover" }}
      />
      <div className="mx-auto bg-gray-700 w-full">
        <form autoComplete="off" className="form" onSubmit={handleSubmit}>
          <div className="control">
            <h1 className="text-4xl font-semibold text-[#06c1d5]">Sign In</h1>
          </div>
          <div className="control block-cube block-input">
            <input
              name="email"
              placeholder="Email"
              type="email"
              id="email"
              value={email}
              onChange={handleChangeInput}
            />
            <div className="bg-top">
              <div className="bg-inner"></div>
            </div>
            <div className="bg-right">
              <div className="bg-inner"></div>
            </div>
            <div className="bg">
              <div className="bg-inner"></div>
            </div>
          </div>
          <div className="control block-cube block-input">
            <input
              name="password"
              placeholder="Password"
              type="password"
              id="password"
              value={password}
              onChange={handleChangeInput}
            />
            <div className="bg-top">
              <div className="bg-inner"></div>
            </div>
            <div className="bg-right">
              <div className="bg-inner"></div>
            </div>
            <div className="bg">
              <div className="bg-inner"></div>
            </div>
          </div>
          <button className="btn block-cube block-cube-hover" type="submit">
            <div className="bg-top">
              <div className="bg-inner"></div>
            </div>
            <div className="bg-right">
              <div className="bg-inner"></div>
            </div>
            <div className="bg">
              <div className="bg-inner"></div>
            </div>
            <div className="text">Log In</div>
          </button>
          <div className="flex mt-3 text-yellow-200">
            <span>Don't have an account?</span>
            <Link href="/register">
              <a className="ml-1 underline ">Register here</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
