import React from "react";
import SignUpForm from "./form";
import { Locale } from "@/src/types";
import { getDictionary } from "../../dictionaries";

interface ISignUpPageProps {
  params: { lang: Locale };
}

const SignUpPage = async ({ params }: ISignUpPageProps) => {
  const { lang } = params;
  const { signup } = await getDictionary(lang);

  return <SignUpForm pageData={signup} lang={lang} />;
};

export default SignUpPage;
