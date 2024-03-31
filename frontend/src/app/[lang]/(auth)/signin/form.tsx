"use client";

import React, { useState } from "react";
import styles from "../auth.module.scss";
import signinForm from "@/public/img/signInForm.jpg";
import {
  ISigninNames,
  signinData,
  signinPlaceholders,
} from "@/src/constants/staticData";
import { IUserBody } from "@/src/types/user";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import Checkbox from "@/src/components/checkbox";
import Link from "next/link";
import { LocalStorageKeys } from "@/src/constants";
import Modal from "@/src/components/modal";
import InfoModal from "@/src/components/modal/authInfoModal";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validation";
import { useSigninMutation } from "@/src/redux/services/auth";
import { ISignin, Locale } from "@/src/types";

interface SigninInput {
  email: string;
  password: string;
}

interface ISignInFormProps {
  pageData: ISignin;
  lang: Locale;
}

const SignInForm = ({ pageData, lang }: ISignInFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<SigninInput>({
    resolver: yupResolver(
      validationSchema({
        ...pageData.validation,
      })
    ),
  });
  const router = useRouter();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => setIsOpenModal((prev) => !prev);

  const [signin] = useSigninMutation();

  const handleModalClose = () => {
    toggleModal();
    router.push(`/${lang}/`);
  };

  const onSubmit: SubmitHandler<SigninInput> = async (values) => {
    const res = await signin({
      email: values.email,
      password: values.password,
    });
    if ("data" in res) {
      toggleModal();
      reset();
    }
  };

  return (
    <div className={styles.formWrapper}>
      <div className={styles.formInner}>
        <h2 className={styles.title}>{pageData.title}</h2>
        <h3 className={styles.subtitle}>{pageData.subtitle}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputsWrapper}>
            <div className={styles.textInputsWrapper}>
              {signinData.inputs.map((input) => (
                <div key={input.id} className={styles.inputWrapper}>
                  <input
                    {...input}
                    placeholder={
                      pageData.placeholders[input.name as ISigninNames]
                    }
                    {...register(input.name as keyof SigninInput)}
                    className={styles.input}
                    autoComplete="off"
                  />
                  <div className={styles.error}>
                    {errors[input.name as keyof SigninInput]?.message}
                  </div>
                </div>
              ))}
            </div>
            <Checkbox
              labelProps={{ htmlFor: "remember" }}
              label={pageData.rememberMe}
            />
          </div>

          <button className={styles.submitBtn} type="submit">
            {pageData.submitBtn}
          </button>
        </form>
        <div className={styles.bottomTextWrapper}>
          {pageData.ask}
          <Link className={styles.bottomLink} href={signinData.link}>
            &nbsp;{pageData.linkText}
          </Link>
        </div>
      </div>
      <div className={styles.imageBg}>
        <Image
          src={signinForm}
          fill
          alt="bg signin image"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      {isOpenModal && (
        <InfoModal {...pageData.modal} handleClose={handleModalClose} />
      )}
    </div>
  );
};

export default SignInForm;
