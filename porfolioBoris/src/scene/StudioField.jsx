import { useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { DESKTOP_3D_MIN } from "./capabilities"
import { scrollSignal } from "../lib/scroll"

const ACCENT = "#9008b1"

function lerp(a, b, t) {
  return a + (b - a) * t
}

function Dust({ opacity }) {
  const ref = useRef(null)
  const positions = useMemo(() => {
    const n = 56
    const arr = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2
    }
    return arr
  }, [])

  useFrame((_, delta) => {
    const pts = ref.current
    if (!pts) return
    pts.rotation.y += delta * 0.02 + scrollSignal.velocity * 0.004
    pts.rotation.x = lerp(pts.rotation.x, scrollSignal.direction * 0.08, 0.04)
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={ACCENT}
        size={0.035}
        transparent
        opacity={opacity * 0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function Saturn({ opacity }) {
  const root = useRef(null)
  const body = useRef(null)
  const rings = useRef(null)

  useFrame((state, delta) => {
    const g = root.current
    const b = body.current
    const r = rings.current
    if (!g || !b || !r) return
    const t = state.clock.elapsedTime
    const v = scrollSignal.velocity
    const dir = scrollSignal.direction

    g.position.x = 0
    g.position.y = 0

    g.rotation.x = lerp(g.rotation.x, 0.42 + dir * 0.22 + Math.sin(t * 0.15) * 0.035, 0.06)
    g.rotation.y = lerp(g.rotation.y, 0.2 + dir * 0.1, 0.05)
    g.rotation.z = lerp(g.rotation.z, -0.38 + dir * 0.16, 0.06)

    b.rotation.y += delta * 0.05 + v * 0.008
    r.rotation.y -= delta * 0.09 + v * 0.012
    r.rotation.x = lerp(r.rotation.x, dir * 0.14, 0.05)
  })

  return (
    <group ref={root} position={[0, 0, -2.2]} rotation={[0.42, 0.2, -0.38]}>
      <group ref={body}>
        <mesh scale={[1, 0.92, 1]}>
          <sphereGeometry args={[1.12, 48, 32]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={opacity * 0.28} depthWrite={false} />
        </mesh>
        <mesh scale={[1, 0.92, 1]}>
          <sphereGeometry args={[1.13, 24, 16]} />
          <meshBasicMaterial color={ACCENT} wireframe transparent opacity={opacity * 0.55} depthWrite={false} />
        </mesh>
      </group>
      <group ref={rings}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.48, 0.016, 10, 96]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={opacity} depthWrite={false} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.78, 0.014, 10, 96]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={opacity * 0.9} depthWrite={false} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.08, 0.012, 10, 96]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={opacity * 0.75} depthWrite={false} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.38, 0.01, 10, 80]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={opacity * 0.55} depthWrite={false} />
        </mesh>
      </group>
    </group>
  )
}

function StudioShapes({ opacity }) {
  const root = useRef(null)
  const ringA = useRef(null)
  const ringB = useRef(null)
  const drop = useRef(null)
  const cage = useRef(null)

  useFrame((state, delta) => {
    const g = root.current
    if (!g) return
    const t = state.clock.elapsedTime
    const v = scrollSignal.velocity
    const dir = scrollSignal.direction
    const p = scrollSignal.progress

    g.rotation.y += delta * 0.05 + v * 0.003
    g.rotation.x = lerp(g.rotation.x, dir * 0.1 + Math.sin(t * 0.15) * 0.04, 0.05)
    g.position.y = lerp(g.position.y, -p * 1.4, 0.06)

    if (ringA.current) {
      ringA.current.rotation.x += delta * 0.12 + v * 0.01
      ringA.current.rotation.z += delta * 0.04
    }
    if (ringB.current) {
      ringB.current.rotation.y -= delta * 0.09 + v * 0.008
    }
    if (drop.current) {
      drop.current.position.y = 0.2 + Math.sin(t * 0.7) * 0.15
    }
    if (cage.current) {
      cage.current.rotation.y += delta * 0.08
      cage.current.rotation.x = lerp(cage.current.rotation.x, dir * 0.25, 0.05)
    }
  })

  return (
    <group ref={root}>
      <mesh ref={ringA} position={[-4.6, 1.6, -2.2]} rotation={[0.6, 0.2, 0.4]}>
        <torusGeometry args={[1.35, 0.018, 12, 80]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={opacity} depthWrite={false} />
      </mesh>
      <mesh ref={ringB} position={[4.8, -1.4, -3]} rotation={[1.2, 0.4, -0.3]}>
        <torusGeometry args={[0.95, 0.014, 12, 64]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={opacity * 0.85} depthWrite={false} />
      </mesh>
      <mesh ref={drop} position={[3.6, 2.2, -1.4]}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={opacity * 0.9} depthWrite={false} />
      </mesh>
      <mesh ref={cage} position={[-3.2, -2.2, -2.6]}>
        <icosahedronGeometry args={[0.55, 0]} />
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={opacity * 1.1} depthWrite={false} />
      </mesh>
      <Dust opacity={opacity} />
    </group>
  )
}

/**
 * Fond 3D plein écran — formes studio + Saturne primitive au centre.
 */
export default function StudioField({ playing, theme = "light" }) {
  const mobile = typeof window !== "undefined" && window.innerWidth < DESKTOP_3D_MIN
  const opacity = theme === "dark" ? (mobile ? 0.5 : 0.34) : mobile ? 0.34 : 0.2

  return (
    <Canvas
      frameloop={playing ? "always" : "never"}
      dpr={mobile ? [1, 1] : [1, 1.5]}
      gl={{
        antialias: !mobile,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
      camera={{ position: [0, 0, 6.2], fov: 42, near: 0.1, far: 30 }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0)
      }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <Saturn opacity={opacity} />
      <StudioShapes opacity={opacity} />
    </Canvas>
  )
}
