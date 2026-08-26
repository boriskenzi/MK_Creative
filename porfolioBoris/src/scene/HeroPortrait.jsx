import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Image, RoundedBox } from "@react-three/drei"
import { scheduleScrollRefresh } from "../lib/gsap"

const CARD = { w: 1.72, h: 2.15, d: 0.05, radius: 0.1 }
const PRINT = [1.7, 2.125]
const ACCENT = "#5e67e6"

function lerp(a, b, t) {
  return a + (b - a) * t
}

function HeroCard({ src, pointer, theme }) {
  const group = useRef(null)
  const print = useRef(null)
  const shade = useRef(null)

  const paper = theme === "dark" ? "#141416" : "#ffffff"
  const idle = useRef({ x: 0, y: 0 })

  useFrame((state) => {
    const g = group.current
    if (!g) return

    const p = pointer.current
    const t = state.clock.elapsedTime
    idle.current.y = Math.sin(t * 0.32) * 0.038
    idle.current.x = Math.sin(t * 0.24) * 0.02

    const targetY = p.active ? p.x * 0.34 : idle.current.y
    const targetX = p.active ? p.y * -0.24 : idle.current.x
    const targetZ = p.active ? 0.1 : Math.sin(t * 0.4) * 0.03

    g.rotation.y = lerp(g.rotation.y, targetY, 0.1)
    g.rotation.x = lerp(g.rotation.x, targetX, 0.1)
    g.position.z = lerp(g.position.z, targetZ, 0.1)

    if (print.current) {
      const px = p.active ? p.x * 0.05 : 0
      const py = p.active ? p.y * 0.04 : 0
      print.current.position.x = lerp(print.current.position.x, px, 0.1)
      print.current.position.y = lerp(print.current.position.y, py, 0.1)
    }

    if (shade.current) {
      shade.current.position.x = lerp(shade.current.position.x, 0.06 - g.rotation.y * 0.18, 0.1)
      shade.current.position.y = lerp(shade.current.position.y, -0.08 + g.rotation.x * 0.12, 0.1)
      shade.current.material.opacity = lerp(
        shade.current.material.opacity,
        0.14 + Math.abs(g.rotation.y) * 0.12,
        0.1,
      )
    }
  })

  return (
    <group>
      <mesh ref={shade} position={[0.08, -0.1, -0.12]} scale={[1.02, 1.02, 1]}>
        <planeGeometry args={[CARD.w, CARD.h]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.16} depthWrite={false} />
      </mesh>

      <group ref={group}>
        <RoundedBox args={[CARD.w, CARD.h, CARD.d]} radius={CARD.radius} smoothness={4} castShadow={false}>
          <meshStandardMaterial color={paper} roughness={0.62} metalness={0.06} />
        </RoundedBox>
        <Image
          ref={print}
          url={src}
          scale={PRINT}
          radius={0.09}
          position={[0, 0, CARD.d / 2 + 0.002]}
          transparent
          toneMapped={false}
        />
      </group>
    </group>
  )
}

function SceneLights({ theme }) {
  const fill = theme === "dark" ? 0.42 : 0.78
  const key = theme === "dark" ? 0.85 : 1.15
  return (
    <>
      <ambientLight intensity={fill} />
      <directionalLight position={[2.4, 3.2, 4]} intensity={key} />
      <directionalLight position={[-2.8, -0.6, 2.2]} intensity={theme === "dark" ? 0.45 : 0.22} color={ACCENT} />
    </>
  )
}

/**
 * Carte portrait Three.js — lazy-loadée.
 * `frameloop` pause hors écran ; dpr plafonné.
 */
export default function HeroPortrait({ src, playing, theme = "light", pointer }) {
  return (
    <Canvas
      className="hero-portrait-canvas"
      frameloop={playing ? "always" : "never"}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
      }}
      camera={{ position: [0, 0, 4.05], fov: 32, near: 0.1, far: 20 }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0)
        scheduleScrollRefresh()
      }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <SceneLights theme={theme} />
      <HeroCard src={src} pointer={pointer} theme={theme} />
    </Canvas>
  )
}
