"use client";

import React, { useState } from "react";
import styles from "./profile.module.scss";
import userLogo from "@/public/img/user-demo-logo.jpeg";
import Image from "next/image";
import { tabsNames } from "@/src/constants/staticData";
import SVGDashboardSolid from "@/public/img/svg/dashboardSolid";
import SVGOrderSolid from "@/public/img/svg/ordersSolid";
import SVGProfileSolid from "@/public/img/svg/profileSolid";
import SVGCommentSolid from "@/public/img/svg/commentSolid";
import SVGQuestionSolid from "@/public/img/svg/questionSolid";
import Dashboards from "./components/dashboards";
import Orders from "./components/orders";
import Info from "./components/info";
import Comments from "./components/comments";
import Link from "next/link";
import { useGetProfileQuery } from "@/src/redux/services/profile";
import Loader from "@/src/components/loader";

type profileTab = "dashboard" | "orders" | "info" | "comments";

const profileTabs = [
  { id: 1, name: "dashboard", icon: <SVGDashboardSolid /> },
  { id: 2, name: "orders", icon: <SVGOrderSolid /> },
  { id: 3, name: "info", icon: <SVGProfileSolid /> },
  { id: 4, name: "comments", icon: <SVGCommentSolid /> },
];

const ProfilePage = () => {
  const [currentTab, setCurrentTab] = useState<profileTab>("dashboard");
  const { data, isLoading } = useGetProfileQuery();

  const handleTabClick = (tabName: profileTab) => setCurrentTab(tabName);

  const getCurrentComponentByTabName = (tabName: profileTab) => {
    if (data) {
      switch (tabName) {
        case "dashboard":
          return <Dashboards />;
        case "orders":
          return <Orders />;
        case "info":
          return <Info profileData={data} />;
        case "comments":
          return <Comments />;
        default:
          return <Dashboards />;
      }
    }
  };
  // console.log(document && document.cookie);

  if (isLoading) return <Loader />;

  return (
    (data && (
      <div className={styles.wrapper}>
        <div className={styles.sidebarWrapper}>
          <div className={styles.sidebarInner}>
            <div className={styles.sidebarContent}>
              <div className={styles.user}>
                <div className={styles.userLogoWrapper}>
                  <Image
                    src={userLogo}
                    alt="user-logo"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className={styles.userName}>
                  <p className={styles.userNameText}>
                    {data.first_name} {data.last_name}
                  </p>
                  <p className={styles.logout}>Log out</p>
                </div>
              </div>
              <ul className={styles.tabWrapper}>
                {tabsNames.map((el, idx) => (
                  <li
                    key={profileTabs[idx].id}
                    className={`${styles.tabItem} ${
                      currentTab === profileTabs[idx].name
                        ? styles.activeTab
                        : ""
                    }`}
                    onClick={() =>
                      handleTabClick(profileTabs[idx].name as profileTab)
                    }
                  >
                    <div className={styles.tabIcon}>
                      {profileTabs[idx].icon}
                    </div>
                    <div>{el}</div>
                  </li>
                ))}
              </ul>
            </div>
            <Link href="#" className={styles.contactUs}>
              <div className={styles.tabIcon}>
                <SVGQuestionSolid />
              </div>
              <div>Contact with us</div>
            </Link>
          </div>
        </div>
        <div className={styles.tabItemWrapper}>
          {getCurrentComponentByTabName(currentTab)}
        </div>
      </div>
    )) ||
    null
  );
};

export default ProfilePage;
