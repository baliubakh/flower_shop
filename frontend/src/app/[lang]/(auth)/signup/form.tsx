"use client";

import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "../auth.module.scss";
import {
  ISigninNames,
  signupData,
  signupPlaceholders,
} from "@/src/constants/staticData";
import { IUserSignUpBody } from "@/src/types/user";
import { SubmitHandler, useForm } from "react-hook-form";
import signUpFormImg from "@/public/img/signUpForm.jpg";
import Image from "next/image";
import Link from "next/link";
import { LocalStorageKeys } from "@/src/constants";
import Modal from "@/src/components/modal";
import { useRouter } from "next/navigation";
import InfoModal from "@/src/components/modal/authInfoModal";
import { validationSchema } from "./validation";
import { useSignupMutation } from "@/src/redux/services/auth";
import { ISignup, Locale } from "@/src/types";

interface ISignUpFormProps {
  pageData: ISignup;
  lang: Locale;
}

const SignUpForm = ({ pageData, lang }: ISignUpFormProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IUserSignUpBody>({
    resolver: yupResolver(
      validationSchema({
        ...pageData.validation,
      })
    ),
  });

  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => setIsOpenModal((prev) => !prev);

  // const { mutate } = useMutation({
  //   mutationFn: (body: IUserSignUpBody) => authService.signup(body),
  //   onSuccess: (data) => {
  //     if (data) {

  //     }
  //   },
  // });

  const [signup] = useSignupMutation();

  const handleModalClose = () => {
    toggleModal();
    router.push(`/${lang}/`);
  };

  const onSubmit: SubmitHandler<IUserSignUpBody> = async (data) => {
    const res = await signup({
      ...data,
    });

    if ("data" in res) {
      const { data } = res;
      localStorage.setItem(LocalStorageKeys.access, data.access_token);
      localStorage.setItem(LocalStorageKeys.refresh, data.refresh_token);
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
              {signupData.inputs.map((input) => (
                <div key={input.id} className={styles.inputWrapper}>
                  <input
                    {...input}
                    placeholder={
                      pageData.placeholder[input.name as ISigninNames]
                    }
                    {...register(input.name as keyof IUserSignUpBody)}
                    className={styles.input}
                    id={`${input.id}`}
                    autoComplete="one-time-code"
                  />
                  <div className={styles.error}>
                    {errors[input.name as keyof IUserSignUpBody]?.message}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className={styles.submitBtn} type="submit">
            {pageData.submitBtn}
          </button>
        </form>
        <div className={styles.bottomTextWrapper}>
          {pageData.ask}
          <Link className={styles.bottomLink} href={signupData.link}>
            &nbsp;{pageData.linkText}
          </Link>
        </div>
      </div>
      <div className={styles.imageBg}>
        <Image
          src={signUpFormImg}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          alt="bg signup image"
          priority
        />
      </div>
      {isOpenModal && (
        <InfoModal {...pageData.modal} handleClose={handleModalClose} />
      )}
    </div>
  );
};

export default SignUpForm;
