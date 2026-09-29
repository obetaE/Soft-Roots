"use client";
import { ContactShadows, Environment, Lightformer, OrbitControls, useProgress } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Component, Suspense, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Vector3 } from "three";
import TruckModel from "./TruckModel";
import styles from "./build.module.css";

const TARGET = [0, 0.85, 0];

const CAMERA_VIEWS = {
  angle: { label: "3/4", position: [6.2, 2.4, 6.6] },
  front: { label: "Front", position: [0, 1.6, 8.8] },
  side: { label: "Side", position: [9.2, 1.8, 0] },
  rear: { label: "Rear", position: [-4.6, 2.8, -7.6] },
};

const subscribeToMotion = (callback) => {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
};
const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Glides the camera to a preset view; any manual drag cancels the move. */
function CameraRig({ view }) {
  const camera = useThree((state) => state.camera);
  const controls = useThree((state) => state.controls);
  const destination = useRef(null);

  useEffect(() => {
    destination.current = new Vector3(...CAMERA_VIEWS[view.name].position);
  }, [view]);

  useEffect(() => {
    if (!controls) return;
    const cancel = () => {
      destination.current = null;
    };
    controls.addEventListener("start", cancel);
    return () => controls.removeEventListener("start", cancel);
  }, [controls]);

  useFrame((_, delta) => {
    if (!destination.current) return;
    camera.position.lerp(destination.current, 1 - Math.exp(-delta * 4));
    controls?.update();
    if (camera.position.distanceTo(destination.current) < 0.02) destination.current = null;
  });

  return null;
}

class ViewerErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <div className={styles.viewerMessage}>
          <p>Your browser couldn’t start the 3D preview. You can still configure and price your truck.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function TruckViewer({ truck, look, onToggleHeadlights }) {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(true);
  const [view, setView] = useState({ name: "angle", nonce: 0 });
  const [autoRotate, setAutoRotate] = useState(true);
  const reduceMotion = useSyncExternalStore(subscribeToMotion, prefersReducedMotion, () => false);
  const { active, progress } = useProgress();

  // Stop rendering entirely while the viewer is scrolled out of sight.
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={styles.viewer}>
      <ViewerErrorBoundary>
        <Canvas
          dpr={[1, 2]}
          frameloop={inView ? "always" : "never"}
          camera={{ position: CAMERA_VIEWS.angle.position, fov: 35 }}
          gl={{ antialias: true, powerPreference: "high-performance" }}
          role="img"
          aria-label={`Interactive 3D preview of your ${truck.brand} ${truck.model}`}
        >
          <color attach="background" args={["#0d0d0d"]} />
          <fog attach="fog" args={["#0d0d0d", 14, 30]} />
          <ambientLight intensity={0.35} />
          <directionalLight position={[6, 9, 5]} intensity={2.2} />
          <Suspense fallback={null}>
            <TruckModel truck={truck} look={look} />
            {/* Procedural studio lighting: no external HDR files, so the CSP stays strict. */}
            <Environment resolution={256} frames={1}>
              <Lightformer form="rect" intensity={2.5} position={[0, 6, 0]} rotation-x={Math.PI / 2} scale={[12, 12, 1]} />
              <Lightformer form="rect" intensity={1.6} color="#ffd98a" position={[-6, 2, 3]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} />
              <Lightformer form="rect" intensity={1.2} position={[6, 2, -3]} rotation-y={-Math.PI / 2} scale={[8, 3, 1]} />
            </Environment>
          </Suspense>
          {/* A large dark floor that fog fades into the background, so no hard edge is visible. */}
          <mesh rotation-x={-Math.PI / 2} position-y={-0.002}>
            <circleGeometry args={[40, 64]} />
            <meshStandardMaterial color="#0f0f0f" roughness={1} metalness={0} envMapIntensity={0.15} />
          </mesh>
          <ContactShadows position={[0, 0, 0]} opacity={0.7} scale={14} blur={2.5} far={3} resolution={512} color="#000000" />
          <OrbitControls
            makeDefault
            enablePan={false}
            minDistance={5.5}
            maxDistance={13}
            minPolarAngle={0.35}
            maxPolarAngle={Math.PI / 2 - 0.08}
            target={TARGET}
            autoRotate={autoRotate && !reduceMotion}
            autoRotateSpeed={0.5}
            onStart={() => setAutoRotate(false)}
          />
          <CameraRig view={view} />
        </Canvas>

        {active && (
          <div className={styles.loader} role="status">
            Loading truck… {Math.round(progress)}%
          </div>
        )}

        <p className={styles.hint}>Drag to rotate · Scroll to zoom</p>

        <div className={styles.toolbar} role="group" aria-label="Viewer controls">
          {Object.entries(CAMERA_VIEWS).map(([name, preset]) => (
            <button
              key={name}
              type="button"
              className={styles.toolbarButton}
              onClick={() => {
                setAutoRotate(false);
                setView({ name, nonce: Date.now() });
              }}
            >
              {preset.label}
            </button>
          ))}
          <button
            type="button"
            className={styles.toolbarButton}
            aria-pressed={look.headlights}
            onClick={onToggleHeadlights}
          >
            Lights
          </button>
          {!reduceMotion && (
            <button
              type="button"
              className={styles.toolbarButton}
              aria-pressed={autoRotate}
              onClick={() => setAutoRotate((value) => !value)}
            >
              Spin
            </button>
          )}
        </div>
      </ViewerErrorBoundary>
    </div>
  );
}
