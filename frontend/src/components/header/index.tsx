import React from "react";
import styles from "./header.module.scss";
import Link from "next/link";
import { IJwtPayload } from "@/src/utils/authenticate";
import HeaderIcons from "./headerIcons";
import HeaderLinks from "./headerLinks";
import { IHeader, Locale } from "@/src/types";

interface IHeaderProps {
  userData?: IJwtPayload;
  pageData: IHeader;
  lang: Locale;
}

const Header = ({ userData, pageData, lang }: IHeaderProps) => {
  return (
    <nav className={styles.wrapper}>
      <div className={styles.logoWrapper}>
        <Link href={`/${lang}/`} className={styles.logoLink}>
          <h1 className={styles.logo}>
            {pageData.nameFirst} <span>{pageData.nameLast}</span>
          </h1>
        </Link>
      </div>
      <ul className={styles.linkList}>
        <HeaderLinks links={pageData.links} lang={lang} />
      </ul>
      {userData && <HeaderIcons lang={lang} userData={userData} />}
    </nav>
  );
};

export default Header;
