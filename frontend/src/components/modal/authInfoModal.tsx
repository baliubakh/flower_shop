import React from "react";
import Modal from ".";
import Button from "../button";
import styles from "./modal.module.scss";

interface IInfoModalProps {
  title?: string;
  text?: string;
  btnText?: string;
  handleClose: () => void;
  handleSubmit?: () => void;
}

const InfoModal = ({
  title,
  text,
  btnText,
  handleClose,
  handleSubmit = handleClose,
}: IInfoModalProps) => {
  return (
    <Modal handleClose={handleClose}>
      <h4 className={styles.title}>{title}</h4>
      <h5 className={styles.subtitle}>{text}</h5>
      <div className={styles.buttonWrapper}>
        <Button
          color="brandColor1"
          text={btnText || ""}
          onClick={handleSubmit}
          size="large"
        />
      </div>
    </Modal>
  );
};

export default InfoModal;
