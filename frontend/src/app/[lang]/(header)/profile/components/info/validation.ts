import { GenderEnum } from "@/src/types/user";
import * as yup from "yup";

interface IValidationProps {
  required: string;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
}

const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

const nameRegex =
  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

export const infoValidationSchema = ({
  required,
  phone,
  first_name,
  last_name,
  email,
}: IValidationProps) =>
  yup

    .object({
      state: yup.string().required(required),
      city: yup.string().required(required),
      zipcode: yup.string().required(required),
      address: yup.string().required(required),
      gender: yup.string().oneOf(Object.values(GenderEnum)).required(required),
      phone: yup.string().matches(phoneRegex, phone).required(required),
      email: yup.string().email(email).required(required),
      first_name: yup
        .string()
        .matches(nameRegex, first_name)
        .required(required),
      last_name: yup.string().matches(nameRegex, last_name).required(required),
      photo: yup.mixed().required(required),
    })
    .required(required);
