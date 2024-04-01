import React from "react";
import styles from "./header.module.scss";
import { IJwtPayload } from "@/src/utils/authenticate";
import { IHeader, Locale } from "@/src/types";
import BurgerMenu from "./burgerMenu";

interface IHeaderProps {
  userData?: IJwtPayload;
  pageData: IHeader;
  lang: Locale;
}

const Header = ({ userData, pageData, lang }: IHeaderProps) => {
  return (
    <nav className={styles.wrapper}>
      <BurgerMenu userData={userData} pageData={pageData} lang={lang} />
    </nav>
  );
};

export default Header;
