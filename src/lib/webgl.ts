// src/lib/webgl.ts

export function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas')

    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}