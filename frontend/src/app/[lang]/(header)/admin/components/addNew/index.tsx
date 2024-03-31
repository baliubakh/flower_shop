import React from "react";
import styles from "../../admin.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { IProductBody } from "@/src/types/product";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../validation";
import TextInput from "@/src/components/input";
import Button from "@/src/components/button";
import { useCreateProductMutation } from "@/src/redux/services/product";
import { File } from "buffer";
import { IAddNew } from "@/src/types";

interface IAddNewProductProps {
  onClose: () => void;
  pageData: IAddNew;
}

const AddNewProduct = ({ onClose, pageData }: IAddNewProductProps) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IProductBody>({
    resolver: yupResolver(
      validationSchema({
        ...pageData.validation,
      })
    ),
  });

  const [createNewProduct, { isLoading }] = useCreateProductMutation();

  const onSubmit: SubmitHandler<IProductBody> = async (data) => {
    const { photos, ...otherData } = data;
    const formData = new FormData();
    const transformed: Blob[] = Array.from(photos);
    transformed.forEach((el) => {
      formData.append("photos", el);
    });

    Object.entries(otherData).forEach((el) =>
      formData.append(el[0], el[1].toString())
    );
    const res = await createNewProduct(formData);

    if ("data" in res) {
      reset();
      onClose();
    }
  };

  return (
    <form className={styles.inputWrapper} onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        type="text"
        title={pageData.name}
        placeholder={pageData.name}
        error={errors.name}
        {...register("name")}
      />
      <TextInput
        type="text"
        title={pageData.desc}
        placeholder={pageData.desc}
        error={errors.description}
        {...register("description")}
      />
      <TextInput
        type="text"
        title={pageData.category}
        placeholder={pageData.category}
        error={errors.category}
        {...register("category")}
      />
      <TextInput
        type="number"
        title={pageData.price}
        placeholder={pageData.price}
        error={errors.price}
        min={0}
        {...register("price")}
      />
      <TextInput
        type="number"
        title={pageData.quantity}
        placeholder={pageData.quantity}
        error={errors.quantity}
        min={0}
        {...register("quantity")}
      />
      <input {...register("photos")} multiple type="file" />
      <div className={styles.btnWrapper}>
        <div>
          <Button text={pageData.submitBtn} />
        </div>
      </div>
    </form>
  );
};

export default AddNewProduct;
