// @ts-nocheck

import { Physics, Triplet, useBox, useCompoundBody, usePlane, useRaycastVehicle, useTrimesh } from '@react-three/cannon'
import { Environment, MeshReflectorMaterial, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { BufferAttribute, Mesh, TextureLoader } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const ColliderBox = ({ position, scale }) => {
  let debug = true
  useBox(() => ({
    args: scale,
    position,
    type: 'Static'
  }))

  return debug && <mesh position={position}>
    <boxGeometry args={scale} />
    <meshBasicMaterial transparent opacity={0.25} />
  </mesh>

}

const Ramp: React.FC<{}> = () => {
  const res = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/racetrack/models/ramp.glb"
  )

  const geometry = res.scene.children[0].geometry
  const vertices = geometry.attributes.position.array
  const indices = geometry.index.array

  const [ref] = useTrimesh(
    () => ({
      args: [vertices, indices],
      mass: 0,
      type: 'Static'
    }),
    useRef(null!)
  )
}

const Track: React.FC<{}> = () => {
  const res = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/racetrack/models/track.glb"
  )

  const colorMap = useLoader(
    TextureLoader,
    process.env.PUBLIC_URL + "/racetrack/textures/track.png"
  )

  useEffect(() => {
    colorMap.anisotropy = 16
  }, [colorMap])

  let geometry = res.scene.children[0].geometry

  return <>
    <mesh geometry={geometry}>
      <meshBasicMaterial toneMapped={false} map={colorMap} />
    </mesh>
    <ColliderBox position={[1.75, 0, 0.5]} scale={[0.3, 1, 0.3]}/>
    <ColliderBox position={[2.5, 0, -1.4]} scale={[0.3, 1, 0.3]}/>
    <ColliderBox position={[0.6, 0, -3.8]} scale={[0.3, 1, 0.3]}/>
    <ColliderBox position={[-1.95, 0, -5.18]} scale={[0.3, 1, 0.3]}/>
    <ColliderBox position={[-5.55, 0, -3.05]} scale={[0.3, 1, 0.3]}/>
    <ColliderBox position={[-4.4, 0, -1.77]} scale={[0.3, 1, 0.3]}/>
    <ColliderBox position={[-7.03, 0, -0.76]} scale={[0.3, 1, 0.3]}/>
    <ColliderBox position={[-4.75, 0, 2.73]} scale={[0.3, 1, 0.3]}/>
    <ColliderBox position={[-3.05, 0, 3.4]} scale={[0.3, 1, 0.3]}/>
    <ColliderBox position={[-0.83, 0, 3.2]} scale={[0.3, 1, 0.3]}/>

    <ColliderBox position={[-1.85,0,0.385]} scale={[0.05, 1, 0.13]}/>
    <ColliderBox position={[-1.85,0,-0.385]} scale={[0.05, 1, 0.13]}/>
    <ColliderBox position={[-2.28,0,0.385]} scale={[0.05, 1, 0.13]}/>
    <ColliderBox position={[-2.28,0,-0.385]} scale={[0.05, 1, 0.13]}/>
    <ColliderBox position={[-4.39,0,1.125]} scale={[0.13, 1, 0.13]}/>
    <ColliderBox position={[-4.39,0,1.9]} scale={[0.13, 1, 0.13]}/>

    <ColliderBox position={[-2.86,0,-0.9]} scale={[0.35, 1, 0.35]}/>
    <ColliderBox position={[-3.33,0,-0.9]} scale={[0.35, 1, 0.35]}/>
    <ColliderBox position={[0.41,0,2]} scale={[0.35, 1, 0.35]}/>

    <ColliderBox position={[-2.3,0,-2.76]} scale={[1.37, 1, 1.09]}/>

    <ColliderBox position={[-3.08,0,0.89]} scale={[0.36, 1, 0.03]}/>
    <ColliderBox position={[-2.53,0,0.89]} scale={[0.36, 1, 0.03]}/>

    <ColliderBox position={[-4.53,0,-0.65]} scale={[0.1, 0.5, 0.1]}/>
    <ColliderBox position={[-4.15,0,-0.67]} scale={[0.1, 0.5, 0.1]}/>
    <ColliderBox position={[-4.9,0,-0.58]} scale={[0.1, 0.5, 0.1]}/>
    <ColliderBox position={[-0.3,0,1]} scale={[0.1, 0.5, 0.1]}/>

    <Ramp />
  </>
}

const Ground: React.FC<{}> = () => {
  const [ref] = usePlane(
    () => ({
      type: "Static",
      rotation: [-Math.PI * 0.5, 0, 0]
    }),
    useRef(null!)
  )

  const alpha = useLoader(
    TextureLoader,
    process.env.PUBLIC_URL + "/racetrack/textures/alpha-map.png"
  )

  const grid = useLoader(
    TextureLoader,
    process.env.PUBLIC_URL + "/racetrack/textures/grid.png"
  )

  const ao = useLoader(
    TextureLoader,
    process.env.PUBLIC_URL + "/racetrack/textures/ground-ao.png"
  )

  useEffect(() => {
    grid.anisotropy = 16
  }, [grid])

  const meshRef = useRef<Mesh>(null!)
  const meshRef2 = useRef<Mesh>(null!)
  useEffect(() => {
    let uvs = meshRef.current.geometry.attributes.uv.array
    meshRef.current.geometry.setAttribute('uv2', new BufferAttribute(uvs, 2))

    let uvs2 = meshRef2.current.geometry.attributes.uv.array
    meshRef2.current.geometry.setAttribute('uv2', new BufferAttribute(uvs2, 2))
  }, [meshRef.current, meshRef2.current])

  return <>
    <mesh
      ref={meshRef2}
      position={[-2.285, -0.01, -1.325]}
      rotation-x={-Math.PI * 0.5}
    >
      <planeGeometry args={[12, 12]} />
      <meshBasicMaterial
        opacity={0.325}
        alphaMap={grid}
        transparent={true}
        color="white"
      />
    </mesh>
    <mesh
      ref={meshRef}
      position={[-2.285, -0.015, -1.325]}
      rotation-x={-Math.PI * 0.5}
      rotation-z={-0.079}
    >
      <circleGeometry args={[6.12, 50]} />
      <MeshReflectorMaterial
        aoMap={ao}
        alphaMap={alpha}
        transparent={true}
        color={[0.5, 0.5, 0.5]}
        envMapIntensity={0.35}
        metalness={0.05}
        roughness={0.4}
        dithering={true}
        blur={[1024, 512]}
        mixBlur={3}
        mixStrength={30}
        mixContrast={1}
        resolution={1024}
        mirror={0}
        depthScale={0}
        minDepthThreshold={0.9}
        maxDepthThreshold={1}
        depthToBlurRatioBias={0.25}
        reflectorOffset={0.02}
      />
    </mesh>
  </>
}

const useWheels = (width: number, height: number, front: number, radius: number) => {
  const wheels = [useRef(null!), useRef(null!), useRef(null!), useRef(null!)]

  const wheelInfo = {
    radius,
    directionLocal: [0, -1, 0],
    axleLocal: [1, 0, 0],
    suspensionStiffness: 60,
    suspensionRestLength: 0.1,
    frictionSlip: 5,
    dampingRelaxation: 2.3,
    dampingCompression: 4.4,
    maxSuspensionForce: 100000,
    rollInfluence: 0.01,
    maxSuspensionTravel: 0.1,
    customSlidingRotationalSpeed: -30,
    useCustomSlidingRotationalSpeed: true
  }

  const wheelInfos = [
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [-width * 0.65, height * 0.4, front],
      isFrontWheel: true
    },
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [width * 0.65, height * 0.4, front],
      isFrontWheel: true
    },
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [-width * 0.65, height * 0.4, -front],
      isFrontWheel: false
    },
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [width * 0.65, height * 0.4, -front],
      isFrontWheel: false
    }
  ]

  const propsFunc = () => ({
    collisionFilterGroup: 0,
    mass: 1,
    shapes: [
      {
        args: [wheelInfo.radius, wheelInfo.radius, 0.015, 16],
        rotation: [0, 0, -Math.PI * 0.5],
        type: 'Cylinder'
      }
    ],
    type: 'Kinematic'
  })

  useCompoundBody(propsFunc, wheels[0])
  useCompoundBody(propsFunc, wheels[1])
  useCompoundBody(propsFunc, wheels[2])
  useCompoundBody(propsFunc, wheels[3])

  return [wheels, wheelInfos]
}

const WheelDebug = ({ radius, wheelRef }) => {
  return <group ref={wheelRef}>
    <mesh rotation={[0, 0, -Math.PI * 0.5]}>
      <cylinderGeometry args={[radius, radius, 0.015, 16]} />
      <meshBasicMaterial transparent opacity={0.25} />
    </mesh>
  </group>
}

const useControls = (vehicleApi, chassisApi) => {
  let [controls, setControls] = useState({
    w: false,
    a: false,
    s: false,
    d: false
  })

  useEffect(() => {
    const keydownHandler = e => {
      setControls((controls) => ({
        ...controls,
        [e.key.toLowerCase()]: true
      }))
    }

    const keyupHandler = e => {
      setControls((controls) => ({
        ...controls,
        [e.key.toLowerCase()]: false
      }))
    }

    window.addEventListener('keydown', keydownHandler)
    window.addEventListener('keyup', keyupHandler)

    return () => {
      window.removeEventListener('keydown', keydownHandler)
      window.removeEventListener('keyup', keyupHandler)
    }
  })

  useEffect(() => {
    if (controls.w) {
      vehicleApi.applyEngineForce(150, 2)
      vehicleApi.applyEngineForce(150, 3)
    } else if (controls.s) {
      vehicleApi.applyEngineForce(-150, 2)
      vehicleApi.applyEngineForce(-150, 3)
    } else {
      vehicleApi.applyEngineForce(0, 2)
      vehicleApi.applyEngineForce(0, 3)
    }

    if (controls.a) {
      vehicleApi.setSteeringValue(0.35, 2)
      vehicleApi.setSteeringValue(0.35, 3)
      vehicleApi.setSteeringValue(-0.01, 0)
      vehicleApi.setSteeringValue(-0.01, 1)
    } else if (controls.d) {
      vehicleApi.setSteeringValue(-0.35, 2)
      vehicleApi.setSteeringValue(-0.35, 3)
      vehicleApi.setSteeringValue(0.01, 0)
      vehicleApi.setSteeringValue(0.01, 1)
    } else {
      for (let i=0;i<4;i++) {
        vehicleApi.setSteeringValue(0, i)
      }
    }
  }, [controls, vehicleApi, chassisApi])

  return controls
}

const Car: React.FC<{}> = () => {
  let car = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/racetrack/models/car.glb"
  ).scene

  const position: Triplet = [-1.5, 0.5, 3]
  const width = 0.15
  const height = 0.07
  const front = 0.15
  const wheelRadius = 0.05

  const chassisBodyArgs: Triplet = [width, height, front * 2]
  const [chassisBody, chassisApi] = useBox(
    () => ({
      args: chassisBodyArgs,
      mass: 150,
      position
    }),
    useRef(null!)
  )

  const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius)

  const [vehicle, vehicleApi] = useRaycastVehicle(
    () => ({
      chassisBody,
      wheelInfos,
      wheels
    }),
    useRef(null!)
  )

  useControls(vehicleApi, chassisApi)

  useEffect(() => {
    car.scale.set(0.0012, 0.0012, 0.0012)
    car.children[0].position.set(-365, -18, -67)
  }, [car])

  // return <primitive object={car} rotation-y={Math.PI}/>
  return <group ref={vehicle} name="vehicle">
    <mesh ref={chassisBody}>
      <meshBasicMaterial transparent={true} opacity={0.3}/>
      <boxGeometry args={chassisBodyArgs} />
    </mesh>

    <WheelDebug wheelRef={wheels[0]} radius={wheelRadius} />
    <WheelDebug wheelRef={wheels[1]} radius={wheelRadius} />
    <WheelDebug wheelRef={wheels[2]} radius={wheelRadius} />
    <WheelDebug wheelRef={wheels[3]} radius={wheelRadius} />
  </group>
}

const Scene: React.FC<{}> = () => {
  return <Suspense fallback={null}>
    <Environment
      files={process.env.PUBLIC_URL + "/racetrack/textures/envmap.hdr"}
      background={true}
    />
    <PerspectiveCamera makeDefault position={[-6, 3.9, 6.21]} fov={40} />
    <OrbitControls target={[-2.64, -0.71, 0.03]}/>
    <Track />
    <Ground />
    <Car />
  </Suspense>
}

const RacetrackScene: React.FC<{}> = () => {
  return <Wrapper>
    <Canvas>
      <Physics broadphase='SAP' gravity={[0, -2.6, 0]}>
        <Scene />
      </Physics>
    </Canvas>
  </Wrapper>
}

const Wrapper = styled.section`
  height: 100vh;
`

export default RacetrackScene
