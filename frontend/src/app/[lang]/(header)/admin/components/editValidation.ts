import * as yup from "yup";

interface ISchemaProps {
  required: string;
  min: string;
  minNumber: string;
}

export const editValidationSchema = ({
  required,
  min,
  minNumber,
}: ISchemaProps) => {
  return yup
    .object({
      name: yup.string().min(3, min).required(required),
      description: yup.string().min(3, min).required(required),
      category: yup.string().min(3, min).required(required),
      price: yup.number().min(0).required(required),
      quantity: yup.number().min(0).required(required),
      photos: yup
        .array()
        .of(
          yup
            .object({
              value: yup.string().required(),
            })
            .required(required)
        )
        .min(1, minNumber)
        .required(required),
      newPhotos: yup.mixed().required(required),
    })
    .required(required);
};
