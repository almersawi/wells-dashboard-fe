import styles from "./WbsSettings.module.css";
import { InputNumber } from "antd";
import { useWbsContext } from "../../state/WbsContext";

const WbsSettings = () => {
  const { depthScale, setDepthScale } = useWbsContext();
  const minDepthScale = 0.01;
  const maxDepthScale = 5;

  const depthScaleChangeHandeler = (value: number) => {
    if (value < minDepthScale) value = minDepthScale;
    if (value > maxDepthScale) value = maxDepthScale;

    setDepthScale(value);
  };

  return (
    <div className={styles.settings_container}>
      <details className={styles.details_container}>
        <summary>Settings</summary>
        <hr />
        <div
          className={`${styles.settings_menu_item} ${styles.mb_1} ${styles.mt_1}`}
        >
          <label htmlFor="depth-scale">Scale:</label>
          <InputNumber
            value={depthScale}
            min={minDepthScale}
            max={maxDepthScale}
            step={0.1}
            onChange={(val) => {
              if (val) depthScaleChangeHandeler(val);
            }}
            id="depth-scale"
            style={{fontSize: 13}}
          />
        </div>
      </details>
    </div>
  );
};

export default WbsSettings;
