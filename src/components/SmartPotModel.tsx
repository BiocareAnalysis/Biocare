import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { Mesh } from 'three';

function SmartPot() {
  const meshRef = useRef<Mesh>(null);

  return (
    <group ref={meshRef}>
      {/* Main pot body - brown terracotta color */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.2, 1, 2.2, 32]} />
        <meshPhysicalMaterial
          color="#8B4513"
          roughness={0.8}
          metalness={0}
        />
      </mesh>

      {/* Inner pot */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[1.1, 0.9, 2, 32]} />
        <meshPhysicalMaterial
          color="#654321"
          roughness={0.9}
          metalness={0}
        />
      </mesh>

      {/* Plant stem */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1.5, 8]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>

      {/* Plant leaves arranged in a more natural spiral */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <group key={i} rotation={[0, (angle * Math.PI) / 180, 0]}>
          <mesh position={[0.4, 1.6 + i * 0.15, 0]} rotation={[0, 0, Math.PI / 6]}>
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshStandardMaterial color="#32CD32" />
          </mesh>
          {/* Add smaller secondary leaves */}
          <mesh position={[0.25, 1.4 + i * 0.12, 0.1]} rotation={[0, 0, Math.PI / 8]}>
            <sphereGeometry args={[0.15, 12, 12]} />
            <meshStandardMaterial color="#228B22" />
          </mesh>
        </group>
      ))}

      {/* Soil surface */}
      <mesh position={[0, 1.1, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[1.1, 1.1, 0.1, 32]} />
        <meshStandardMaterial color="#3E2723" roughness={1} />
      </mesh>

      {/* Base plate */}
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[1.3, 1.3, 0.2, 32]} />
        <meshPhysicalMaterial
          color="#8B4513"
          roughness={0.8}
          metalness={0}
        />
      </mesh>

      {/* Top rim */}
      <mesh position={[0, 1.1, 0]}>
        <torusGeometry args={[1.2, 0.1, 16, 32]} />
        <meshPhysicalMaterial
          color="#8B4513"
          roughness={0.8}
          metalness={0}
        />
      </mesh>

      {/* Smart sensor ring around the pot */}
      <mesh position={[0, 0.5, 0]}>
        <torusGeometry args={[1.25, 0.05, 16, 32]} />
        <meshPhysicalMaterial
          color="#2563eb"
          roughness={0.2}
          metalness={0.8}
          emissive="#1d4ed8"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Small LED indicators */}
      {[0, 90, 180, 270].map((angle, i) => (
        <mesh 
          key={i} 
          position={[
            Math.cos((angle * Math.PI) / 180) * 1.3,
            0.5,
            Math.sin((angle * Math.PI) / 180) * 1.3
          ]}
        >
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshPhysicalMaterial
            color="#10b981"
            emissive="#059669"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

const SmartPotModel: React.FC = () => {
  return (
    <div className="h-[400px] w-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden border border-gray-200">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [4, 2, 4], fov: 50 }}>
        <Stage environment="city" intensity={0.6}>
          <SmartPot />
        </Stage>
        <OrbitControls
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
          makeDefault
        />
      </Canvas>
    </div>
  );
};

export default SmartPotModel;