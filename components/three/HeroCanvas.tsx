"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import TalentOrb from "./TalentOrb";

function OrbFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-32 h-32 rounded-full animate-pulse"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)" }} />
    </div>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <TalentOrb />
      </Suspense>
    </Canvas>
  );
}
