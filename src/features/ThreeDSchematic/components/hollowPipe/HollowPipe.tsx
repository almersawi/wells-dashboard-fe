import {
  DoubleSide,
  Mesh,
  CylinderGeometry,
  MeshStandardMaterial,
  BoxGeometry,
  Material,
} from "three";
import { CSG } from "three-csg-ts";
import { PipeParams } from "../models/pipeParams";
import { WbsRow } from "../models/wbsRow";

type Props = {
  params: PipeParams;
  lengthScale: number;
  planeMaterial?: Material;
  exclude?: WbsRow[];
  position?: { x: number; y: number; z: number };
  holes?: {
    diameter: number;
    side: "left" | "right" | "center";
    fromCenter: number;
  }[];
  rotate?: { x: number; y: number; z: number };
};

const HollowPipe = ({
  params,
  exclude,
  position,
  lengthScale,
  holes,
  planeMaterial,
  rotate,
}: Props) => {
  const material =
    params.material ??
    new MeshStandardMaterial({
      side: DoubleSide,
      metalness: 1,
      roughness: 0.6
    });

  const outerR = params.outerR;
  const innerR = params.innerR;
  const top = params.top * lengthScale;
  const bottom = params.bottom * lengthScale;
  const endAngle = params.endAngle;
  const length = Math.abs(top - bottom);
  const outerCyliner = new Mesh(
    new CylinderGeometry(
      outerR,
      outerR,
      length,
      64,
      1,
      false,
      0,
      endAngle ? endAngle : Math.PI
    )
  );
  const innerCyliner = new Mesh(
    new CylinderGeometry(
      innerR,
      innerR,
      length,
      64,
      1,
      false,
      0,
      endAngle ? endAngle : Math.PI
    )
  );
  const rightPlanMesh = new Mesh(
    new BoxGeometry(outerR - innerR, length, 0.1),
    material
  );
  const leftPlanMesh = new Mesh(
    new BoxGeometry(outerR - innerR, length, 0.1),
    material
  );
  let oBSP = CSG.fromMesh(outerCyliner); // for outer cylinder
  let iBSP = CSG.fromMesh(innerCyliner); // for inner cylinder
  let rBSP = CSG.fromMesh(rightPlanMesh); // for right plan
  let lBSP = CSG.fromMesh(leftPlanMesh); // for left plan

  // exclude accessories from string
  exclude?.forEach((ex) => {
    if (ex.top !== ex.bottom) {
      // make cylinder for accessory
      const exTop = (ex.top - params.top) * lengthScale;
      const exBottom = (ex.bottom - params.top) * lengthScale;

      const exLength = Math.abs(exBottom - exTop);
      const exCylinder = new Mesh(
        new CylinderGeometry(
          params.outerR,
          params.outerR,
          exLength,
          64,
          1,
          false,
          0,
          endAngle ? endAngle : Math.PI
        )
      );

      exCylinder.position.set(0, length / 2 - exTop - exLength / 2, 0);
      const exPlanMesh = new Mesh(
        new BoxGeometry(outerR - innerR, exLength, 0.1)
      );

      exPlanMesh.position.set(0, length / 2 - exTop - exLength / 2, 0);

      exPlanMesh.updateMatrix();
      exCylinder.updateMatrix();
      const exBSP = CSG.fromMesh(exCylinder);
      const exPlanBSP = CSG.fromMesh(exPlanMesh);

      oBSP = oBSP.subtract(exBSP);
      iBSP = iBSP.subtract(exBSP);

      rBSP = rBSP.subtract(exPlanBSP);
      lBSP = lBSP.subtract(exPlanBSP);
    }
  });

  // check if we have holes
  holes?.forEach((hole) => {
    const holeLength =
      hole.side === "center" ? params.outerR * 2 + 2 : params.outerR + 2;
    const holePosition = hole.fromCenter * lengthScale;
    const holeCylinder = new Mesh(
      new CylinderGeometry(
        hole.diameter,
        hole.diameter,
        holeLength,
        64,
        1,
        false,
        0
      )
    );
    holeCylinder.position.set(
      hole.side !== "center" ? hole.diameter + 0.1 : 0,
      holePosition,
      hole.side === "right" ? outerR : hole.side === "left" ? -outerR : 0
    );
    if (hole.side === "center") {
      holeCylinder.rotateZ(Math.PI / 2);
    } else {
      holeCylinder.rotateX(Math.PI / 2);
    }
    holeCylinder.updateMatrix();
    const holeBSP = CSG.fromMesh(holeCylinder);
    oBSP = oBSP.subtract(holeBSP);
  });

  let cyliderSub = oBSP.subtract(iBSP);

  const hollowPipeMesh = CSG.toMesh(cyliderSub, outerCyliner.matrix, material);
  const resultRightPlanMesh = CSG.toMesh(
    rBSP,
    rightPlanMesh.matrix,
    planeMaterial ?? material
  );
  const trsultLeftPlanMesh = CSG.toMesh(
    lBSP,
    leftPlanMesh.matrix,
    planeMaterial ?? material
  );

  hollowPipeMesh.rotateY(Math.PI / 2);
  hollowPipeMesh.position.set(0, -top - length / 2, 0);

  return (
    <>
      <mesh
        position={[position?.x ?? 0, position?.y ?? 0, position?.z ?? 0]}
        userData={{
          _id: params._id,
          color: "#" + material.color.getHexString(),
        }}
        rotation-x={rotate?.x ?? 0}
        rotation-y={rotate?.y ?? 0}
        rotation-z={rotate?.z ?? 0}
      >
        <primitive
          object={hollowPipeMesh}
          userData={{
            _id: params._id,
            color: "#" + material.color.getHexString(),
          }}
        ></primitive>
        {/* add two plans to fill gap between the two cylinders */}

        <mesh position={[outerR - (outerR - innerR) / 2, -top - length / 2, 0]}>
          <primitive
            object={resultRightPlanMesh}
            userData={{
              _id: params._id,
              color: "#" + material.color.getHexString(),
            }}
          ></primitive>
        </mesh>
        <mesh
          position={[-(outerR - (outerR - innerR) / 2), -top - length / 2, 0]}
        >
          <primitive
            object={trsultLeftPlanMesh}
            userData={{
              _id: params._id,
              color: "#" + material.color.getHexString(),
            }}
          ></primitive>
        </mesh>
      </mesh>
    </>
  );
};

export default HollowPipe;
