import React, { useState } from "react";
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

const genderOptions = [
  { label: "Male", value: "male" as GenderEnum },
  { label: "Female", value: "female" as GenderEnum },
];

interface IUpdateInfo {
  phone: string;
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
  profileData: IUser;
}

const Info = ({ profileData }: IInfoProps) => {
  const [isOpenSuccess, setIsOpenSuccess] = useState<boolean>(false);
  const toggleSuccessModal = () => setIsOpenSuccess((prev) => !prev);

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
        email: "Input valid e-mail",
        required: "Field is required",
        phone: "Input valid phone number",
        first_name: "Input valid first name",
        last_name: "Input valid last name",
      })
    ),
  });

  const handleSelectChange = (val: GenderEnum) => {
    setValue("gender", val);
  };

  const onSubmit: SubmitHandler<IUpdateInfo> = async (data) => {
    await updateProfile(data);
    toggleSuccessModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.header}>
        <h4 className={styles.tabTitle}>Your information</h4>
        <div className={styles.headerButtonWrapper}>
          <Button color="brandColor1" text="Submit" type="submit" />
        </div>
      </div>
      <div className={infoStyles.wrapper}>
        <div className={infoStyles.photoUploadWrapper}>
          <div className={infoStyles.photoUpload}>
            <Image
              src={userDemoLogo}
              alt="upload-photo"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <span className={infoStyles.uploadText}>Upload</span>
        </div>
        <div className={infoStyles.inputsWrapper}>
          <div className={infoStyles.inputsRow}>
            <TextInput
              type="text"
              title="Phone Number"
              placeholder="Your Phone Number"
              error={errors.phone}
              {...register("phone")}
            />
            <TextInput
              type="email"
              title="Email"
              placeholder="Your Email"
              error={errors.email}
              {...register("email")}
            />
          </div>
          <div className={infoStyles.inputsRow}>
            <TextInput
              type="text"
              title="First Name"
              placeholder="First Name"
              error={errors.first_name}
              {...register("first_name")}
            />
            <TextInput
              type="text"
              title="Last Name"
              placeholder="Last Name"
              error={errors.last_name}
              {...register("last_name")}
            />
            <Select<GenderEnum>
              header={
                genderOptions.find((el) => el.value === watch("gender"))
                  ?.label || "Gender"
              }
              title="Gender"
              options={genderOptions}
              handleSelectChange={handleSelectChange}
              error={errors.gender}
            />
          </div>
          <TextInput
            type="text"
            title="Address"
            placeholder="Street, house number"
            error={errors.address}
            {...register("address")}
          />
          <div className={infoStyles.inputsRow}>
            <TextInput
              type="text"
              title="State"
              placeholder="Your State"
              error={errors.state}
              {...register("state")}
            />
            <TextInput
              type="text"
              title="City"
              placeholder="Your City"
              error={errors.city}
              {...register("city")}
            />
            <TextInput
              type="text"
              title="Zip-code"
              placeholder="Your Zip-code"
              error={errors.zipcode}
              {...register("zipcode")}
            />
          </div>
        </div>
      </div>
      {isOpenSuccess && (
        <InfoModal
          title="Succesful User update"
          text="Check if everything is correct"
          btnText="OK"
          handleClose={toggleSuccessModal}
        />
      )}
    </form>
  );
};

export default Info;
