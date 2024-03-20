import React from "react";
import styles from "./header.module.scss";
import Link from "next/link";
import { headers } from "next/headers";
import { IJwtPayload } from "@/src/utils/authenticate";
import HeaderIcons from "./headerIcons";
import HeaderLinks from "./headerLinks";

const Header = () => {
  const headersList = headers();
  const userData: IJwtPayload = JSON.parse(headersList.get("userData") || "");

  return (
    <nav className={styles.wrapper}>
      <div className={styles.logoWrapper}>
        <Link href="/" className={styles.logoLink}>
          <h1 className={styles.logo}>
            <span>Flower</span> Shop
          </h1>
        </Link>
      </div>
      <ul className={styles.linkList}>
        <HeaderLinks />
      </ul>
      {userData && <HeaderIcons userData={userData} />}
    </nav>
  );
};

export default Header;
