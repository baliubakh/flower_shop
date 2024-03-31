import React, { PropsWithChildren } from "react";
import styles from "./home.module.scss";
import Header from "@/src/components/header";
import Footer from "@/src/components/footer";
import { IJwtPayload } from "@/src/utils/authenticate";
import { headers } from "next/headers";
import { Locale } from "@/src/types";
import { getDictionary } from "../dictionaries";

interface IHeaderLayoutProps extends PropsWithChildren {
  params: { lang: Locale };
}

const HeaderLayout = async ({ children, params }: IHeaderLayoutProps) => {
  const { lang } = params;
  const { header, footer } = await getDictionary(lang);
  const headersList = headers();
  const userData: IJwtPayload = JSON.parse(headersList.get("userData") || "{}");

  return (
    <div className={styles.headerWrapper}>
      <link
        href="https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.css"
        rel="stylesheet"
      />
      <Header pageData={header} lang={lang} userData={userData} />
      <div className={styles.pageWrapper}>{children}</div>
      <Footer pageData={footer} lang={lang} />
    </div>
  );
};

export default HeaderLayout;
