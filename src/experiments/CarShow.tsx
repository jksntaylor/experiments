// @ts-nocheck
import { CubeCamera, Environment, MeshReflectorMaterial, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import React, { Suspense, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Color, LinearEncoding, Mesh, RepeatWrapping, TextureLoader } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const Rings = () => {
  const itemsRef = useRef([])

  useFrame(() => {
    for (let i=0;i<itemsRef.current.length;i++) {
      let mesh = itemsRef.current[i]

      let z = (i - 7) * 3.5
      mesh.position.set(0, 0, -z)

      let dist = Math.abs(z)
      mesh.scale.set(1 - dist * 0.04, 1 - dist * 0.04, 1 - dist * 0.04)

      let colorScale = 1
      if (dist > 2) colorScale = 1 - (Math.min(dist, 12) - 2) / 10
      colorScale *= 0.5

      if (i % 2 === 1) {
        mesh.material.emissive = new Color(6, 0.15, 0.7).multiplyScalar(colorScale)
      } else {
        mesh.material.emissive = new Color(0.1, 0.7, 3).multiplyScalar(colorScale)
      }
    }
  })

  return <>
    {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((v, i) => (
      <mesh
        castShadow
        receiveShadow
        position={[0, 0, 0]}
        key={i}
        ref={el => itemsRef.current[i] = el}
      >
        <torusGeometry args={[3.35, 0.05, 16, 100]} />
        <meshStandardMaterial emissive={[0.5, 0.5, 0.5]} color={[0, 0, 0]} />
      </mesh>
    ))}
  </>
}

const Car = () => {
  const gltf = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/carshow/models/car/scene.gltf"
  )

  useEffect(() => {
    gltf.scene.scale.set(0.005, 0.005, 0.005)
    gltf.scene.position.set(0, -0.035, 0)
    gltf.scene.traverse(object => {
      if (object instanceof Mesh) {
        object.castShadow = true
        object.receiveShadow = true
        object.material.envMapIntensity = 20
      }
    })
  }, [gltf])

  return <primitive object={gltf.scene}/>
}

const Ground = () => {

  const [roughness, normal] = useLoader(
    TextureLoader, [
      process.env.PUBLIC_URL + "/carshow/textures/terrain-roughness.jpeg",
      process.env.PUBLIC_URL + "/carshow/textures/terrain-normal.jpeg"
    ]
  )

  useEffect(() => {
    [normal, roughness].forEach(t => {
      t.wrapS = RepeatWrapping
      t.wrapT = RepeatWrapping
      t.repeat.set(5, 5)
    })

    normal.encoding = LinearEncoding
  }, [normal, roughness])

  return <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow>
    <planeGeometry args={[30, 30]} />
    <MeshReflectorMaterial
      envMapIntensity={0}
      normalMap={normal}
      normalScale={[0.15, 0.15]}
      roughnessMap={roughness}
      dithering
      color={[0.015, 0.015, 0.015]}
      roughness={0.7}
      blur={[1000, 400]}
      mixBlur={30}
      mixStrength={80}
      mixContrast={1}
      resolution={1024}
      mirror={0}
      depthScale={0.01}
      minDepthThreshold={0.9}
      maxDepthThreshold={1}
      depthToBlurRatioBias={0.25}
      reflectorOffset={0.2}
    />
  </mesh>
}

const Scene = () => {
  return <>
    <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
    <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

    <color args={[0, 0, 0]} attach="background" />

    <spotLight
      color={[1, 0.25, 0.7]}
      intensity={1.5}
      angle={0.6}
      penumbra={0.5}
      position={[5, 5, 0]}
      castShadow
      shadow-bias={-0.0001}
    />

    <spotLight
      color={[0.14, 0.5, 1]}
      intensity={2}
      angle={0.6}
      penumbra={0.5}
      position={[-5, 5, 0]}
      castShadow
      shadow-bias={-0.0001}
    />

    <Ground />

    <CubeCamera resolution={256} frames={Infinity}>
      {(texture) => (
        <>
          <Environment map={texture} />
          <Car />
        </>
      )}
    </CubeCamera>

    <Rings />
  </>
}

const CarShow = () => {
  return <Wrapper>
    <Suspense fallback={null}>
      <Canvas shadows>
        <Scene />
      </Canvas>
    </Suspense>
  </Wrapper>
}

const Wrapper = styled.section`
  height: 100vh
`

export default CarShow
