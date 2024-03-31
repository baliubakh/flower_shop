import React from "react";
import { headers } from "next/headers";
import AdminContent from "./content";
import { IJwtPayload } from "@/src/utils/authenticate";
import { getDictionary } from "../../dictionaries";
import { Locale } from "@/src/types";

interface IAdminPageProps {
  params: { lang: Locale };
}

const AdminPage = async ({ params }: IAdminPageProps) => {
  const { lang } = params;
  const { admin, productCard } = await getDictionary(lang);
  const headersList = headers();
  const userData: IJwtPayload = JSON.parse(headersList.get("userData") || "");

  return (
    <AdminContent
      pageData={admin}
      userData={userData}
      productCardData={productCard}
    />
  );
};

export default AdminPage;
