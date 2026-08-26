/**
 * Motion 3D du stack de projets.
 * À tweener sur le ScrollTrigger existant — pas un trigger séparé.
 */

export const STACK_ORIGIN = "50% 82%"

export function stackFront() {
  return {
    rotationX: 2,
    rotationY: -1.2,
    z: 24,
    y: 0,
    scale: 1,
    autoAlpha: 1,
  }
}

/** Cartes encore dans la pile (`depth` = 0 au-dessus). */
export function stackInPile(depth) {
  return {
    rotationX: 5 + depth * 1.8,
    rotationY: 0,
    z: -depth * 64,
    y: depth * 18,
    scale: Math.max(0.86, 0.93 - depth * 0.025),
    autoAlpha: Math.max(0.4, 0.72 - depth * 0.12),
  }
}

/** Carte qui quitte — peel latéral, comme un print qu’on soulève. */
export function stackPeel(index) {
  return {
    rotationX: -34,
    rotationY: index % 2 === 0 ? 16 : -16,
    z: 160,
    y: -48,
    scale: 0.92,
    autoAlpha: 0,
  }
}

export const STACK_TWEEN = {
  duration: 1,
  ease: "framerEase",
  force3D: true,
  transformOrigin: STACK_ORIGIN,
}
