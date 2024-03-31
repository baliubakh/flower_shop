import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "../../admin.module.scss";
import Modal from "@/src/components/modal";
import Button from "@/src/components/button";
import { IEditProductBody, IEditProductForm } from "@/src/types/product";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "@/src/components/input";
import { useUpdateProductMutation } from "@/src/redux/services/product";
import { editValidationSchema } from "../editValidation";
import EditImage from "./editImage";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSwappingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { IEditProduct } from "@/src/types";

interface IEditProductModalProps {
  handleClose: () => void;
  data: Partial<IEditProductBody> & { id: string };
  pageData: IEditProduct;
}

const EditProductModal = ({
  handleClose,
  data,
  pageData,
}: IEditProductModalProps) => {
  const { id, photos, ...otherData } = data;
  const photosWithValues = (photos || [])?.map((el) => ({ value: el }));
  const dataToForm = {
    ...otherData,
    photos: photosWithValues,
  };
  const [selectedFile, setSelectedFile] = useState<File[]>();
  const [previews, setPreviews] = useState<{ value: string }[]>(
    photosWithValues || []
  );

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<IEditProductForm>({
    defaultValues: dataToForm,
    resolver: yupResolver(
      editValidationSchema({
        ...pageData.validation,
      })
    ),
  });

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "photos",
  });
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const [editProduct] = useUpdateProductMutation();

  const onSubmit: SubmitHandler<IEditProductForm> = async (values) => {
    const { newPhotos, photos, ...otherValues } = values;
    const formData = new FormData();
    const transformed: Blob[] = Array.from(newPhotos);
    transformed.forEach((el) => {
      formData.append("newPhotos", el);
    });

    const transformedPhotos = photos.map((el) => el.value);
    console.log(transformedPhotos);
    formData.append("photos", JSON.stringify(transformedPhotos));

    Object.entries(otherValues).forEach((el) =>
      formData.append(el[0], el[1].toString())
    );

    const res = await editProduct({ id, body: formData });

    if ("data" in res) {
      reset();
      handleClose();
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over) {
      const oldElement = fields.find((el) => el.id === active.id);
      const newElement = fields.find((el) => el.id === over.id);
      const oldElIndex = fields.findIndex((el) => el.id === active.id);
      const newElIndex = fields.findIndex((el) => el.id === over.id);

      if (oldElement && newElement) {
        update(oldElIndex, newElement);
        update(newElIndex, oldElement);
      }
    }
  };

  const onFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(Array.from(e.target.files));
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreviews(watch("photos") || []);
      return;
    }

    const objectUrls = selectedFile.map((file) => URL.createObjectURL(file));

    setPreviews(objectUrls.map((el) => ({ value: el })));

    return () => selectedFile.forEach((file) => URL.createObjectURL(file));
  }, [selectedFile, watch]);

  return (
    <Modal handleClose={handleClose}>
      <h4 className={styles.editTitle}>Edit {data.name}</h4>
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
        />{" "}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={fields} strategy={rectSwappingStrategy}>
            <div className={styles.editImages}>
              {fields.map((imgObj, idx) => (
                <EditImage
                  key={imgObj.id}
                  img={imgObj}
                  index={idx}
                  remove={remove}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
        <input {...register("newPhotos")} multiple type="file" />
        <div className={styles.editButtonWrapper}>
          <Button color="brandColor1" text={pageData.submitBtn} size="large" />
        </div>
      </form>
    </Modal>
  );
};

export default EditProductModal;
