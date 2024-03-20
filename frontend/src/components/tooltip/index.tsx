import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import styles from "./tooltip.module.scss";

interface ITooltipProps {
  text: string;
  id: string;
}

const Tooltip = ({ text, id }: ITooltipProps) => {
  return <ReactTooltip className={styles.wrapper} content={text} id={id} />;
};

export default Tooltip;
