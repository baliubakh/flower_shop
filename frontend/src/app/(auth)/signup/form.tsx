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

const SignUpForm = () => {
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
        email: "Input valid e-mail",
        required: "Field is required",
        passwordConfirm: "Password must match",
        min: "Password should be at least 8 symbols",
        max: "Password should be maximum 30 symbols",
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
    router.push("/");
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
        <h2 className={styles.title}>{signupData.title}</h2>
        <h3 className={styles.subtitle}>{signupData.subtitle}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputsWrapper}>
            <div className={styles.textInputsWrapper}>
              {signupData.inputs.map((input) => (
                <div key={input.id} className={styles.inputWrapper}>
                  <input
                    {...input}
                    placeholder={signupPlaceholders[input.name as ISigninNames]}
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
            {signupData.submitBtn}
          </button>
        </form>
        <div className={styles.bottomTextWrapper}>
          {signupData.ask}
          <Link className={styles.bottomLink} href={signupData.link}>
            &nbsp;{signupData.linkText}
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
        <InfoModal
          title="Succesful Sign up"
          text="You are being redirected to the home page"
          btnText="Go to the Home Page"
          handleClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default SignUpForm;
