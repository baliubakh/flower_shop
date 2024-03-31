import React from "react";
import styles from "./footer.module.scss";
import Link from "next/link";
import SVGLocationSolid from "@/public/img/svg/locationSolid";
import SVGEmailSolid from "@/public/img/svg/emailSolid";
import SVGPhoneSolid from "@/public/img/svg/phoneSolid";
import { IFooter, Locale } from "@/src/types";

const links = [
  { icon: <SVGLocationSolid />, text: "26985 Brighton Lane, Lake Forest, CA" },
  { icon: <SVGEmailSolid />, text: "support@Flowers.com" },
  { icon: <SVGPhoneSolid />, text: "+380 111 1111" },
];

interface IFooterProps {
  pageData: IFooter;
  lang: Locale;
}

const Footer = async ({ pageData, lang }: IFooterProps) => {
  return (
    <footer className={styles.wrapper}>
      <div>
        <div className={styles.logoWrapper}>
          <Link href={`/${lang}/`} className={styles.logoLink}>
            <h1 className={styles.logo}>
              {pageData.nameFirst} <span>{pageData.nameLast}</span>
            </h1>
          </Link>
        </div>
        <p className={styles.footerText}>{pageData.subtitle}</p>
      </div>
      <div className={styles.contactUsWrapper}>
        <h4 className={styles.contactTitle}>{pageData.contactUs}</h4>
        <ul className={styles.linkList}>
          {links.map((el, idx) => (
            <li key={idx}>
              <div className={styles.linkWrapper}>
                <div className={styles.linkIcon}>{el.icon}</div>
                {el.text}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
