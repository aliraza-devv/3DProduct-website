import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  MeshTransmissionMaterial,
  ContactShadows,
  Environment,
  OrbitControls,
} from "@react-three/drei";
import { easing } from "maath";
import { useStore } from "./store";
import { ArmChair } from "./ArmChair";

export default function App() {
  return (
    <Canvas
      eventSource={document.getElementById("root")}
      eventPrefix="client"
      camera={{ position: [0, 0, 4], fov: 40 }}
    >
      <OrbitControls />
      <ambientLight intensity={0.7} />
      <spotLight
        intensity={0.5}
        angle={0.1}
        penumbra={1}
        position={[10, 15, -5]}
        castShadow
      />
      <Environment preset="city" background blur={1} />
      <ContactShadows
        resolution={512}
        position={[0, -0.8, 0]}
        opacity={1}
        scale={10}
        blur={2}
        far={0.8}
      />
      <Selector>
        <ArmChair rotation={[0.3, Math.PI / 1.6, 0]} />
      </Selector>

      {/* <Shoe rotation={[0.3, Math.PI / 1.6, 0]} /> */}
    </Canvas>
  );
}

function Selector({ children }) {
  const ref = useRef();
  const store = useStore();
  useFrame(({ viewport, camera, pointer }, delta) => {
    const { width, height } = viewport.getCurrentViewport(camera, [0, 0, 3]);
    easing.damp3(
      ref.current.position,
      [(pointer.x * width) / 2, (pointer.y * height) / 2, 3],
      store.open ? 0 : 0.1,
      delta
    );
    easing.damp3(
      ref.current.scale,
      store.open ? 4 : 0.01,
      store.open ? 0.5 : 0.2,
      delta
    );
    easing.dampC(
      ref.current.material.color,
      store.open ? "#ffe6a7" : "#d4a373",
      0.1,
      delta
    );
  });
  return (
    <>
      <mesh ref={ref}>
        <circleGeometry args={[1, 64, 64]} />
        <MeshTransmissionMaterial
          samples={16}
          resolution={512}
          anisotropy={1}
          thickness={0.1}
          roughness={0.4}
          toneMapped={true}
        />
      </mesh>
      <group
        onPointerOver={() => (store.open = true)}
        onPointerOut={() => (store.open = false)}
        onPointerDown={() => (store.open = true)}
        onPointerUp={() => (store.open = false)}
      >
        {children}
      </group>
    </>
  );
}

// function Shoe(props) {
//   const ref = useRef();
//   const { nodes, materials } = useGLTF(
//     "/nike_air_zoom_pegasus_36-transformed.glb"
//   );
//   useFrame((state) => {
//     const t = state.clock.getElapsedTime();
//     ref.current.rotation.set(
//       Math.cos(t / 4) / 6,
//       Math.sin(t / 3) / 2,
//       0.15 + Math.sin(t / 2) / 6
//     );
//     ref.current.position.y = (0.5 + Math.cos(t / 2)) / 7;
//   });
//   return (
//     <group ref={ref}>
//       <mesh
//         receiveShadow
//         castShadow
//         geometry={nodes.defaultMaterial.geometry}
//         material={materials.NikeShoe}
//         {...props}
//       />
//     </group>
//   );
// }

// useGLTF.preload("/nike_air_zoom_pegasus_36-transformed.glb");
