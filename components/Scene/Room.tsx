import { Html, useAnimations, useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import styles from './Office.module.scss';

export const Room = () => {
  const group = useRef<any>();
  const { nodes, materials, animations }: any = useGLTF('/models/room_2.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions['Cat-Clock-Loop']?.play();
  }, [actions]);

  const material = new THREE.MeshPhongMaterial({ shininess: 10 });
  material.map = materials['mt_background.002'].map;
  material.color = new THREE.Color(
    materials['mt_background.002'].color
  ).multiplyScalar(0.8);

  return (
    <group ref={group} dispose={null}>
      <group name="Scene">
        <group name="Vert" />
        <mesh
          name="Table001"
          castShadow
          receiveShadow
          geometry={nodes.Table001.geometry}
          material={materials['mt_assets.001']}
          position={[0.809, 0, -0.621]}
          rotation={[Math.PI / 2, 0, -0.296]}
          scale={[1, 0.8, 1]}
        />
        <mesh
          name="Table"
          castShadow
          receiveShadow
          geometry={nodes.Table.geometry}
          material={materials['mt_assets_mate.001']}
          position={[0.809, 0, -0.621]}
          rotation={[0, -0.175, 0]}
          scale={[1, 1, 1.901]}
        />
        <mesh
          name="Sm_BK_Wire_04"
          castShadow
          receiveShadow
          geometry={nodes.Sm_BK_Wire_04.geometry}
          material={materials['Material.003']}
          rotation={[Math.PI / 2, 0, -0.442]}
          scale={2.254}
        />
        <mesh
          name="Sm_BK_Wire_03"
          castShadow
          receiveShadow
          geometry={nodes.Sm_BK_Wire_03.geometry}
          material={materials['Material.003']}
          rotation={[Math.PI / 2, 0, -0.442]}
          scale={2.254}
        />
        <mesh
          name="Sm_BK_Wire_02"
          castShadow
          receiveShadow
          geometry={nodes.Sm_BK_Wire_02.geometry}
          material={materials['Material.003']}
          rotation={[Math.PI / 2, 0, -0.442]}
          scale={2.254}
        />
        <mesh
          name="Sm_BK_Wire_01"
          castShadow
          receiveShadow
          geometry={nodes.Sm_BK_Wire_01.geometry}
          material={materials['Material.003']}
          rotation={[Math.PI / 2, 0, -0.442]}
          scale={2.254}
        />
        <mesh
          name="FRONT"
          castShadow
          receiveShadow
          geometry={nodes.FRONT.geometry}
          material={materials['mt_assets.001']}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[2.151, 2.241, 1.21]}
        />
        <mesh
          name="Cone"
          castShadow
          receiveShadow
          geometry={nodes.Cone.geometry}
          material={materials['mtl_portal.001']}
          rotation={[-1.736, 0.016, -0.169]}
          scale={[0.706, 3.672, 1.325]}
        />
        <mesh
          name="Box"
          castShadow
          receiveShadow
          geometry={nodes.Box.geometry}
          material={materials['mt_assets.001']}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1, 0.8, 1]}
        />
        <mesh
          name="Assets002"
          castShadow
          receiveShadow
          geometry={nodes.Assets002.geometry}
          material={materials['mt_assets.001']}
          position={[0, 0, -0.125]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1, 0.8, 1]}
        />
        <mesh
          name="Assets"
          castShadow
          receiveShadow
          geometry={nodes.Assets.geometry}
          material={materials['mt_assets.001']}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1, 0.8, 1]}
        />
        <mesh
          name="ARQ"
          castShadow
          receiveShadow
          geometry={nodes.ARQ.geometry}
          material={material}
          scale={[1, 0.8, 1]}
        />
        <group
          name="Armature-Assets"
          position={[2.374, 1.316, -0.442]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
        >
          <skinnedMesh
            name="Cat002"
            geometry={nodes.Cat002.geometry}
            material={materials['mt_cat.001']}
            skeleton={nodes.Cat002.skeleton}
          />
          <primitive object={nodes.Cat} />
        </group>
        <mesh
          name="Door"
          castShadow
          receiveShadow
          geometry={nodes.Door.geometry}
          material={materials['mt_background.003']}
          position={[1.91, 1.541, -3.04]}
          scale={[1, 0.8, 1]}
        />

        <mesh
          name="screen001"
          castShadow
          receiveShadow
          geometry={nodes.screen001.geometry}
          position={[-1.863, 1.025, -3.787]}
          rotation={[-1.588, -0.077, 1.349]}
          scale={[0.141, 0.1, 0.141]}
        >
          <Html
            rotation={[Math.PI / 2, -0.03, 0]}
            wrapperClass={styles.html}
            distanceFactor={0.6}
            prepend={false}
            transform
            style={{ transform: 'translate3d(0,0,0)' }}
          >
            <iframe src="https://os.tomasferreras.com/"></iframe>
          </Html>
          <RectArealightWithHelper color="#3e9697" />
        </mesh>
      </group>
    </group>
  );
};

const RectArealightWithHelper = ({ color }: { color: string }) => {
  const { scene } = useThree();

  RectAreaLightUniformsLib.init();

  const rectLight = new THREE.RectAreaLight(color, 30, 0.2, 0.2);
  rectLight.position.set(-1.806, 1.01, -3.75);
  rectLight.rotation.set(0, -Math.PI / 2, 0);
  scene.add(rectLight);

  return null;
};

useGLTF.preload('/models/room_2.glb');
