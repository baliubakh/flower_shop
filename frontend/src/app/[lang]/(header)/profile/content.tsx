"use client";

import React, { useState } from "react";
import styles from "./profile.module.scss";
import userLogo from "@/public/img/user-demo-logo.jpeg";
import Image from "next/image";
import SVGOrderSolid from "@/public/img/svg/ordersSolid";
import SVGProfileSolid from "@/public/img/svg/profileSolid";
import SVGQuestionSolid from "@/public/img/svg/questionSolid";
import Dashboards from "./components/dashboards";
import Orders from "./components/orders";
import Info from "./components/info";
import Link from "next/link";
import { useGetProfileQuery } from "@/src/redux/services/profile";
import Loader from "@/src/components/loader";
import { IProfile } from "@/src/types";

type profileTab = "dashboard" | "orders" | "info" | "comments";

const profileTabs = [
  // { id: 1, name: "dashboard", icon: <SVGDashboardSolid /> },
  { id: 2, name: "orders", icon: <SVGOrderSolid /> },
  { id: 3, name: "info", icon: <SVGProfileSolid /> },
  // { id: 4, name: "comments", icon: <SVGCommentSolid /> },
];

interface IProfileContentProps {
  pageData: IProfile;
}

const ProfileContent = ({ pageData }: IProfileContentProps) => {
  const [currentTab, setCurrentTab] = useState<profileTab>("dashboard");
  const { data, isLoading } = useGetProfileQuery();

  const handleTabClick = (tabName: profileTab) => setCurrentTab(tabName);

  const getCurrentComponentByTabName = (tabName: profileTab) => {
    if (data) {
      const { id, is_active, ...filteredData } = data;
      switch (tabName) {
        case "orders":
          return <Orders />;
        case "info":
          return <Info pageData={pageData.info} profileData={filteredData} />;

        default:
          return <Dashboards />;
      }
    }
  };

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
                    src={data.photo ? data.photo : userLogo}
                    alt="user-logo"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className={styles.userName}>
                  <p className={styles.userNameText}>
                    {data.first_name} {data.last_name}
                  </p>
                  <p className={styles.logout}>{pageData.logOut}</p>
                </div>
              </div>
              <ul className={styles.tabWrapper}>
                {pageData.tabNames.map((el, idx) => (
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
                    <div className={styles.tabText}>{el}</div>
                  </li>
                ))}
              </ul>
            </div>
            <Link href="#" className={styles.contactUs}>
              <div className={styles.tabIcon}>
                <SVGQuestionSolid />
              </div>
              <div>{pageData.contact}</div>
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

export default ProfileContent;
