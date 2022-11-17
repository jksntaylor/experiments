import react, { Suspense } from 'react'
import { OrbitControls, useVideoTexture } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, DotScreen, Bloom } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing'
import styled from 'styled-components'

const FallbackMaterial = () => <meshBasicMaterial color="white" />

const Billboard: React.FC<{}> = () => {

  const texture = useVideoTexture('10.mp4', {})

  return <mesh>
    <planeGeometry args={[9, 5, 1, 1]} />
    <Suspense fallback={<FallbackMaterial />}>
      <meshBasicMaterial map={texture}/>
    </Suspense>
  </mesh>

}

const BillboardScene: React.FC<{}> = () => {
  return <Wrapper>
    <Suspense fallback={null}>
      <Canvas>
        <Billboard />
        <OrbitControls />
        <EffectComposer>
          <DotScreen blendFunction={BlendFunction.LIGHTEN} scale={1.3}/>
          <Bloom intensity={1.15} luminanceThreshold={0.2} />
        </EffectComposer>
      </Canvas>
    </Suspense>
  </Wrapper>
}

const Wrapper = styled.section`
  background: #000;
  height: 100vh;
  width: 100vw;
`

export default BillboardScene;
