import Head from "next/head";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import valid from "../utils/valid";
import { DataContext } from "../store/GlobalState";
import { postData } from "../utils/fetchData";
import { useRouter } from "next/router";

export default function Register() {
  const initialState = { name: "", email: "", password: "", cf_password: "" };
  const [userData, setUserData] = useState(initialState);
  const { name, email, password, cf_password } = userData;
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const router = useRouter();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errMsg = valid(name, email, password, cf_password);
    if (errMsg) return dispatch({ type: "NOTIFY", payload: { error: errMsg } });

    dispatch({ type: "NOTIFY", payload: { loading: true } });
    const res = await postData("auth/register", userData);

    if (res.err) {
      return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    } else {
      await dispatch({ type: "NOTIFY", payload: { success: res.msg } });
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  };

  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push("/");
  }, [auth]);

  return (
    <div className="flex justify-between">
      <Head>
        <title>Register</title>
      </Head>
      <img
        src="https://res.cloudinary.com/dppndtfp8/image/upload/v1631523384/ThinkPro/austin-poon-JO_S6ewBqAk-unsplash_wksujv.jpg"
        alt="img"
        style={{ height: "100vh", width: "50%", objectFit: "cover" }}
      />
      <div className="mx-auto bg-gray-700 w-full">
        <form autoComplete="off" className="form" onSubmit={handleSubmit}>
          <div className="control">
            <h1 className="text-4xl font-semibold text-[#06c1d5]">Register</h1>
          </div>
          <div className="control block-cube block-input">
            <input
              name="name"
              placeholder="Username"
              type="text"
              id="name"
              value={name}
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
              id="password"
              placeholder="Password"
              type="password"
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
          <div className="control block-cube block-input">
            <input
              name="cf_password"
              id="cf_password"
              placeholder="Confirm Password"
              type="password"
              value={cf_password}
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
            <div className="text">Register</div>
          </button>
          <div className="flex mt-3 text-yellow-200">
            <span>Already have an account?</span>
            <Link href="/signin">
              <a className="ml-1 underline">Login here</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
