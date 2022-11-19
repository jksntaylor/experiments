import React, { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import styled from "styled-components"
import { Environment, OrbitControls } from "@react-three/drei"
import { Mesh } from "three"

const Glass: React.FC<{}> = () => {
  const glassRef = useRef<Mesh>(null!)

  useFrame(() => {
    glassRef.current.rotation.set(glassRef.current.rotation.x + 0.03, glassRef.current.rotation.y + 0.01, 0)
  })

  return <mesh ref={glassRef}>
    <icosahedronGeometry args={[100, 0]} />
    <meshPhysicalMaterial
      color="white"
      transmission={1}
      roughness={0.005}
      thickness={350}
      clearcoat={1}
      clearcoatRoughness={0}
    />
  </mesh>
}

const GlassRefraction: React.FC<{}> = () => {

  return <Wrapper data-scroll-section>
    <Suspense fallback={<></>}>
    <Canvas camera={{ position: [0, 0, 250]}} dpr={2}>
      <ambientLight intensity={0.5} />
      <Glass />
      <OrbitControls />
      <Environment preset="sunset" background/>
    </Canvas>
    </Suspense>
  </Wrapper>
}

const Wrapper = styled.section`
  background: radial-gradient(#2d2d2e, #0c0c0c);
  height: 100vh;
  width: 100vw;
  margin: auto auto;
`

export default GlassRefraction
