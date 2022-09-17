import { Camera, Canvas, useThree } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import WbsLights from "./components/lights/Lights";
import { OrbitControls } from "@react-three/drei";
import Casing from "./components/casing/Casing";
import Tubing from "./components/tubing/Tubing";
import NoDataText from "./components/noDataText/NoDataText";
import classes from "./ThreeDSchematic.module.css";
import { WbsHelper } from "./components/helpers/wbsHelper";
import { Mesh, Object3D, Raycaster, Scene, Vector2 } from "three";
import { WbsRow } from "./components/models/wbsRow";
import WbsSettings from "./components/wbsSettings/WbsSettings";
import WbsProvider, { useWbsContext } from "./state/WbsContext";
import { Spin } from "antd";

type Props = {
  data: WbsRow[];
};

const Schematic = ({ data }: Props) => {
  const depthControlRef = useRef(null);
  const settingsRef = useRef(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const { depthScale } = useWbsContext();

  const LENGTH_SCALE = 1.7;

  const wbsHelper = new WbsHelper(data);

  const maxDepthBenchMark = 9500;
  const depthScaleBenchMark = 0.01;
  const hiddenDepthScale =
    depthScaleBenchMark * (maxDepthBenchMark / wbsHelper.maxDepth);

  const plotScale = depthScale * hiddenDepthScale;

  const scale = plotScale * LENGTH_SCALE;

  let globalScene: Scene, globalCamera: Camera;

  const CaptureControls = () => {
    // just capture the scene
    const { scene, camera } = useThree();
    globalScene = scene;
    globalCamera = camera;

    // feed settings component with scene
    if (settingsRef.current)
      (settingsRef.current as any).updateScene(globalScene);
    // feed depth control with scene
    if (depthControlRef.current)
      (depthControlRef.current as any).updateScene(globalScene);

    return <></>;
  };

  // for interaction events
  const raycaster = new Raycaster();
  const mouse = new Vector2();
  let intersectedItem: any;
  let intersectedCompItems: Object3D[] = [];

  function onMouseMove(ev: any) {
    // check if scene is rendered or not
    if (!globalScene) return;

    // set the scence to the initial state
    const mousePosition = wbsHelper.getMousePosition(ev, canvasContainerRef);
    const hoverColor = "#A4C639"; //0x34a853

    mouse.x = mousePosition.mouseX;
    mouse.y = mousePosition.mouseY;

    raycaster?.setFromCamera(mouse, globalCamera);
    // calculate objects intersecting the picking ray
    const visibleChildren = globalScene.children.filter(
      (child) => child.visible
    );
    const intersects = raycaster.intersectObjects<Mesh>(visibleChildren);

    if (intersects.length > 0) {
      if (intersects[0] !== intersectedItem) {
        if (intersectedItem)
          intersectedItem.material.color?.set(intersectedItem.userData?.color);
        intersectedCompItems.forEach((item) => {
          item.children.forEach((child) => {
            (child as any).material?.color?.set(child.userData?.color);
          });
        });

        intersectedItem = intersects[0].object;
        intersectedCompItems =
          globalScene.children?.filter(
            (child) => child.userData?._id === intersectedItem?.userData?._id
          ) ?? [];
        if (intersectedItem.userData?.color)
          intersectedItem.material.color?.setHex(hoverColor);
        intersectedCompItems.forEach((item) => {
          item.children.forEach((child) => {
            if (child.userData?.color)
              (child as any).material.color?.set(hoverColor);
          });
        });
      }
    } else {
      // no intersects
      if (intersectedItem)
        intersectedItem.material?.color?.set(intersectedItem.userData?.color);
      intersectedItem = null;
      intersectedCompItems = [];
    }
  }

  return (
    <Suspense fallback={<Spin />}>
      <div
        className={classes.container}
        onMouseMove={onMouseMove}
        ref={canvasContainerRef}
      >
        <Canvas camera={{ position: [0, 0, 150], fov: 75, far: 10000000 }}>
        <color attach="background" args={["#f7faf7"]} />
          <WbsLights />
          {wbsHelper.data.length > 0 && <OrbitControls makeDefault />}
          <CaptureControls />

          {wbsHelper.casingArr.map((csg) => {
            return (
              <Casing
                key={csg._id}
                lengthScale={scale}
                maxOdAtBottom={wbsHelper.getMaxOdAtDepth(csg.bottom)}
                params={{
                  top: csg.top,
                  bottom: csg.bottom,
                  outerR: csg.od,
                  innerR: csg.id,
                  text: csg.text,
                  _id: csg._id,
                }}
                accessories={[]}
              />
            );
          })}

          {wbsHelper.tubingArr.map((tbg) => {
            return (
              <Tubing
                key={tbg._id}
                lengthScale={scale}
                maxOdAtBottom={wbsHelper.getMaxOdAtDepth(tbg.bottom)}
                params={{
                  top: tbg.top,
                  bottom: tbg.bottom,
                  outerR: tbg.od,
                  innerR: tbg.id,
                  text: tbg.text,
                  _id: tbg._id,
                }}
                accessories={[]}
                xTransition={0}
              />
            );
          })}

          {wbsHelper.data.length === 0 && <NoDataText />}
        </Canvas>

        <WbsSettings />
      </div>
    </Suspense>
  );
};

const ThreeDSchematic = (props: Props) => {
  return (
    <WbsProvider>
      <Schematic {...props} />
    </WbsProvider>
  );
};

export default ThreeDSchematic;
