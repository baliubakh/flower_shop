import React from "react";
import styles from "../../admin.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { IProductBody } from "@/src/types/product";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../validation";
import TextInput from "@/src/components/input";
import Button from "@/src/components/button";
import { useCreateProductMutation } from "@/src/redux/services/product";

interface IAddNewProductProps {
  onClose: () => void;
}

const AddNewProduct = ({ onClose }: IAddNewProductProps) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IProductBody>({
    resolver: yupResolver(
      validationSchema({
        minNumber: "Field should contain at least 0",
        required: "Field is required",
        min: "This field should be at least 3 symbols",
      })
    ),
  });

  const [createNewProduct, { isLoading }] = useCreateProductMutation();

  const onSubmit: SubmitHandler<IProductBody> = async (data) => {
    const { photo, ...otherData } = data;
    const formData = new FormData();

    formData.append("photo", photo[0]);
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
        title="Product Name"
        placeholder="Product Name"
        error={errors.name}
        {...register("name")}
      />
      <TextInput
        type="text"
        title="Product Description"
        placeholder="Product Description"
        error={errors.description}
        {...register("description")}
      />
      <TextInput
        type="text"
        title="Product Category"
        placeholder="Product Category"
        error={errors.category}
        {...register("category")}
      />
      <TextInput
        type="number"
        title="Product Price"
        placeholder="Product Price"
        error={errors.price}
        min={0}
        {...register("price")}
      />
      <TextInput
        type="number"
        title="Product Quantity"
        placeholder="Product Quantity"
        error={errors.quantity}
        min={0}
        {...register("quantity")}
      />
      <input {...register("photo")} type="file" />
      <div className={styles.btnWrapper}>
        <div>
          <Button text="Add Product" />
        </div>
      </div>
    </form>
  );
};

export default AddNewProduct;
