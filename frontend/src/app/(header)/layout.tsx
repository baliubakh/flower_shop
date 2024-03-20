import React, { PropsWithChildren } from "react";
import styles from "./home.module.scss";
import Header from "@/src/components/header";
import Footer from "@/src/components/footer";

const HeaderLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.headerWrapper}>
      <link
        href="https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.css"
        rel="stylesheet"
      />
      <Header />
      <div className={styles.pageWrapper}>{children}</div>
      <Footer />
    </div>
  );
};

export default HeaderLayout;
