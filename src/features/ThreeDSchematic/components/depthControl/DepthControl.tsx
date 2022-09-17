import { forwardRef, useImperativeHandle, useState } from "react";
import { Scene } from "three";
import { WbsHelper } from "../helpers/wbsHelper";
import { Slider } from "antd";

type DepthRange = {
  min: number;
  max: number;
  value: number;
};

type Props = {
  wbsHelper: WbsHelper;
  lengthScale: number;
};

const DepthControl = forwardRef(({ wbsHelper, lengthScale }: Props, ref) => {
  const [depthRange, setDepthRange] = useState<DepthRange>({
    min: Math.floor(wbsHelper.minDepth) ?? 0,
    max: Math.ceil(wbsHelper.maxDepth) ?? 10000,
    value: wbsHelper.minDepth ?? 0,
  });
  const [scene, setScene] = useState<Scene | null>(null);

  const updateViewDepth = (val: number) => {
    setDepthRange({ ...depthRange, value: val });

    if (!scene) return;
    scene.position.setY(val * lengthScale);

    let depthRing = scene.children.find((child) => child.name === "depthRing");
    if (depthRing) {
      depthRing.position.setY(-val * lengthScale);
    }
    let depthText = scene.children.find((child) => child.name === "depthText");
    if (depthText) {
      (depthText as any)["text"] = val;
      depthText.position.setY(-val * lengthScale);
    }
  };

  useImperativeHandle(ref, () => {
    return {
      updateScene: updateScene,
      updateDepthRange: updateDepthRange,
      updateViewDepth: updateViewDepth,
    };
  });

  const updateScene = (globalScene: Scene) => {
    setScene(globalScene);
  };

  const updateDepthRange = (min: number, max: number) => {
    let val = depthRange.value;
    if (val > max) {
      val = max;
    }
    if (val < min) {
      val = min;
    }

    setDepthRange({ min: Math.floor(min), max: Math.ceil(max), value: val });
    setTimeout(() => {
      updateViewDepth(val);
    }, 0);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        paddingTop: 20,
      }}
    >
      <Slider
        vertical
        reverse
        min={depthRange.min}
        max={depthRange.max}
        step={1}
        onChange={(value) => updateViewDepth(parseFloat(value.toString()))}
        value={depthRange.value}
        style={{ height: "90%" }}
        tooltipPlacement="bottom"
      />
    </div>
  );
});

export default DepthControl;
