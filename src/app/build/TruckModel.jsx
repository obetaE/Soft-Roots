"use client";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { MathUtils } from "three";
import { trucks } from "@/libs/configurator";
import { applyPaint, applyStance, createPaintShop, prepareTruck, setHeadlights } from "./prepareTruck";

function LightBar({ dimensions, lit }) {
  const width = dimensions.roofWidth * 0.8;
  const segments = 6;
  return (
    <group position={[0, dimensions.roofY + 0.08, dimensions.roofFrontZ - 0.2]}>
      <mesh castShadow>
        <boxGeometry args={[width, 0.09, 0.14]} />
        <meshStandardMaterial color="#161616" metalness={0.6} roughness={0.35} />
      </mesh>
      {Array.from({ length: segments }, (_, index) => (
        <mesh key={index} position={[(index - (segments - 1) / 2) * (width / segments), 0, 0.072]}>
          <boxGeometry args={[width / segments - 0.04, 0.05, 0.01]} />
          <meshStandardMaterial color="#fff6d8" emissive="#fff1c4" emissiveIntensity={lit ? 4 : 0.15} />
        </mesh>
      ))}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * width * 0.42, -0.06, 0]}>
          <boxGeometry args={[0.05, 0.06, 0.08]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
      ))}
    </group>
  );
}

function BedCover({ dimensions }) {
  if (dimensions.bedTopY === null) return null;
  const length = dimensions.bedFrontZ - dimensions.bedBackZ - 0.2;
  return (
    <mesh castShadow position={[0, dimensions.bedTopY + 0.015, (dimensions.bedFrontZ + dimensions.bedBackZ) / 2]}>
      <boxGeometry args={[dimensions.bedWidth * 0.94, 0.04, length]} />
      <meshStandardMaterial color="#1b1b1b" roughness={0.8} />
    </mesh>
  );
}

function RunningBoards({ dimensions }) {
  const length = Math.abs(dimensions.frontWheelZ - dimensions.rearWheelZ) - dimensions.wheelRadius * 2.3;
  const z = (dimensions.frontWheelZ + dimensions.rearWheelZ) / 2;
  return [-1, 1].map((side) => (
    <mesh key={side} castShadow position={[side * (dimensions.width / 2 + 0.04), dimensions.wheelRadius * 0.8, z]}>
      <boxGeometry args={[0.22, 0.05, length]} />
      <meshStandardMaterial color="#2a2a2a" metalness={0.5} roughness={0.4} />
    </mesh>
  ));
}

export default function TruckModel({ truck, look }) {
  const { scene } = useGLTF(truck.modelUrl);
  const invalidate = useThree((state) => state.invalidate);
  const rig = useMemo(() => prepareTruck(scene), [scene]);
  const paintShop = useMemo(() => createPaintShop(rig.atlasMap, truck.swatches), [rig, truck.swatches]);
  const stance = useRef({ ...look.stance });
  const accessories = useRef(null);

  useEffect(() => () => paintShop.dispose(), [paintShop]);

  useLayoutEffect(() => {
    applyPaint(rig, paintShop, { paint: look.paint, accent: look.accent, rim: look.rim });
    invalidate();
  }, [rig, paintShop, look.paint, look.accent, look.rim, invalidate]);

  useLayoutEffect(() => {
    setHeadlights(rig, look.headlights);
    invalidate();
  }, [rig, look.headlights, invalidate]);

  // Ease between stances so lifts and tire changes animate instead of snapping.
  useFrame((_, delta) => {
    const current = stance.current;
    const target = look.stance;
    const ease = 1 - Math.exp(-delta * 8);
    current.tireScale = MathUtils.lerp(current.tireScale, target.tireScale, ease);
    current.lift = MathUtils.lerp(current.lift, target.lift, ease);
    const settled =
      Math.abs(current.tireScale - target.tireScale) < 1e-4 && Math.abs(current.lift - target.lift) < 1e-4;
    if (settled) Object.assign(current, target);
    const rise = applyStance(rig, current);
    if (accessories.current) accessories.current.position.y = rise;
    if (!settled) invalidate();
  });

  return (
    <group>
      <primitive object={rig.object} />
      <group ref={accessories}>
        {look.lightBar && <LightBar dimensions={rig.dimensions} lit={look.headlights} />}
        {look.bedCover && <BedCover dimensions={rig.dimensions} />}
        {look.runningBoards && <RunningBoards dimensions={rig.dimensions} />}
      </group>
    </group>
  );
}

trucks.forEach((truck) => useGLTF.preload(truck.modelUrl));
