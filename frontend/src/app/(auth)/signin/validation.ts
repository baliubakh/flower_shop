import * as yup from "yup";
interface ISchemaProps {
  required: string;
  min: string;
  max: string;
  email: string;
}

export const validationSchema = ({
  email,
  required,
  max,
  min,
}: ISchemaProps) => {
  return yup
    .object({
      email: yup.string().email(email).required(required),
      password: yup.string().min(8, min).max(30, max).required(required),
    })
    .required(required);
};
