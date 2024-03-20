import React from "react";
import { headers } from "next/headers";
import AdminContent from "./content";
import { IJwtPayload } from "@/src/utils/authenticate";

const AdminPage = () => {
  const headersList = headers();
  const userData: IJwtPayload = JSON.parse(headersList.get("userData") || "");

  return <AdminContent userData={userData} />;
};

export default AdminPage;
