"use client";
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Suspense } from 'react';

interface ModelProps {
  url: string;
}

const Model = ({ url }: ModelProps) => {
  const { scene } = useGLTF(url); // useGLTF returns an object with the scene property
  return <primitive object={scene} />;
};

export default function GltfLoader({ url }: ModelProps) {
  return (
    <div className="w-full h-full">
      <Canvas shadows>
        <Suspense fallback={null}>
          {/* Camera */}
          <PerspectiveCamera makeDefault position={[5, 5, 5]} />
          
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 5, 3]}
            intensity={1}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          
          {/* Environment and Model */}
          <Environment preset="city" />
          <Model url={url} />
          
          {/* Controls */}
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            minDistance={0.5}
            maxDistance={10}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
