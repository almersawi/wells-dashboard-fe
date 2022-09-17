import { forwardRef, useImperativeHandle, useState } from "react";
import { WbsRow } from "../models/wbsRow";
import styles from "./Legend.module.css";

const Legend = forwardRef((props, ref) => {
  const [item, setItem] = useState<WbsRow>();
  const [show, setShow] = useState(false);

  const updateItem = (row: WbsRow) => {
    setItem(row);
  };

  const showLegend = (show: boolean) => {
    setShow(show);
  };

  useImperativeHandle(ref, () => {
    return {
      updateItem,
      showLegend,
    };
  });

  return (
    <div className={`${styles.legend} ${show ? styles.show : ""}`}>
      {item && (
        <>
          <div>Text: {item?.text}</div>
          <div>Type: {item?.type}</div>
          <div>Top: {item?.top}</div>
          <div>Bottom: {item?.bottom}</div>
          {item?.evaluation && <div>Evaluation: {item?.evaluation}</div>}
        </>
      )}
    </div>
  );
});

export default Legend;
