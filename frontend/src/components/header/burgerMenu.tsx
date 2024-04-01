"use client";

import SVGAngleLeft from "@/public/img/svg/angleLeft";
import styles from "./header.module.scss";

import React, { useState } from "react";
import HeaderLinks from "./headerLinks";
import Link from "next/link";
import { IHeader, Locale } from "@/src/types";
import { IJwtPayload } from "@/src/utils/authenticate";
import HeaderIcons from "./headerIcons";
import SVGBurgerSolid from "@/public/img/svg/burgerSolid";

interface IBurgerMenuProps {
  lang: Locale;
  pageData: IHeader;
  userData?: IJwtPayload;
}

const BurgerMenu = ({ lang, pageData, userData }: IBurgerMenuProps) => {
  const [burgerOpen, setBurgerOpen] = useState<boolean>(false);

  const handleBurgerClick = () => setBurgerOpen((prev) => !prev);

  return (
    <>
      <Link href={`/${lang}/`} className={styles.burgerLogo}>
        <h1 className={styles.logo}>
          {pageData.nameFirst} <span>{pageData.nameLast}</span>
        </h1>
      </Link>
      <div className={styles.burgerIcon} onClick={handleBurgerClick}>
        <SVGBurgerSolid />
      </div>
      <div
        className={`${styles.burgerWrapper} ${burgerOpen ? styles.open : ""}`}
        onClick={handleBurgerClick}
      >
        <div className={styles.burgerBackButton}>
          <SVGAngleLeft />
        </div>{" "}
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
      </div>
    </>
  );
};

export default BurgerMenu;
