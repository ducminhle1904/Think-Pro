import Header from "../components/Header/Header";
import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import valid from "../utils/valid";
import { patchData } from "../utils/fetchData";
import { imageUpload } from "../utils/imageUpload";
import Link from "next/link";

export default function Profile() {
  const initialState = {
    avatar: "",
    email: "",
    name: "",
    password: "",
    cf_password: "",
  };
  const [data, setData] = useState(initialState);
<<<<<<< HEAD
  const { avatar, email, name, password, cf_password } = data;
=======
  const { avatar,email, name, password, cf_password } = data;
>>>>>>> 363a9ac2c89320c16922e48bbaceb86581cc256e
  const { state, dispatch } = useContext(DataContext);
  const { auth, notify, orders } = state;

  useEffect(() => {
    if (auth.user)
      setData({ ...data, name: auth.user.name, email: auth.user.email });
  }, [auth.user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (password) {
      const errMsg = valid(name, auth.user.email, password, cf_password);
      if (errMsg)
        return dispatch({ type: "NOTIFY", payload: { error: errMsg } });
      updatePassword();
    }
    if (name !== auth.user.name || avatar) updateInfo();
  };

  const updatePassword = (e) => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    patchData("user/resetPassword", { password }, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  const updateInfo = async (e) => {
    let media;
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    if (avatar) media = await imageUpload([avatar]);
    patchData(
      "user",
      {
        name,
        avatar: avatar ? media[0].url : auth.user.avatar,
      },
      auth.token
    ).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      dispatch({
        type: "AUTH",
        payload: {
          token: auth.token,
          user: res.user,
        },
      });
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  const changeAvatar = (e) => {
    const file = e.target.files[0];
    if (!file)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "File does not exist" },
      });
    if (file.size > 1024 * 1024)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "The largest image is 1MB" },
      });
    if (file.type !== "image/jpeg" && file.type !== "image/png")
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Image format is incorrect" },
      });
    setData({ ...data, avatar: file });
  };

  if (!auth.user) return null;

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Header />
      <div className="container mx-auto mt-12">
        <div className="w-1/2 mx-auto">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        placeholder="Your name"
                        onChange={handleChange}
                        autoComplete="given-name"
                        className="mt-1 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        value={email}
                        disabled={true}
                        onChange={handleChange}
                        autoComplete="family-name"
                        className="mt-1 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-6 mt-4">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={handleChange}
                        autoComplete="given-name"
                        className="mt-1 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        name="cf_password"
                        id="cf_password"
                        value={cf_password}
                        onChange={handleChange}
                        autoComplete="family-name"
                        className="mt-1 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="py-6">
                    <label className="block text-sm font-medium text-gray-700">
                      Photo
                    </label>
                    <div className="mt-1 flex items-center">
                      <span className="inline-block h-[150px] w-[150px] rounded-full overflow-hidden bg-gray-100">
                        {auth.user && auth.user.avatar && (
                          <img
                            src={
                              avatar
                                ? URL.createObjectURL(avatar)
                                : auth.user.avatar
                            }
                            alt="avatar"
                            style={{
                              height: "100%",
                              width: "100%",
                              objectFit: "cover",
                            }}
                          />
                        )}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Change avatar
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={changeAvatar}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={handleUpdateProfile}
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
