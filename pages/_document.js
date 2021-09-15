import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="vi">
        <Head>
          <meta charSet="utf-8" />
          <meta property="lang" name="lang" content="vi" />
          <meta property="author" name="author" content="Thinkpro" />
          <meta property="theme-color" name="theme-color" content="#06C1D4" />
          <meta property="og:type" name="og:type" content="website" />
          <meta
            property="og:site_name"
            name="og:site_name"
            content="Thinkpro"
          />
          <meta
            property="og:url"
            name="og:url"
            content="https://thinkpro.vn/"
          />
          <meta
            property="og:title"
            name="og:title"
            content="Thinkpro - Hệ thống Máy tính và phụ kiện"
          />
          <meta
            property="og:description"
            name="og:description"
            content="Hệ thống trải nghiệm và bán lẻ Laptop, PC giá tốt, tư vấn chính xác, bảo hành tận tâm"
          />
          <meta
            property="description"
            name="description"
            content="Hệ thống trải nghiệm và bán lẻ Laptop, PC giá tốt, tư vấn chính xác, bảo hành tận tâm"
          />
          <meta
            name="og:title"
            content="ThinkPro - Hệ thống Máy tính và Phụ kiện"
          />
          <meta
            name="og:description"
            content="Hệ thống trải nghiệm và bán lẻ Laptop, PC giá tốt, tư vấn chính xác, bảo hành tận tâm"
          />
          <link rel="icon" href="/favicon.svg" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
