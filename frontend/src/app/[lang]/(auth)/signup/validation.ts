import * as yup from "yup";
interface ISchemaProps {
  required: string;
  min: string;
  max: string;
  email: string;
  passwordConfirm: string;
}

export const validationSchema = ({
  email,
  required,
  max,
  min,
  passwordConfirm,
}: ISchemaProps) => {
  const nameRegex =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

  return yup
    .object({
      email: yup.string().email(email).required(required),
      first_name: yup.string().matches(nameRegex).required(required),
      last_name: yup.string().matches(nameRegex).required(required),
      password: yup.string().min(8, min).max(30, max).required(required),
      passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password")], passwordConfirm)
        .required(required),
    })
    .required(required);
};
