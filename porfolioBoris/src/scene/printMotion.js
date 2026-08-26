/** Motion « verso de la carte » — Hero → portraits suivants. */

export const PRINT_ORIGIN = "50% 50%"

export function printLeaveFrom() {
  return {
    rotationY: 0,
    rotationX: 0,
    rotationZ: 0,
    z: 0,
    y: 0,
    scale: 1,
  }
}

export function printLeaveTo(light) {
  if (light) {
    return { y: 40, scale: 0.97, rotationZ: 3 }
  }
  return {
    rotationY: 26,
    rotationX: 8,
    rotationZ: 4,
    z: -56,
    y: 52,
    scale: 0.93,
  }
}

export function printVersoFrom(light) {
  if (light) {
    return { y: 56, autoAlpha: 0, rotationZ: 6, scale: 0.96 }
  }
  return {
    rotationY: -62,
    rotationX: 10,
    rotationZ: 14,
    z: -90,
    y: 80,
    autoAlpha: 0,
    scale: 0.9,
  }
}

export function printVersoTo() {
  return {
    rotationY: 0,
    rotationX: 0,
    rotationZ: 6,
    z: 0,
    y: 0,
    autoAlpha: 1,
    scale: 1,
  }
}

export function printObliqueFrom(light) {
  if (light) {
    return { y: 56, autoAlpha: 0, rotationZ: -4, scale: 0.96 }
  }
  return {
    rotationY: 62,
    rotationX: 10,
    rotationZ: -14,
    z: -90,
    y: 80,
    autoAlpha: 0,
    scale: 0.9,
  }
}

export function printObliqueTo() {
  return {
    rotationY: 0,
    rotationX: 0,
    rotationZ: -4,
    z: 0,
    y: 0,
    autoAlpha: 1,
    scale: 1,
  }
}
