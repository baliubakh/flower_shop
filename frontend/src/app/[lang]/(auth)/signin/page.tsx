import React from "react";
import SignInForm from "./form";
import styles from "../auth.module.scss";
import { Locale } from "@/src/types";
import { getDictionary } from "../../dictionaries";

interface ISigninFormProps {
  params: { lang: Locale };
}

const SigninPage = async ({ params }: ISigninFormProps) => {
  const { lang } = params;
  const { signin } = await getDictionary(lang);

  return <SignInForm lang={lang} pageData={signin} />;
};

export default SigninPage;
