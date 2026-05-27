import { useEffect, useRef } from 'react'
import { type MotionValue } from 'framer-motion'
import {
  ACESFilmicToneMapping,
  AmbientLight,
  BufferGeometry,
  Float32BufferAttribute,
  Fog,
  Group,
  IcosahedronGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PointLight,
  Points,
  PointsMaterial,
  Scene,
  SpotLight,
  SRGBColorSpace,
  TorusGeometry,
  Timer,
  WebGLRenderer,
} from 'three'

function seededValue(seed: number) {
  const value = Math.sin(seed * 91.347) * 47453.5453
  return value - Math.floor(value)
}

export default function IntroScene({ progress }: { progress: MotionValue<number> }) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.outputColorSpace = SRGBColorSpace
    renderer.toneMapping = ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.25
    renderer.domElement.className = 'intro-canvas'
    mount.appendChild(renderer.domElement)

    const scene = new Scene()
    scene.fog = new Fog('#050505', 5, 13)
    const camera = new PerspectiveCamera(44, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.z = 5.3
    scene.add(new AmbientLight('#ffffff', 0.16))

    const spot = new SpotLight('#f7f8ff', 14, 0, 0.38, 1)
    spot.position.set(3, 4, 5)
    scene.add(spot)
    const blueLight = new PointLight('#00218c', 30, 12)
    blueLight.position.set(-4, -1, 2)
    scene.add(blueLight)

    const field = new Float32Array(420 * 3)
    for (let index = 0; index < field.length; index += 3) {
      field[index] = (seededValue(index + 1) - 0.5) * 14
      field[index + 1] = (seededValue(index + 2) - 0.5) * 9
      field[index + 2] = (seededValue(index + 3) - 0.5) * 7
    }
    const particlesGeometry = new BufferGeometry()
    particlesGeometry.setAttribute('position', new Float32BufferAttribute(field, 3))
    const particlesMaterial = new PointsMaterial({
      color: '#4068e8',
      size: 0.018,
      transparent: true,
      depthWrite: false,
      opacity: 0.6,
    })
    scene.add(new Points(particlesGeometry, particlesMaterial))

    const core = new Group()
    const coreGeometry = new IcosahedronGeometry(1.24, 2)
    const solid = new Mesh(
      coreGeometry,
      new MeshPhysicalMaterial({
        color: '#07153e',
        roughness: 0.2,
        metalness: 0.84,
        clearcoat: 1,
        transmission: 0.16,
        emissive: '#001a70',
        emissiveIntensity: 0.85,
      }),
    )
    const wire = new Mesh(coreGeometry, new MeshBasicMaterial({ color: '#315de0', wireframe: true, transparent: true, opacity: 0.32 }))
    wire.scale.setScalar(1.01)
    const blueRing = new Mesh(
      new TorusGeometry(1.82, 0.008, 16, 150),
      new MeshBasicMaterial({ color: '#315de0', transparent: true, opacity: 0.7 }),
    )
    blueRing.rotation.set(Math.PI / 2, 0.2, 0)
    const glassRing = new Mesh(
      new TorusGeometry(1.56, 0.015, 16, 150),
      new MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.28 }),
    )
    glassRing.rotation.set(0.32, 0.75, 0)
    core.add(solid, wire, blueRing, glassRing, new PointLight('#002aff', 35, 7))
    scene.add(core)

    const pointer = { x: 0, y: 0 }
    const updatePointer = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
    }
    const resize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    }
    const timer = new Timer()
    const animate = () => {
      timer.update()
      const delta = timer.getDelta()
      const scroll = progress.get()
      core.rotation.y += delta * (0.18 + scroll * 1.35)
      core.rotation.x = pointer.y * 0.18 + scroll * 0.54
      core.position.x = pointer.x * 0.2 + scroll * 0.55
      core.position.y = pointer.y * 0.12 - scroll * 0.32
      camera.position.z = 5.3 - scroll * 1.25
      renderer.render(scene, camera)
    }

    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', updatePointer, { passive: true })
    renderer.setAnimationLoop(animate)

    return () => {
      renderer.setAnimationLoop(null)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', updatePointer)
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      core.traverse((object) => {
        if (object instanceof Mesh) {
          object.geometry.dispose()
          if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose())
          else object.material.dispose()
        }
      })
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [progress])

  return <div ref={mountRef} className="scene-mount" aria-hidden="true" />
}
