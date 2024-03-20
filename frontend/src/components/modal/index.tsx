import React, { PropsWithChildren, useState } from "react";
import styles from "./modal.module.scss";
import SVGCloseIcon from "@/public/img/svg/closeOutline";
import { useRouter } from "next/navigation";
import Button from "../button";

interface IModalProps extends PropsWithChildren {
  handleClose: () => void;
}

const Modal = ({ handleClose, children }: IModalProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.backgroundWrapper}>
        <div className={styles.background}></div>
      </div>
      <div className={styles.modalContent}>
        <div className={styles.closeWrapper} onClick={handleClose}>
          <SVGCloseIcon />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
