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

interface IHeaderIconsProps {
  userData: IJwtPayload;
}

const HeaderIcons = ({ userData }: IHeaderIconsProps) => {
  const [signOut] = useLazySignoutQuery();
  const router = useRouter();

  const handleSignOutClick = async () => {
    const res = await signOut();
    if ("data" in res) router.push("signin");
  };

  return (
    <div className={styles.iconsWrapper}>
      {userData.role === "admin" && (
        <div className={styles.profileIconWrapper}>
          <Link href="/admin">
            <SVGAdminPanel />
          </Link>
        </div>
      )}
      <div className={styles.profileIconWrapper}>
        <Link href={`/profile`}>
          <SVGProfileSolid />
        </Link>
      </div>
      <div className={styles.cartIconWrapper}>
        <SVGCartSolid />
      </div>
      <div className={styles.signoutIconWrapper} onClick={handleSignOutClick}>
        <SVGSignOutSolid />
      </div>
    </div>
  );
};

export default HeaderIcons;
