import Head from "next/head";
import Image from "next/image";
import { getData } from "../utils/fetchData";
import Header from "../components/Header/Header";
import News from "../components/News/News";
import SaleShock from "../components/SaleShock/SaleShock";
import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../store/GlobalState";

export default function Home({ productProps }) {
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const [products, setProducts] = useState(productProps);
  useEffect(() => {
    setProducts(productProps);
  }, [productProps]);

  return (
    <div className="min-h-screen">
      <Head>
        <title>ThinkPro - Hệ thống Máy tính và Phụ kiện</title>
        <link rel="icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </Head>
      <Header />
      <main className="md:pt-6 mb-auto border-t border-gray-100 md:border-t-0">
        <section className="container mx-auto">
          <News />
          <SaleShock products={products} />
        </section>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await getData("product");
  return {
    props: {
      productProps: res.products,
      result: res.result,
    },
  };
}
