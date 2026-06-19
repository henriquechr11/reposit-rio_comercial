"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

const vertexShader = `
  uniform float time;
  uniform float intensity;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;
    pos.y += sin(pos.x * 10.0 + time) * 0.1 * intensity;
    pos.x += cos(pos.y * 8.0 + time * 1.5) * 0.05 * intensity;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = `
  uniform float time;
  uniform float intensity;
  uniform vec3 color1;
  uniform vec3 color2;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float noise = sin(uv.x * 8.0 + time * 0.5) * cos(uv.y * 6.0 + time * 0.3);
    noise += sin(uv.x * 15.0 - time) * cos(uv.y * 12.0 + time * 0.6) * 0.3;
    vec3 color = mix(color1, color2, noise * 0.5 + 0.5);
    color += vec3(0.15, 0.1, 0.05) * intensity;
    float edge = 1.0 - smoothstep(0.0, 0.5, length(uv - 0.5));
    gl_FragColor = vec4(color, edge * 0.9);
  }
`

interface ShaderBackgroundProps {
  color1?: string
  color2?: string
  showRings?: boolean
}

export function ShaderBackground({
  color1 = "#ff6b35",
  color2 = "#f7c59f",
  showRings = true,
}: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 2

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // Shader plane
    const uniforms = {
      time: { value: 0 },
      intensity: { value: 1.0 },
      color1: { value: new THREE.Color(color1) },
      color2: { value: new THREE.Color(color2) },
    }

    const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      side: THREE.DoubleSide,
    })

    const planeGeometry = new THREE.PlaneGeometry(4, 4, 32, 32)
    const plane = new THREE.Mesh(planeGeometry, shaderMaterial)
    plane.position.z = 0
    scene.add(plane)

    // Energy rings
    const rings: THREE.Mesh[] = []
    if (showRings) {
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: color1,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide,
      })

      const radii = [0.8, 1.2, 1.6]
      radii.forEach((radius, i) => {
        const ringGeometry = new THREE.RingGeometry(radius * 0.8, radius, 64)
        const ring = new THREE.Mesh(ringGeometry, ringMaterial.clone())
        ring.position.z = -0.5 - i * 0.5
        scene.add(ring)
        rings.push(ring)
      })
    }

    // Animation
    let animationId: number
    const clock = new THREE.Clock()

    function animate() {
      animationId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      uniforms.time.value = elapsed
      uniforms.intensity.value = 1.0 + Math.sin(elapsed * 2) * 0.3

      // Animate rings
      rings.forEach((ring, i) => {
        const mat = ring.material as THREE.MeshBasicMaterial
        mat.opacity = 0.5 + Math.sin(elapsed * 3 + i) * 0.3
      })

      renderer.render(scene, camera)
    }
    animate()

    // Resize handler
    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
      container?.removeChild(renderer.domElement)
      renderer.dispose()
      planeGeometry.dispose()
      shaderMaterial.dispose()
      rings.forEach(ring => {
        ring.geometry.dispose()
        if (ring.material instanceof THREE.Material) {
          ring.material.dispose()
        }
      })
    }
  }, [color1, color2, showRings])

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  )
}