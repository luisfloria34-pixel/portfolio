import { useEffect, useRef } from 'react'
import { type MotionValue } from 'framer-motion'
import {
  ACESFilmicToneMapping,
  AmbientLight,
  BufferGeometry,
  DoubleSide,
  Float32BufferAttribute,
  Fog,
  Group,
  IcosahedronGeometry,
  LinearFilter,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Points,
  PointsMaterial,
  Scene,
  SpotLight,
  SRGBColorSpace,
  TextureLoader,
  TorusGeometry,
  Timer,
  Vector3,
  WebGLRenderer,
} from 'three'
import { planetTiles } from './portfolioData'

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
    renderer.toneMappingExposure = 1.72
    renderer.domElement.className = 'intro-canvas'
    mount.appendChild(renderer.domElement)

    const scene = new Scene()
    scene.fog = new Fog('#050505', 5, 13)
    const camera = new PerspectiveCamera(44, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.z = 5.3
    scene.add(new AmbientLight('#ffffff', 0.28))

    const spot = new SpotLight('#f7f8ff', 21, 0, 0.42, 1)
    spot.position.set(3, 4.5, 5)
    scene.add(spot)
    const blueLight = new PointLight('#00218c', 18, 10)
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
    const textureLoader = new TextureLoader()
    const textures = planetTiles.map((tile) => {
      const texture = textureLoader.load(tile)
      texture.colorSpace = SRGBColorSpace
      texture.minFilter = LinearFilter
      texture.magFilter = LinearFilter
      return texture
    })
    const faceGeometry = new IcosahedronGeometry(1.24, 2).toNonIndexed()
    const position = faceGeometry.getAttribute('position')
    const uv = [0.5, 0.98, 0.04, 0.04, 0.96, 0.04]

    for (let face = 0; face < position.count; face += 3) {
      const faceIndex = face / 3
      const points = [0, 1, 2].flatMap((offset) => [
        position.getX(face + offset),
        position.getY(face + offset),
        position.getZ(face + offset),
      ])
      const geometry = new BufferGeometry()
      geometry.setAttribute('position', new Float32BufferAttribute(points, 3))
      geometry.setAttribute('uv', new Float32BufferAttribute(uv, 2))
      geometry.computeVertexNormals()
      const material = new MeshStandardMaterial({
        map: textures[(faceIndex * 11) % textures.length],
        color: '#eef3ff',
        roughness: 0.46,
        metalness: 0.08,
        emissive: '#00081f',
        emissiveIntensity: 0.035,
        side: DoubleSide,
      })
      const tileMesh = new Mesh(geometry, material)
      const normal = new Vector3(points[0], points[1], points[2]).normalize()
      tileMesh.position.copy(normal.multiplyScalar(0.012))
      core.add(tileMesh)
    }

    const wire = new Mesh(faceGeometry.clone(), new MeshBasicMaterial({ color: '#6f8fff', wireframe: true, transparent: true, opacity: 0.42 }))
    wire.scale.setScalar(1.014)
    const edgeGlow = new Mesh(faceGeometry.clone(), new MeshBasicMaterial({ color: '#00218c', wireframe: true, transparent: true, opacity: 0.18 }))
    edgeGlow.scale.setScalar(1.028)
    const blueRing = new Mesh(
      new TorusGeometry(1.82, 0.008, 16, 150),
      new MeshBasicMaterial({ color: '#315de0', transparent: true, opacity: 0.62 }),
    )
    blueRing.rotation.set(Math.PI / 2, 0.2, 0)
    const glassRing = new Mesh(
      new TorusGeometry(1.56, 0.015, 16, 150),
      new MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.28 }),
    )
    glassRing.rotation.set(0.32, 0.75, 0)
    core.add(wire, edgeGlow, blueRing, glassRing, new PointLight('#002aff', 22, 6))
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
      textures.forEach((texture) => texture.dispose())
      faceGeometry.dispose()
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
