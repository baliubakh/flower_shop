import React from "react";
import styles from "../../admin.module.scss";
import Modal from "@/src/components/modal";
import Button from "@/src/components/button";
import { IProductBody } from "@/src/types/product";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../validation";
import TextInput from "@/src/components/input";
import { useUpdateProductMutation } from "@/src/redux/services/product";

interface IEditProductModalProps {
  handleClose: () => void;
  data: Partial<IProductBody> & { id: string };
}

const EditProductModal = ({ handleClose, data }: IEditProductModalProps) => {
  const { id, ...otherData } = data;
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IProductBody>({
    defaultValues: otherData,
    resolver: yupResolver(
      validationSchema({
        minNumber: "Field should contain at least 0",
        required: "Field is required",
        min: "This field should be at least 3 symbols",
      })
    ),
  });

  const [editProduct] = useUpdateProductMutation();

  const onSubmit: SubmitHandler<IProductBody> = async (values) => {
    console.log(values);

    const res = await editProduct({ id, body: values });

    if ("data" in res) {
      reset();
      handleClose();
    }
  };

  return (
    <Modal handleClose={handleClose}>
      <h4 className={styles.editTitle}>Edit {data.name}</h4>
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
        <div className={styles.editButtonWrapper}>
          <Button color="brandColor1" text={"Edit"} size="large" />
        </div>
      </form>
    </Modal>
  );
};

export default EditProductModal;
