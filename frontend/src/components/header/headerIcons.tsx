"use client";

import React from "react";
import styles from "./header.module.scss";
import { IJwtPayload } from "@/src/utils/authenticate";
import Link from "next/link";
import SVGAdminPanel from "@/public/img/svg/adminPanel";
import SVGProfileSolid from "@/public/img/svg/profileSolid";
import SVGCartSolid from "@/public/img/svg/cartSolid";
import SVGSignOutSolid from "@/public/img/svg/signOutSolid";
import { useLazySignoutQuery } from "@/src/redux/services/auth";
import { useRouter } from "next/navigation";
import SVGSignInSolid from "@/public/img/svg/signinSolid";
import { Locale } from "@/src/types";

interface IHeaderIconsProps {
  userData: IJwtPayload;
  lang: Locale;
}

const HeaderIcons = ({ userData, lang }: IHeaderIconsProps) => {
  const [signOut] = useLazySignoutQuery();
  const router = useRouter();

  const handleSignOutClick = async () => {
    const res = await signOut();
    if ("data" in res) router.push("signin");
  };

  const userDataExists = Object.keys(userData).length !== 0;

  return (
    <div className={styles.iconsWrapper}>
      {userData.role === "admin" && (
        <div className={styles.profileIconWrapper}>
          <Link href={`/${lang}/admin`}>
            <SVGAdminPanel />
          </Link>
        </div>
      )}
      {userDataExists && (
        <div className={styles.profileIconWrapper}>
          <Link href={`/${lang}/profile`}>
            <SVGProfileSolid />
          </Link>
        </div>
      )}
      <div className={styles.cartIconWrapper}>
        <Link href={`/${lang}/cart`}>
          <SVGCartSolid />
        </Link>
      </div>
      {(userDataExists && (
        <div className={styles.signIconWrapper} onClick={handleSignOutClick}>
          <SVGSignOutSolid />
        </div>
      )) || (
        <div className={styles.signIconWrapper}>
          <Link href={`/${lang}/signin`}>
            <SVGSignInSolid />
          </Link>
        </div>
      )}
    </div>
  );
};

export default HeaderIcons;
