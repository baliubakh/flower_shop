import { Locale } from "@/src/types";
import ProfileContent from "./content";
import { getDictionary } from "../../dictionaries";

interface IProfilePageProps {
  params: { lang: Locale };
}

const ProfilePage = async ({ params }: IProfilePageProps) => {
  const { lang } = params;
  const { profile } = await getDictionary(lang);

  return <ProfileContent pageData={profile} />;
};

export default ProfilePage;
