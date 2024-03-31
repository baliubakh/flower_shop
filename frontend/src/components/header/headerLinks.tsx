"use client";

import { usePathname } from "next/navigation";
import styles from "./header.module.scss";
import React from "react";
import Link from "next/link";
import { Locale } from "@/src/types";

interface IHeaderLinksProps {
  lang: Locale;
  links: string[];
}

const HeaderLinks = ({ lang, links }: IHeaderLinksProps) => {
  const pathname = usePathname();
  const paths = ["/", "/shop", "/about"];

  return (
    <>
      {paths.map((el, idx) => (
        <li
          className={`${styles.link} ${
            pathname === el ? styles.activeLink : ""
          }`}
          key={idx}
        >
          <Link href={`/${lang}/${el}`}>{links[idx]}</Link>
        </li>
      ))}
    </>
  );
};

export default HeaderLinks;
