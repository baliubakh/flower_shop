import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "../../profile.module.scss";
import infoStyles from "./info.module.scss";
import Button from "@/src/components/button";
import userDemoLogo from "@/public/img/user-demo-logo.jpeg";
import TextInput from "@/src/components/input";
import Image from "next/image";
import Select, { IOption } from "@/src/components/select";
import { GenderEnum, IUser } from "@/src/types/user";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { infoValidationSchema } from "./validation";
import InfoModal from "@/src/components/modal/authInfoModal";
import { useUpdateProfileMutation } from "@/src/redux/services/profile";
import { IProfileInfo } from "@/src/types";

const genderOptions = [
  { label: "Male", value: "male" as GenderEnum },
  { label: "Female", value: "female" as GenderEnum },
];

interface IUpdateInfo {
  phone: string;
  photo: any;
  email: string;
  first_name: string;
  last_name: string;
  gender: GenderEnum;
  address: string;
  state: string;
  city: string;
  zipcode: string;
}

interface IInfoProps {
  profileData: Partial<IUser>;
  pageData: IProfileInfo;
}

const Info = ({ profileData, pageData }: IInfoProps) => {
  const currLangGenderOptions = genderOptions.map((el, idx) => ({
    label: pageData.gender[idx],
    value: el.value,
  }));
  const [isOpenSuccess, setIsOpenSuccess] = useState<boolean>(false);
  const toggleSuccessModal = () => setIsOpenSuccess((prev) => !prev);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState<string>(profileData.photo || "");
  const [updateProfile] = useUpdateProfileMutation();

  const {
    register,
    handleSubmit,
    watch,
    setValue,

    formState: { errors },
  } = useForm<IUpdateInfo>({
    defaultValues: profileData,
    resolver: yupResolver(
      infoValidationSchema({
        ...pageData.validation,
      })
    ),
  });

  const handleSelectChange = (val: GenderEnum) => {
    setValue("gender", val);
  };

  const handleButtonClick = () =>
    fileInputRef.current && fileInputRef.current.click();

  const onSubmit: SubmitHandler<IUpdateInfo> = async (data) => {
    const { photo, ...otherData } = data;
    const formData = new FormData();

    formData.append("photo", photo[0]);
    Object.entries(otherData).forEach((el) =>
      formData.append(el[0], el[1].toString())
    );
    await updateProfile(formData);
    toggleSuccessModal();
  };

  const { ref, onChange, ...rest } = register("photo");

  const onFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(watch("photo") || "");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile, watch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.header}>
        <h4 className={styles.tabTitle}>Your information</h4>
        <div className={styles.headerButtonWrapper}>
          <Button color="brandColor1" text={pageData.submitBtn} type="submit" />
        </div>
      </div>
      <div className={infoStyles.wrapper}>
        <div className={infoStyles.photoUploadWrapper}>
          <div className={infoStyles.photoUpload}>
            <Image
              src={preview ? preview : userDemoLogo}
              alt="upload-photo"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <span className={infoStyles.uploadText} onClick={handleButtonClick}>
            {pageData.uploadPhoto}
          </span>
          <input
            {...rest}
            ref={(e) => {
              // Register file input without passing a ref
              ref(e);
              fileInputRef.current = e;
            }}
            onChange={(e) => {
              onFileSelect(e);
              onChange(e);
            }}
            style={{ display: "none" }}
            type="file"
          />
        </div>
        <div className={infoStyles.inputsWrapper}>
          <div className={infoStyles.inputsRow}>
            <TextInput
              type="text"
              title={pageData.phoneTitle}
              placeholder={pageData.phonePlaceh}
              error={errors.phone}
              {...register("phone")}
            />
            <TextInput
              type="email"
              title={pageData.emailTitle}
              placeholder={pageData.emailPlaceh}
              error={errors.email}
              {...register("email")}
            />
          </div>
          <div className={infoStyles.inputsRow}>
            <TextInput
              type="text"
              title={pageData.firstName}
              placeholder={pageData.firstName}
              error={errors.first_name}
              {...register("first_name")}
            />
            <TextInput
              type="text"
              title={pageData.lastName}
              placeholder={pageData.lastName}
              error={errors.last_name}
              {...register("last_name")}
            />
            <Select<GenderEnum>
              header={
                currLangGenderOptions.find((el) => el.value === watch("gender"))
                  ?.label || "Gender"
              }
              title={pageData.genderTitle}
              options={currLangGenderOptions}
              handleSelectChange={handleSelectChange}
              error={errors.gender}
            />
          </div>
          <TextInput
            type="text"
            title={pageData.addressTitle}
            placeholder={pageData.addressPlaceh}
            error={errors.address}
            {...register("address")}
          />
          <div className={infoStyles.inputsRow}>
            <TextInput
              type="text"
              title={pageData.stateTitle}
              placeholder={pageData.statePlaceh}
              error={errors.state}
              {...register("state")}
            />
            <TextInput
              type="text"
              title={pageData.cityTitle}
              placeholder={pageData.cityPlaceh}
              error={errors.city}
              {...register("city")}
            />
            <TextInput
              type="text"
              title={pageData.zipCodeTitle}
              placeholder={pageData.zipCodePlaceh}
              error={errors.zipcode}
              {...register("zipcode")}
            />
          </div>
        </div>
      </div>
      {isOpenSuccess && (
        <InfoModal
          title={pageData.modal.title}
          text={pageData.modal.text}
          btnText={pageData.modal.btnText}
          handleClose={toggleSuccessModal}
        />
      )}
    </form>
  );
};

export default Info;
