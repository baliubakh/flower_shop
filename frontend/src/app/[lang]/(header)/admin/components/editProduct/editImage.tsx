import styles from "../../admin.module.scss";
import Image from "next/image";
import React from "react";
import { UseFieldArrayRemove } from "react-hook-form";
import SVGTrashSolid from "@/public/img/svg/trashSolid";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface IEditImageProps {
  img: { value: string; id: string };
  index: number;
  remove: UseFieldArrayRemove;
}

const EditImage = ({ img, index, remove }: IEditImageProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: img.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={styles.editImageContainer}
      {...listeners}
      {...attributes}
    >
      <div className={styles.deleteIconWrapper} onClick={() => remove(index)}>
        <SVGTrashSolid />
      </div>
      <div className={styles.editImageWrapper}>
        <Image src={img.value} alt={`image-to-edit-idx-${index}`} fill />
      </div>
    </div>
  );
};

export default EditImage;
