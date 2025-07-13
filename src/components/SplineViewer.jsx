"use client";
import { useEffect, useRef } from "react";
import { Application } from "@splinetool/runtime";

const SplineViewer = ({ scene }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const app = new Application(canvasRef.current);
      app.load(scene);
    }
  }, [scene]);

  return (
    <div className="spline-container">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default SplineViewer;
