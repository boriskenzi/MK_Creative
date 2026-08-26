import { useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { scrollSignal } from "../lib/scroll"

const ACCENT = "#5e67e6"

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
 * Fond 3D plein écran — lazy-loadé.
 * Pause d’onglet via `playing`. R3F dispose la scène au démontage.
 */
export default function StudioField({ playing, theme = "light" }) {
  const opacity = theme === "dark" ? 0.34 : 0.2

  return (
    <Canvas
      frameloop={playing ? "always" : "never"}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
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
      <StudioShapes opacity={opacity} />
    </Canvas>
  )
}
