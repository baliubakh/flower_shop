"use client";

import { usePathname } from "next/navigation";
import styles from "./header.module.scss";
import React from "react";
import Link from "next/link";

const HeaderLinks = () => {
  const pathname = usePathname();
  const paths = ["/", "/shop", "/about"];
  const labels = ["Home", "Shop", "About"];

  return (
    <>
      {paths.map((el, idx) => (
        <li
          className={`${styles.link} ${
            pathname === el ? styles.activeLink : ""
          }`}
          key={idx}
        >
          <Link href={el}>{labels[idx]}</Link>
        </li>
      ))}
    </>
  );
};

export default HeaderLinks;
