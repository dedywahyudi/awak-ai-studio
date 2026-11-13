'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { site } from '@/lib/site'
import { services } from '@/content/services'

/**
 * Studio scene: how the studio works, as a small 3D studio room with its team at five desks.
 *
 * A customer message travels across five stations on a metal plate:
 * Kanal (message in) -> AI Chat (answer from business data) -> Otomatisasi (draft prepared)
 * -> Solusi Custom (recorded in the business system) -> Persetujuan (a human approves, then it is sent).
 * Procedural three.js: no models, no images. Colours come from the tokens in app/globals.css.
 *
 * Adapted from "Agentic Factory 3D" (agentic-factory-3d.vercel.app, eugeneshilow/agentic-3d-templates):
 * same geometry and timing, with the stations, in-scene screens, copy and palette changed for this site.
 *
 * Fills its box: give it a height. The embed prop hides the panels for a hero: on a frame wider than
 * 900 px the machine moves to the right 58 % and leaves the left side for the headline, and a small
 * caption follows the highlighted message from station to station.
 * Control it with window.__machine: setMode, setCamera, focusStation, play, pause.
 */

export type StudioMachine3DProps = {
  /** Height of the scene box, e.g. 720 or '100vh'. Default '100vh'. */
  height?: number | string
  className?: string
  /** Clean hero mode: no panels, the machine on the right of a wide frame. */
  embed?: boolean
  /** A station was clicked. */
  onStation?: (id: StationId) => void
  /** The first real frame is drawn. */
  onReady?: () => void
}

export default function StudioMachine3D({
  height = '100vh',
  className,
  embed = false,
  onStation,
  onReady,
}: StudioMachine3DProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const handlers = useRef({ onStation, onReady })
  // The scene reports what it shows; the tabs and view links below are plain React buttons.
  const machine = useRef<MachineApi | null>(null)
  const [view, setView] = useState<MachineState>({
    mode: 'assembled',
    camera: 'overview',
    playing: true,
    phase: 'channel',
  })
  useEffect(() => {
    handlers.current = { onStation, onReady }
  }, [onStation, onReady])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    let dispose: (() => void) | undefined
    let cancelled = false
    // The in-scene screens are painted on canvases: wait for fonts first.
    document.fonts.ready.then(() => {
      if (cancelled) return
      dispose = initMachineScene(root, getComputedStyle(root).fontFamily, {
        embedded: embed,
        onStation: (id) => handlers.current.onStation?.(id),
        onReady: () => handlers.current.onReady?.(),
        onApi: (api) => (machine.current = api),
        onState: (patch) => setView((v) => ({ ...v, ...patch })),
      })
    })
    return () => {
      cancelled = true
      machine.current = null
      dispose?.()
    }
  }, [embed])

  return (
    <div
      ref={rootRef}
      className={['studio-machine-3d', embed && 'embed', className].filter(Boolean).join(' ')}
      style={{ height }}
    >
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div
        id="scene"
        role="img"
        aria-label="Animasi 3D studio kecil dengan lima meja kerja dan karyawannya: Kanal, AI Chat, Otomatisasi, Solusi Custom, dan Persetujuan. Pesan pelanggan masuk, dijawab AI dari data bisnis, disiapkan sebagai draf, tercatat di sistem, lalu disetujui manusia sebelum terkirim."
      />
      <div className="vignette" />
      <header className="topbar debug-ui">
        <div className="identity">
          <div>
            <strong>{site.name}</strong>
            <small>Cara kerja studio</small>
          </div>
        </div>
        <div className="status" id="status">
          <i />
          <span id="status-text">Mesin berjalan</span>
        </div>
      </header>
      <div className="scene-heading debug-ui">
        Cara AI bekerja untuk bisnis Anda <span className="index">5 STASIUN / 1 ALUR</span>
      </div>
      <div className="coordinates debug-ui">DARI PERTANYAAN SAMPAI PERSETUJUAN</div>
      <div id="labels" />
      <div id="tooltip" role="tooltip">
        <strong />
        <p />
      </div>
      <div className="controls">
        <div id="journey" aria-hidden="true">
          <div className="journey-icon" id="journey-step">
            01
          </div>
          <div>
            <strong id="journey-title">Pesan masuk</strong>
            <small id="journey-detail">Kanal · pertanyaan dari pelanggan</small>
          </div>
          <div className="track">
            <i id="journey-progress" />
          </div>
        </div>
        <nav className="phase-bar" aria-label="Tahapan cara kerja">
          {PHASES.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={view.phase === p.id}
              onClick={() => {
                machine.current?.focusStation(p.id)
                handlers.current.onStation?.(p.id)
              }}
            >
              <span>{stepNo(p.step)}</span>
              {p.name}
            </button>
          ))}
        </nav>
        <nav className="mode-bar debug-ui" aria-label="Mode mesin">
          {MODE_LINKS.map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={view.mode === id}
              onClick={() => machine.current?.setMode(id)}
            >
              {label}
            </button>
          ))}
        </nav>
        <nav className="camera-row" aria-label="Tampilan kamera">
          <span className="caption">TAMPILAN</span>
          {CAMERA_LINKS.map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={view.camera === id}
              onClick={() => machine.current?.setCamera(id)}
            >
              {label}
            </button>
          ))}
          <span className="divider" />
          <button
            type="button"
            id="play"
            aria-label={view.playing ? 'Jeda animasi' : 'Lanjutkan animasi'}
            aria-pressed={!view.playing}
            onClick={() => (view.playing ? machine.current?.pause() : machine.current?.play())}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
              {view.playing ? (
                <>
                  <rect x="2" y="1" width="2.5" height="10" rx=".5" />
                  <rect x="7.5" y="1" width="2.5" height="10" rx=".5" />
                </>
              ) : (
                <path d="M3 1l8 5-8 5z" />
              )}
            </svg>
          </button>
        </nav>
      </div>
      <footer className="footer debug-ui">
        <span className="hint">Putar. Perbesar. Jelajahi.</span>
      </footer>
      <div id="loading">
        <i />
        <span>Menyiapkan animasi</span>
      </div>
      <div id="error" role="alert">
        <strong>Animasi 3D tidak dapat dimulai</strong>
        <p>Pastikan WebGL aktif di browser Anda.</p>
        <button onClick={() => location.reload()}>Coba Lagi</button>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// The scene
// ---------------------------------------------------------------------------

export type MachineMode = 'assembled' | 'cutaway' | 'stations' | 'order'
export type MachineCamera = 'overview' | 'side' | 'top' | 'station' | 'flight'
export type StationId = 'chat' | 'automation' | 'custom' | 'channel' | 'approval'

export type MachineApi = {
  setMode: (name: string) => boolean
  focusStation: (id: string) => boolean
  setCamera: (name: string) => boolean
  play: () => boolean
  pause: () => boolean
}

declare global {
  interface Window {
    __machine?: MachineApi
  }
}

export type MachineState = {
  mode: MachineMode
  camera: MachineCamera
  playing: boolean
  /** The station the caption and the active tab point at. */
  phase: StationId
}

const stepNo = (n: number) => String(n).padStart(2, '0')
const serviceTitle = (id: string, fallback: string) =>
  services.find((s) => s.id === id)?.title ?? fallback

/** The five phases in flow order. Service names come from content/services.ts. */
const PHASES: Array<{ id: StationId; step: number; name: string }> = [
  { id: 'channel', step: 1, name: 'Kanal' },
  { id: 'chat', step: 2, name: serviceTitle('ai-chat', 'AI Chat') },
  { id: 'automation', step: 3, name: serviceTitle('otomatisasi', 'Otomatisasi') },
  { id: 'custom', step: 4, name: serviceTitle('custom', 'Solusi Custom') },
  { id: 'approval', step: 5, name: 'Persetujuan' },
]
const phaseName = (id: StationId) => PHASES.find((p) => p.id === id)!.name
const MODE_LINKS: Array<[MachineMode, string]> = [
  ['assembled', 'Utuh'],
  ['cutaway', 'Potongan'],
  ['stations', 'Stasiun'],
  ['order', 'Satu Pesan'],
]
const CAMERA_LINKS: Array<[MachineCamera, string]> = [
  ['overview', 'Ikhtisar'],
  ['side', 'Samping'],
  ['top', 'Atas'],
  ['station', 'Stasiun'],
  ['flight', 'Terbang'],
]

export type MachineSceneOptions = {
  /** Clean hero: panels hidden, wheel and touch scroll the page. */
  embedded: boolean
  onStation?: (id: StationId) => void
  onReady?: () => void
  /** The control API, once the scene is built. */
  onApi?: (api: MachineApi) => void
  /** Mode, camera, playback or active phase changed. */
  onState?: (patch: Partial<MachineState>) => void
}

const MODES: MachineMode[] = ['assembled', 'cutaway', 'stations', 'order']
const CAMERAS: MachineCamera[] = ['overview', 'side', 'top', 'station', 'flight']
function initMachineScene(
  root: HTMLElement,
  fontFamily: string,
  options: MachineSceneOptions
): () => void {
  const cleanups: Array<() => void> = []
  const frameWidth = () => root.clientWidth
  const frameHeight = () => root.clientHeight
  // Every listener goes through here, so dispose() can take it off again.
  const listen = (target: EventTarget, type: string, handler: (event: never) => void) => {
    const fn = handler as unknown as EventListener
    target.addEventListener(type, fn)
    cleanups.push(() => target.removeEventListener(type, fn))
  }
  function $<T extends HTMLElement = HTMLElement>(id: string): T {
    const el = root.querySelector<T>(`#${id}`)
    if (!el) throw new Error(`Scene markup is missing #${id}`)
    return el
  }
  function showError(message?: string) {
    $('loading').classList.add('done')
    $('error').style.display = 'block'
    if (message) $('error').querySelector('p')!.textContent = message
  }
  const dispose = () => {
    for (const fn of cleanups.reverse()) fn()
    cleanups.length = 0
  }
  try {
    const TAU = Math.PI * 2
    const embedded = options.embedded
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
    // Site tokens (app/globals.css), with the same values as fallback.
    const css = getComputedStyle(root)
    const tok = (name: string, fallback: string) => css.getPropertyValue(name).trim() || fallback
    const C = {
      accent: tok('--blue-500', '#0560f3'),
      hi: tok('--blue-400', '#1390fb'),
      sky: tok('--blue-300', '#2ab2fc'),
      ice: tok('--blue-200', '#47cffb'),
      ink: tok('--black-950', '#07080c'),
      panel: tok('--black-850', '#12141c'),
      raised: tok('--black-800', '#191c26'),
      line: tok('--black-700', '#242836'),
      line2: tok('--black-600', '#323748'),
      text: tok('--text-strong', '#ffffff'),
      body: tok('--text-body', '#c8c9d0'),
      muted: tok('--text-muted', '#9496a1'),
      subtle: tok('--text-subtle', '#6e707b'),
      paper: '#f1f3f8',
      paperInk: '#1c2030',
      paperMuted: '#5b6172',
    }
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(33, frameWidth() / frameHeight(), 0.1, 150)
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      })
    } catch (e) {
      showError('WebGL tidak tersedia. Aktifkan akselerasi hardware di browser Anda, lalu muat ulang halaman.')
      throw e
    }
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(devicePixelRatio, frameWidth() < 900 ? 1.5 : 1.75))
    renderer.setSize(frameWidth(), frameHeight())
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.12
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    renderer.localClippingEnabled = true
    $('scene').appendChild(renderer.domElement)
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.065
    controls.enablePan = false
    controls.minDistance = 7
    controls.maxDistance = 55
    controls.minPolarAngle = 0.09
    controls.maxPolarAngle = Math.PI * 0.475
    controls.rotateSpeed = 0.48
    controls.zoomSpeed = 0.7
    // Embedded in a page: the wheel and the finger scroll the page, not the scene.
    if (embedded) {
      controls.enableZoom = false
      if (matchMedia('(pointer:coarse)').matches) controls.enableRotate = false
      renderer.domElement.style.touchAction = 'pan-y'
    }
    const pmrem = new THREE.PMREMGenerator(renderer),
      room = new RoomEnvironment()
    const env = pmrem.fromScene(room, 0.04)
    scene.environment = env.texture
    scene.environmentIntensity = 0.62
    room.dispose()
    pmrem.dispose()
    scene.add(new THREE.HemisphereLight(0xdbe5f4, 0x141a29, 2))
    const key = new THREE.DirectionalLight(0xf3f6ff, 4.2)
    key.position.set(-4, 12, 7)
    key.castShadow = true
    key.shadow.mapSize.set(2048, 2048)
    Object.assign(key.shadow.camera, {
      left: -10,
      right: 10,
      top: 9,
      bottom: -9,
      near: 0.5,
      far: 35,
    })
    key.shadow.normalBias = 0.035
    key.shadow.bias = -0.0002
    key.shadow.radius = 4
    scene.add(key)
    const rim = new THREE.DirectionalLight(0xc4d4ed, 3.1)
    rim.position.set(3, 7, -8)
    scene.add(rim)
    const glowLight = new THREE.PointLight(C.hi, 28, 20, 2)
    glowLight.position.set(-4, 5, 3)
    scene.add(glowLight)
    const front = new THREE.DirectionalLight(0xffffff, 1)
    front.position.set(5, 3, 10)
    scene.add(front)

    const mat = (
      color: THREE.ColorRepresentation,
      metalness = 0.1,
      roughness = 0.4,
      extra: THREE.MeshStandardMaterialParameters = {}
    ) => new THREE.MeshStandardMaterial({ color, metalness, roughness, ...extra })
    const M = {
      body: mat(0x2a3040, 0.75, 0.29),
      base: mat(0x1f2430, 0.85, 0.32),
      edge: mat(0x69748a, 0.85, 0.24),
      chrome: mat(0xc3cad6, 0.92, 0.18),
      dark: mat(0x10131b, 0.45, 0.38),
      rubber: mat(0x080a10, 0.1, 0.6),
      accent: mat(C.accent, 0.52, 0.28),
      ivory: mat(0xdfe3ec, 0.48, 0.26),
      pipe: mat(C.sky, 0.85, 0.3),
      light: mat(C.hi, 0.2, 0.25, { emissive: C.hi, emissiveIntensity: 1.5 }),
      indicator: mat(C.ice, 0.1, 0.3, { emissive: C.ice, emissiveIntensity: 0.7 }),
      floor: mat(0x1b2130, 0.15, 0.62),
      wall: mat(0x171c29, 0, 0.92),
      track: mat(C.hi, 0.2, 0.3, { emissive: C.hi, emissiveIntensity: 0.9 }),
      pants: mat(0x1b2030, 0.05, 0.75),
      skin: [mat(0xe2b08a, 0, 0.7), mat(0xc58c62, 0, 0.7), mat(0x9a6845, 0, 0.7)],
      hair: [mat(0x17120e, 0, 0.85), mat(0x3b2a1d, 0, 0.85)],
      shirt: [
        mat(C.accent, 0, 0.75),
        mat(0xe8ecf4, 0, 0.8),
        mat(C.ice, 0, 0.75),
        mat(C.sky, 0, 0.75),
        mat(0x23407a, 0, 0.75),
      ],
    }
    type Vec3 = [number, number, number]
    type Material = THREE.Material
    const geometries = new Map<string, THREE.BufferGeometry>()
    function boxGeo(w: number, h: number, d: number, r = 0.04) {
      const k = `b${w},${h},${d},${r}`
      if (!geometries.has(k))
        geometries.set(
          k,
          r
            ? new RoundedBoxGeometry(w, h, d, 2, Math.min(r, w / 3, h / 3, d / 3))
            : new THREE.BoxGeometry(w, h, d)
        )
      return geometries.get(k)!
    }
    function box(
      parent: THREE.Object3D,
      w: number,
      h: number,
      d: number,
      x: number,
      y: number,
      z: number,
      m: Material = M.body,
      r = 0.04
    ) {
      const o = new THREE.Mesh(boxGeo(w, h, d, r), m)
      o.position.set(x, y, z)
      o.castShadow = true
      o.receiveShadow = true
      parent.add(o)
      return o
    }
    function cyl(
      parent: THREE.Object3D,
      r: number,
      h: number,
      x: number,
      y: number,
      z: number,
      m: Material = M.chrome,
      r2: number = r,
      segments = 24
    ) {
      const k = `c${r},${r2},${h},${segments}`
      if (!geometries.has(k)) geometries.set(k, new THREE.CylinderGeometry(r, r2, h, segments))
      const o = new THREE.Mesh(geometries.get(k)!, m)
      o.position.set(x, y, z)
      o.castShadow = true
      o.receiveShadow = true
      parent.add(o)
      return o
    }
    function ball(
      parent: THREE.Object3D,
      r: number,
      x: number,
      y: number,
      z: number,
      m: Material = M.chrome
    ) {
      const k = `s${r}`
      if (!geometries.has(k)) geometries.set(k, new THREE.SphereGeometry(r, 20, 14))
      const o = new THREE.Mesh(geometries.get(k)!, m)
      o.position.set(x, y, z)
      parent.add(o)
      return o
    }
    type Draw = (ctx: CanvasRenderingContext2D, w: number, h: number) => void
    function canvasTexture(w: number, h: number, draw: Draw) {
      const c = document.createElement('canvas')
      c.width = w
      c.height = h
      const ctx = c.getContext('2d')!
      draw(ctx, w, h)
      const t = new THREE.CanvasTexture(c)
      t.colorSpace = THREE.SRGBColorSpace
      t.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy())
      return { texture: t, canvas: c, ctx }
    }
    function print(
      ctx: CanvasRenderingContext2D,
      txt: string,
      x: number,
      y: number,
      size = 20,
      color = C.text,
      weight = 500
    ) {
      ctx.fillStyle = color
      ctx.font = `${weight} ${size}px ${fontFamily}`
      ctx.fillText(txt, x, y)
    }
    function rounded(
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      w: number,
      h: number,
      r: number,
      color: string
    ) {
      c.fillStyle = color
      c.beginPath()
      c.roundRect(x, y, w, h, r)
      c.fill()
    }
    function screenMaterial(texture: THREE.Texture) {
      return new THREE.MeshBasicMaterial({ map: texture, toneMapped: false })
    }
    type Painted = THREE.Texture | { texture: THREE.Texture }
    function screen(
      parent: THREE.Object3D,
      w: number,
      h: number,
      x: number,
      y: number,
      z: number,
      tex: Painted
    ) {
      const map = 'texture' in tex ? tex.texture : tex
      const o = new THREE.Mesh(new THREE.PlaneGeometry(w, h), screenMaterial(map))
      o.position.set(x, y, z)
      parent.add(o)
      return o
    }
    const machine = new THREE.Group()
    scene.add(machine)
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(70, 70),
      new THREE.ShadowMaterial({ opacity: 0.23 })
    )
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -0.43
    floor.receiveShadow = true
    scene.add(floor)
    const shadow = canvasTexture(128, 128, (c, w, h) => {
      const g = c.createRadialGradient(64, 64, 12, 64, 64, 64)
      g.addColorStop(0, 'rgba(0,0,0,.8)')
      g.addColorStop(0.55, 'rgba(0,0,0,.45)')
      g.addColorStop(1, 'rgba(0,0,0,0)')
      c.fillStyle = g
      c.fillRect(0, 0, w, h)
    })
    const contact = new THREE.Mesh(
      new THREE.PlaneGeometry(18, 13),
      new THREE.MeshBasicMaterial({
        map: shadow.texture,
        transparent: true,
        depthWrite: false,
        opacity: 0.65,
      })
    )
    contact.rotation.x = -Math.PI / 2
    contact.position.y = -0.415
    scene.add(contact)
    // The studio: a floor slab and two walls. The walls are single-sided, so they disappear
    // when the camera goes behind them and never hide the room.
    box(machine, 12.8, 0.38, 8.25, 0, -0.09, 0, M.base, 0.17)
    box(machine, 12.6, 0.055, 8.08, 0, 0.13, 0, M.edge, 0.11)
    box(machine, 12.49, 0.09, 7.96, 0, 0.19, 0, M.floor, 0.1)
    box(machine, 12.55, 0.027, 8.02, 0, -0.19, 0, M.dark, 0.06)
    box(machine, 11.9, 0.026, 0.032, 0, -0.17, 4.115, M.light, 0.01)
    const WALL_H = 3
    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(12.4, WALL_H), M.wall)
    backWall.position.set(0, 0.235 + WALL_H / 2, -3.95)
    backWall.receiveShadow = true
    backWall.userData.moving = true
    machine.add(backWall)
    const sideWall = new THREE.Mesh(new THREE.PlaneGeometry(7.9, WALL_H), M.wall)
    sideWall.position.set(-6.2, 0.235 + WALL_H / 2, 0)
    sideWall.rotation.y = Math.PI / 2
    sideWall.receiveShadow = true
    sideWall.userData.moving = true
    machine.add(sideWall)
    // On the back wall: the logo and a board with the five steps.
    const logoTex = canvasTexture(1040, 288, () => {})
    const logo = screen(machine, 2.8, 0.775, 3.1, 2.4, -3.93, logoTex)
    logo.material.transparent = true
    let disposed = false
    cleanups.push(() => (disposed = true))
    const drawLogo = (src: string, x: number, y: number, w: number, h: number) => {
      const img = new Image()
      img.onload = () => {
        if (disposed) return
        logoTex.ctx.drawImage(img, x, y, w, h)
        logoTex.texture.needsUpdate = true
      }
      img.src = src
    }
    drawLogo('/images/logo-mark.png', 10, 10, 271, 268)
    drawLogo('/images/logo-wordmark.png', 310, 22, 714, 244)
    const boardTex = canvasTexture(900, 470, (c, w, h) => {
      c.fillStyle = C.paper
      c.fillRect(0, 0, w, h)
      print(c, 'DARI PERTANYAAN SAMPAI PERSETUJUAN', 34, 62, 30, C.paperInk, 700)
      ;['Pesan', 'Jawaban', 'Draf', 'Sistem', 'Setuju'].forEach((label, i) => {
        const x = 34 + i * 170
        rounded(c, x, 110, 150, 300, 10, i === 4 ? C.accent : '#dfe4ef')
        print(c, String(i + 1).padStart(2, '0'), x + 16, 162, 34, i === 4 ? '#ffffff' : C.accent, 700)
        print(c, label, x + 16, 206, 27, i === 4 ? '#ffffff' : C.paperInk, 650)
        for (let j = 0; j < 4; j++) {
          c.fillStyle = i === 4 ? '#9cc4ff' : '#b3b8c6'
          c.fillRect(x + 16, 246 + j * 30, 118 - (j % 2) * 30, 8)
        }
      })
    })
    screen(machine, 3, 1.57, -2.4, 2.05, -3.93, boardTex)
    // On the side wall: two windows onto the night sky.
    const windowTex = canvasTexture(256, 340, (c, w, h) => {
      const g = c.createLinearGradient(0, 0, 0, h)
      g.addColorStop(0, '#061433')
      g.addColorStop(1, C.accent)
      c.fillStyle = g
      c.fillRect(0, 0, w, h)
      c.fillStyle = '#ffffff'
      for (let i = 0; i < 26; i++) c.fillRect((i * 97) % w, (i * 53) % (h * 0.7), 2, 2)
      c.strokeStyle = C.line2
      c.lineWidth = 10
      c.strokeRect(5, 5, w - 10, h - 10)
      c.beginPath()
      c.moveTo(w / 2, 0)
      c.lineTo(w / 2, h)
      c.moveTo(0, h / 2)
      c.lineTo(w, h / 2)
      c.stroke()
    })
    for (const z of [-1.9, 1.9]) {
      const win = screen(machine, 1.5, 2, -6.18, 1.9, z, windowTex)
      win.rotation.y = Math.PI / 2
    }
    // A name plate set into the floor at the front.
    const engraving = canvasTexture(1536, 176, (c, w, h) => {
      c.fillStyle = C.raised
      c.fillRect(0, 0, w, h)
      c.strokeStyle = C.line2
      c.lineWidth = 2
      c.strokeRect(2, 2, w - 4, h - 4)
      const name = site.name.toUpperCase()
      print(c, name, 45, 79, 40, C.text, 650)
      const nameWidth = c.measureText(name).width
      const list = ['ai-chat', 'otomatisasi', 'custom'].map((id) => serviceTitle(id, id)).join('  ·  ')
      print(c, `·  ${list}`, 45 + nameWidth + 28, 79, 34, C.body, 450)
      print(c, 'DATA BISNIS ANDA    /    MANUSIA MEMEGANG KEPUTUSAN', 47, 133, 19, C.muted, 500)
      print(c, site.city.toUpperCase(), 1360, 130, 23, C.sky)
    })
    const plate = screen(machine, 7.35, 0.84, -0.4, 0.25, 3.51, engraving)
    plate.rotation.x = -Math.PI / 2
    // Faint drafting marks stay local to the machine, leaving the headline area empty.
    const drafting = new THREE.Group()
    scene.add(drafting)
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x6f7c94,
      transparent: true,
      opacity: 0.14,
    })
    const draftingPoints = []
    for (const r of [7.5, 8.1])
      for (let i = 0; i < 120; i++)
        for (const j of [i, i + 1]) {
          const a = (j / 120) * TAU
          draftingPoints.push(new THREE.Vector3(Math.cos(a) * r, -0.4, Math.sin(a) * r * 0.72))
        }
    for (let i = 0; i < 52; i++) {
      const a = (i / 52) * TAU,
        r = 8.1
      draftingPoints.push(
        new THREE.Vector3(Math.cos(a) * r, -0.395, Math.sin(a) * r * 0.72),
        new THREE.Vector3(
          Math.cos(a) * (r + (i % 4 === 0 ? 0.16 : 0.07)),
          -0.395,
          Math.sin(a) * (r + (i % 4 === 0 ? 0.16 : 0.07)) * 0.72
        )
      )
    }
    drafting.add(
      new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(draftingPoints), lineMat)
    )

    // The five stations, left to right along the belt. `step` is the station's place in the
    // flow (message, answer, draft, system, approval); `output` is what it hands on.
    type StationDef = {
      id: StationId
      name: string
      step: number
      output: string
      pos: Vec3
      desc: string
    }
    type Station = StationDef & {
      group: THREE.Group
      base: THREE.Vector3
      glowMat: THREE.MeshStandardMaterial
      label: HTMLDivElement
      index: number
      anchor: THREE.Vector3
    }
    const definitions: StationDef[] = [
      {
        id: 'chat',
        name: phaseName('chat'),
        step: 2,
        output: 'jawaban',
        pos: [-4.15, 0.29, -0.65],
        desc: 'Asisten AI menjawab dari data bisnis Anda sendiri, bukan karangan model.',
      },
      {
        id: 'automation',
        name: phaseName('automation'),
        step: 3,
        output: 'draf',
        pos: [-1.65, 0.29, -2.03],
        desc: 'Follow-up lead, penawaran, dan pengingat disiapkan otomatis sebagai draf.',
      },
      {
        id: 'custom',
        name: phaseName('custom'),
        step: 4,
        output: 'sistem',
        pos: [1.5, 0.29, -2.08],
        desc: 'Web app dan dashboard yang dibangun sesuai alur bisnis Anda.',
      },
      {
        id: 'channel',
        name: 'Kanal',
        step: 1,
        output: 'pesan',
        pos: [4.03, 0.29, 0.12],
        desc: 'Pertanyaan pelanggan masuk dari WhatsApp, website, atau aplikasi.',
      },
      {
        id: 'approval',
        name: 'Persetujuan',
        step: 5,
        output: 'terkirim',
        pos: [0.93, 0.29, 1.85],
        desc: 'Anda menyetujui lebih dulu. Baru setelah itu terkirim.',
      },
    ]
    const stations: Station[] = [],
      cutPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 10)
    function shell<T extends THREE.Material>(m: T): T {
      const s = m.clone() as T
      s.clippingPlanes = [cutPlane]
      s.clipShadows = true
      s.side = THREE.DoubleSide
      return s
    }
    const S = {
      body: shell(M.body),
      ivory: shell(M.ivory),
      accent: shell(M.accent),
    }
    // Furniture and people. Station coordinates: the deck is at y = 0.3, desks are 0.96 high.
    const DECK = 0.3,
      DESK = 0.96
    function desk(p: THREE.Object3D, w: number, d: number, x: number, z: number) {
      box(p, w, 0.06, d, x, DESK - 0.03, z, S.ivory, 0.02)
      const leg = DESK - 0.06 - DECK
      for (const sx of [-1, 1])
        for (const sz of [-1, 1])
          box(p, 0.06, leg, 0.06, x + sx * (w / 2 - 0.08), DECK + leg / 2, z + sz * (d / 2 - 0.08), M.chrome, 0.01)
      box(p, w - 0.2, 0.26, 0.03, x, DESK - 0.2, z - d / 2 + 0.06, S.body, 0.01)
    }
    function monitor(p: THREE.Object3D, w: number, h: number, x: number, z: number, tex: Painted) {
      const cy = DESK + 0.16 + h / 2
      box(p, w + 0.1, h + 0.1, 0.06, x, cy, z, M.dark, 0.03)
      cyl(p, 0.035, 0.16, x, DESK + 0.08, z - 0.02, M.chrome)
      box(p, 0.34, 0.02, 0.2, x, DESK + 0.01, z - 0.02, M.dark, 0.008)
      return screen(p, w, h, x, cy, z + 0.032, tex)
    }
    // A simple figure with no face: seated at a desk (facing -z before `turn`) or standing.
    const people: Array<{ head: THREE.Group; hands: THREE.Group }> = []
    function person(p: THREE.Object3D, x: number, z: number, turn: number, look: number, seated = true) {
      const n = people.length
      const shirt = M.shirt[n % M.shirt.length]!,
        skin = M.skin[n % M.skin.length]!,
        hair = M.hair[n % M.hair.length]!
      const g = new THREE.Group()
      g.position.set(x, DECK, z)
      g.rotation.y = turn
      g.userData.moving = true
      p.add(g)
      const up = seated ? 0 : 0.26
      if (seated) {
        cyl(g, 0.17, 0.03, 0, 0.015, 0.05, M.dark)
        cyl(g, 0.03, 0.42, 0, 0.24, 0.05, M.chrome)
        box(g, 0.36, 0.05, 0.36, 0, 0.47, 0.05, M.dark, 0.02)
        box(g, 0.34, 0.4, 0.04, 0, 0.76, 0.24, M.dark, 0.02)
        for (const side of [-1, 1]) {
          box(g, 0.12, 0.11, 0.36, side * 0.09, 0.55, -0.1, M.pants, 0.04)
          box(g, 0.11, 0.44, 0.11, side * 0.09, 0.27, -0.25, M.pants, 0.04)
          box(g, 0.11, 0.06, 0.2, side * 0.09, 0.03, -0.3, M.dark, 0.02)
        }
      } else
        for (const side of [-1, 1]) {
          box(g, 0.12, 0.76, 0.13, side * 0.09, 0.38, 0.04, M.pants, 0.04)
          box(g, 0.11, 0.06, 0.2, side * 0.09, 0.03, 0, M.dark, 0.02)
        }
      box(g, 0.34, 0.44, 0.2, 0, 0.82 + up, 0.04, shirt, 0.08)
      cyl(g, 0.045, 0.08, 0, 1.07 + up, 0.04, skin)
      const head = new THREE.Group()
      head.position.set(0, 1.2 + up, 0.04)
      head.rotation.y = look
      head.userData.moving = true
      head.userData.look = look
      g.add(head)
      ball(head, 0.135, 0, 0, 0, skin)
      ball(head, 0.14, 0, 0.035, 0.035, hair)
      const hands = new THREE.Group()
      hands.userData.moving = true
      g.add(hands)
      for (const side of [-1, 1]) {
        box(g, 0.09, 0.3, 0.09, side * 0.215, 0.86 + up, 0.04, shirt, 0.04)
        box(hands, 0.08, 0.08, 0.3, side * 0.215, 0.72 + up, -0.12, shirt, 0.035)
        ball(hands, 0.05, side * 0.215, 0.72 + up, -0.29, skin)
      }
      people.push({ head, hands })
    }
    definitions.forEach((d, i) => {
      const group = new THREE.Group()
      group.position.fromArray(d.pos)
      machine.add(group)
      const glowMat = M.light.clone()
      glowMat.emissiveIntensity = 0.5
      box(group, 2.05, 0.12, 1.78, 0, 0.03, 0, M.dark, 0.1)
      box(group, 1.97, 0.03, 1.7, 0, 0.12, 0, glowMat, 0.09)
      box(group, 2.03, 0.17, 1.75, 0, 0.215, 0, M.body, 0.1)
      const plaque = canvasTexture(512, 116, (c, w, h) => {
        c.fillStyle = C.panel
        c.fillRect(0, 0, w, h)
        print(c, stepNo(d.step), 24, 76, 42, C.hi, 550)
        print(c, d.name.toUpperCase(), 111, 73, 33, C.body, 550)
      })
      screen(group, 1.54, 0.345, 0, 0.27, 0.891, plaque)
      const label = document.createElement('div')
      label.className = 'station-label'
      label.innerHTML = `<div class="stem"></div><div class="label-card"><div class="label-title"><span>${stepNo(d.step)}</span>${d.name}</div><div class="label-meta">Langkah ${d.step} · ${d.output}</div></div>`
      $('labels').appendChild(label)
      cleanups.push(() => label.remove())

      stations.push({
        ...d,
        group,
        base: new THREE.Vector3(...d.pos),
        glowMat,
        label,
        index: i,
        anchor: new THREE.Vector3(0, 2.5, 0),
      })
    })

    // --- AI Chat: a desk with the conversation on a tall display, next to the business data. ---
    const chat = stations[0]!.group
    const chatTexture = canvasTexture(384, 640, () => {})
    const chatLines: Array<[string, boolean]> = [
      ['Stok masih ada?', false],
      ['Masih, sesuai data stok.', true],
      ['Bisa pesan sekarang?', false],
      ['Bisa. Saya teruskan ke tim.', true],
    ]
    function drawChat(t: number) {
      const c = chatTexture.ctx,
        w = 384,
        h = 640
      c.fillStyle = C.ink
      c.fillRect(0, 0, w, h)
      c.fillStyle = C.panel
      c.fillRect(0, 0, w, 78)
      c.fillStyle = C.accent
      c.beginPath()
      c.arc(46, 39, 20, 0, TAU)
      c.fill()
      print(c, 'AI', 34, 47, 19, '#ffffff', 700)
      print(c, serviceTitle('ai-chat', 'AI Chat'), 80, 36, 22, C.text, 650)
      print(c, 'Dari data bisnis Anda', 80, 61, 15, C.muted, 500)
      const shown = 1 + (Math.floor(t * 0.6) % chatLines.length)
      chatLines.forEach(([txt, fromAi], i) => {
        if (i >= shown) return
        c.font = `550 21px ${fontFamily}`
        const bw = Math.min(340, c.measureText(txt).width + 36),
          y = 112 + i * 112,
          x = fromAi ? w - 22 - bw : 22
        rounded(c, x, y, bw, 66, 16, fromAi ? C.accent : C.raised)
        print(c, txt, x + 18, y + 41, 21, fromAi ? '#ffffff' : C.body, 550)
      })
      rounded(c, 22, 572, 340, 44, 12, C.panel)
      c.fillStyle = C.ice
      c.fillRect(38, 592, Math.max(10, ((t * 0.13) % 1) * 308), 4)
      chatTexture.texture.needsUpdate = true
    }
    drawChat(0)
    desk(chat, 1.8, 0.55, 0, -0.42)
    box(chat, 0.62, 1.08, 0.055, -0.5, DESK + 0.66, -0.5, M.dark, 0.035)
    screen(chat, 0.56, 0.98, -0.5, DESK + 0.66, -0.469, chatTexture)
    cyl(chat, 0.035, 0.12, -0.5, DESK + 0.06, -0.52, M.chrome)
    // A stack of folders: the business data the answers come from.
    for (let i = 0; i < 4; i++)
      box(chat, 0.34, 0.05, 0.26, 0.08, DESK + 0.03 + i * 0.055, -0.45, i % 2 ? M.accent : M.ivory, 0.012)
    person(chat, 0.62, 0.2, 0, 0.5)

    // --- Otomatisasi: a console with the workflow queue. ---
    const automation = stations[1]!.group
    const queue = canvasTexture(640, 340, () => {})
    const flows = ['Follow-up Lead', 'Penawaran Otomatis', 'Pengingat dan Ulasan']
    function drawQueue(t: number) {
      const c = queue.ctx
      c.fillStyle = C.ink
      c.fillRect(0, 0, 640, 340)
      print(c, 'ALUR KERJA', 25, 45, 21, C.body, 550)
      print(c, 'DRAF', 560, 45, 20, C.hi, 500)
      for (let i = 0; i < 3; i++) {
        const y = 74 + i * 76
        rounded(c, 21, y, 598, 61, 6, C.raised)
        c.fillStyle = i === 0 ? C.hi : C.line2
        c.fillRect(34, y + 10, 27, 41)
        print(c, flows[i]!, 77, y + 29, 19, C.text)
        print(c, i === 0 ? 'BERJALAN' : 'MENUNGGU', 77, y + 49, 11, i === 0 ? C.sky : C.muted)
        c.fillStyle = C.line
        c.fillRect(377, y + 26, 214, 7)
        c.fillStyle = i === 0 ? C.hi : C.subtle
        c.fillRect(377, y + 26, i === 0 ? ((t * 0.15) % 1) * 214 : 41 + i * 27, 7)
      }
    }
    drawQueue(0)
    desk(automation, 1.8, 0.55, 0, -0.42)
    monitor(automation, 1.15, 0.61, -0.3, -0.52, queue)
    box(automation, 0.42, 0.02, 0.14, -0.3, DESK + 0.01, -0.27, M.dark, 0.008)
    cyl(automation, 0.05, 0.05, 0.5, DESK + 0.025, -0.5, M.indicator)
    person(automation, 0.62, 0.2, 0, 0.45)

    // --- Solusi Custom: a large display with the business's own system. ---
    const custom = stations[2]!.group
    box(custom, 1.35, 0.18, 0.88, 0, 0.44, 0, S.ivory, 0.045)
    cyl(custom, 0.095, 1.04, 0, 0.93, -0.31, M.chrome)
    box(custom, 0.56, 0.91, 0.14, 0, 0.99, -0.34, S.body, 0.04)
    box(custom, 2.42, 1.72, 0.2, 0, 1.94, -0.17, S.ivory, 0.08)
    box(custom, 2.28, 1.59, 0.1, 0, 1.94, -0.044, M.dark, 0.045)
    const webTexture = canvasTexture(896, 592, (c, w, h) => {
      c.fillStyle = C.panel
      c.fillRect(0, 0, w, h)
      c.fillStyle = C.raised
      c.fillRect(0, 0, w, 56)
      c.fillStyle = C.line2
      for (let i = 0; i < 3; i++) {
        c.beginPath()
        c.arc(26 + i * 19, 27, 4, 0, TAU)
        c.fill()
      }
      print(c, 'SISTEM BISNIS ANDA', 33, 100, 22, C.text, 650)
      print(c, 'Pesanan    Pelanggan    Laporan', 560, 98, 14, C.muted)
      // The left card sits behind the live chat panel.
      rounded(c, 32, 131, 287, 401, 10, C.accent)
      print(c, 'Sesuai alur Anda.', 359, 197, 41, C.text, 600)
      print(c, 'Bukan template.', 359, 252, 41, C.hi, 600)
      print(c, 'Web app, aplikasi mobile,', 362, 300, 19, C.muted)
      print(c, 'dan integrasi perangkat.', 362, 329, 19, C.muted)
      for (let i = 0; i < 3; i++) {
        c.fillStyle = C.line
        c.fillRect(362, 363 + i * 16, 400 - i * 43, 5)
      }
      // A small bar chart: the reports the system produces.
      for (let i = 0; i < 9; i++) {
        const bh = 22 + ((i * 37) % 55)
        c.fillStyle = i === 8 ? C.ice : C.accent
        c.fillRect(362 + i * 34, 520 - bh, 22, bh)
      }
      c.fillStyle = C.line2
      c.fillRect(362, 521, 300, 2)
      print(c, 'DIBANGUN KHUSUS UNTUK BISNIS ANDA', 33, 571, 12, C.subtle)
    })
    screen(custom, 2.16, 1.43, 0, 1.95, 0.011, webTexture)
    ball(custom, 0.024, 0, 2.747, -0.05, M.dark)
    box(custom, 0.21, 0.019, 0.008, 0, 1.149, 0.013, M.light, 0.003)
    screen(custom, 0.685, 0.96, -0.655, 1.86, 0.018, chatTexture)
    const report = new THREE.Group()
    report.userData.moving = true
    custom.add(report)
    box(report, 0.59, 0.77, 0.045, -0.85, 0.81, 0.55, M.ivory, 0.025)
    const recordTex = canvasTexture(220, 290, (c, w, h) => {
      c.fillStyle = C.paper
      c.fillRect(0, 0, w, h)
      c.fillStyle = C.accent
      c.fillRect(15, 16, 190, 168)
      c.fillStyle = '#ffffff'
      for (let i = 0; i < 4; i++) c.fillRect(48 + i * 34, 150 - (34 + i * 22), 22, 34 + i * 22)
      print(c, 'TERCATAT', 17, 225, 23, C.paperInk, 600)
      c.fillStyle = '#b3b8c6'
      c.fillRect(17, 244, 153, 6)
      c.fillRect(17, 258, 104, 5)
    })
    screen(report, 0.55, 0.72, -0.85, 0.81, 0.575, recordTex)
    person(custom, 0.82, 0.5, 0.5, 0.2, false)

    // --- Kanal: where customer messages arrive. ---
    const channel = stations[3]!.group
    const inboxTex = canvasTexture(480, 460, (c, w, h) => {
      c.fillStyle = C.ink
      c.fillRect(0, 0, w, h)
      print(c, 'PESAN MASUK', 30, 51, 27, C.text, 550)
      print(c, 'Dari semua kanal Anda', 30, 81, 16, C.muted)
      ;['WhatsApp', 'Website', 'Email'].forEach((n, i) => {
        const y = 110 + i * 100
        rounded(c, 22, y, 436, 83, 8, C.raised)
        c.fillStyle = [C.accent, C.sky, C.line2][i]!
        c.beginPath()
        c.arc(58, y + 40, 19, 0, TAU)
        c.fill()
        print(c, n.charAt(0), 49, y + 47, 20, '#ffffff', 600)
        print(c, n, 93, y + 33, 23, C.text, 550)
        print(c, ['Pertanyaan baru', 'Dijawab AI', 'Diteruskan ke tim'][i]!, 93, y + 58, 15, C.muted)
        print(c, '↗', 410, y + 49, 25, C.hi)
      })
    })
    desk(channel, 1.8, 0.55, 0, -0.42)
    monitor(channel, 0.98, 0.94, -0.35, -0.52, inboxTex)
    // A tray where new messages land.
    box(channel, 0.74, 0.04, 0.34, -0.1, 0.9, 0.55, M.chrome, 0.02)
    cyl(channel, 0.04, 0.58, -0.1, 0.59, 0.55, M.chrome)
    cyl(channel, 0.2, 0.03, -0.1, 0.315, 0.55, M.dark)
    person(channel, 0.62, 0.2, 0, 0.45)
    const incoming = new THREE.Group()
    incoming.userData.moving = true
    channel.add(incoming)
    box(incoming, 0.86, 0.42, 0.043, 0, 0, 0, M.light, 0.035)
    const incomingTex = canvasTexture(432, 204, (c, w, h) => {
      c.fillStyle = C.accent
      c.fillRect(0, 0, w, h)
      c.fillStyle = '#ffffff'
      c.beginPath()
      c.arc(58, 98, 32, 0, TAU)
      c.fill()
      print(c, '?', 48, 112, 38, C.accent, 700)
      print(c, 'Pelanggan', 108, 91, 38, '#ffffff', 600)
      print(c, 'Pertanyaan baru  +', 108, 138, 23, '#d6e6ff', 500)
    })
    screen(incoming, 0.82, 0.39, 0, 0, 0.026, incomingTex)

    // --- Persetujuan: a human approves before anything is sent. ---
    const approval = stations[4]!.group
    const approveTex = canvasTexture(512, 176, (c, w, h) => {
      c.fillStyle = C.ink
      c.fillRect(0, 0, w, h)
      print(c, 'PERSETUJUAN ANDA', 22, 44, 23, C.sky, 500)
      print(c, 'Disetujui', 24, 131, 66, C.text, 600)
    })
    desk(approval, 1.8, 0.55, 0, -0.42)
    monitor(approval, 1, 0.345, 0, -0.52, approveTex)
    // A small printer: the approved draft comes out of it.
    box(approval, 0.44, 0.2, 0.36, 0.7, DESK + 0.1, -0.4, S.body, 0.04)
    box(approval, 0.34, 0.02, 0.06, 0.7, DESK + 0.205, -0.4, M.dark, 0.005)
    person(approval, -0.62, 0.2, 0, -0.45)
    const receipt = new THREE.Group()
    receipt.position.set(0.7, DESK + 0.2, -0.4)
    receipt.userData.moving = true
    approval.add(receipt)
    const receiptTex = canvasTexture(280, 540, (c, w, h) => {
      c.fillStyle = C.paper
      c.fillRect(0, 0, w, h)
      print(c, 'DRAF PENAWARAN', 25, 52, 24, C.paperInk, 650)
      print(c, 'UNTUK PELANGGAN', 26, 87, 18, C.paperMuted)
      c.strokeStyle = '#8b90a0'
      c.setLineDash([5, 6])
      c.beginPath()
      c.moveTo(22, 115)
      c.lineTo(258, 115)
      c.stroke()
      print(c, 'Dibuat dari data', 25, 154, 22, C.paperInk)
      print(c, 'Diperiksa manusia', 25, 190, 21, C.paperInk)
      print(c, 'DISETUJUI', 25, 263, 31, C.accent, 700)
      print(c, 'Siap dikirim', 25, 317, 24, C.paperMuted)
      for (let i = 0; i < 44; i++) {
        c.fillStyle = C.paperInk
        c.fillRect(25 + i * 5, 370, 1 + (i % 3), 83)
      }
    })
    const rp = screen(receipt, 0.41, 0.83, 0, 0.415, 0.01, receiptTex)
    rp.material.side = THREE.DoubleSide
    receipt.rotation.x = -0.16
    // An approval token with a check mark drops into the tray.
    const token = new THREE.Group()
    token.userData.moving = true
    approval.add(token)
    const tokenDisc = cyl(token, 0.22, 0.065, 0, 0, 0, M.accent, undefined, 32)
    tokenDisc.rotation.x = Math.PI / 2
    const tokenRing = new THREE.Mesh(new THREE.TorusGeometry(0.174, 0.014, 6, 32), M.light)
    tokenRing.position.z = 0.037
    token.add(tokenRing)
    const checkTex = canvasTexture(128, 128, (c, w, h) => {
      c.clearRect(0, 0, w, h)
      c.strokeStyle = '#ffffff'
      c.lineWidth = 14
      c.lineCap = 'round'
      c.lineJoin = 'round'
      c.beginPath()
      c.moveTo(34, 66)
      c.lineTo(56, 88)
      c.lineTo(96, 42)
      c.stroke()
    })
    const check = screen(token, 0.28, 0.28, 0, 0, 0.04, checkTex)
    check.material.transparent = true
    check.material.side = THREE.DoubleSide
    cyl(approval, 0.33, 0.09, 1.04, 0.39, 0.55, M.dark)
    cyl(approval, 0.26, 0.025, 1.04, 0.445, 0.55, M.pipe)

    // Conveyor: a closed spline, instanced treads, continuous rails and phase-locked cargo.
    const path = new THREE.CatmullRomCurve3(
      (
        [
          [-3.95, 0.84, 0.65],
          [-3.1, 0.84, -0.12],
          [-1.45, 0.84, -0.79],
          [1.32, 0.84, -0.8],
          [3.3, 0.84, 0.19],
          [3.43, 0.84, 1.21],
          [1.35, 0.84, 2.7],
          [-1.4, 0.84, 2.52],
          [-3.54, 0.84, 1.65],
        ] as Vec3[]
      ).map((p) => new THREE.Vector3(...p)),
      true,
      'catmullrom',
      0.25
    )
    // The route the message takes, drawn as a line of light on the floor.
    const belt = new THREE.Group()
    machine.add(belt)
    const track = new THREE.Mesh(new THREE.TubeGeometry(path, 220, 0.035, 6, true), M.track)
    track.position.y = 0.255 - 0.84
    belt.add(track)
    const pipes = new THREE.Group()
    machine.add(pipes)
    // What the travelling card shows after each station.
    const messageTex = canvasTexture(256, 352, (c, w, h) => {
      c.fillStyle = C.accent
      c.fillRect(0, 0, w, h)
      print(c, 'PESAN', 21, 48, 24, '#ffffff', 650)
      print(c, 'BARU', 21, 79, 24, '#ffffff', 650)
      c.strokeStyle = '#9cc4ff'
      c.lineWidth = 2
      c.strokeRect(23, 112, 210, 139)
      print(c, 'Stok', 42, 172, 30, '#ffffff', 550)
      print(c, 'masih ada?', 42, 212, 30, '#ffffff', 550)
      print(c, 'DARI PELANGGAN', 23, 320, 17, '#d6e6ff')
    })
    const answerTex = canvasTexture(256, 352, (c, w, h) => {
      c.fillStyle = C.paper
      c.fillRect(0, 0, w, h)
      print(c, 'JAWABAN AI', 24, 47, 22, C.paperInk, 650)
      print(c, 'Dari data bisnis', 24, 85, 15, C.paperMuted)
      for (let i = 0; i < 9; i++) {
        c.fillStyle = i === 4 ? C.accent : '#b3b8c6'
        c.fillRect(24, 111 + i * 21, 190 - (i % 3) * 24, 6)
      }
      print(c, 'TERJAWAB', 24, 327, 17, C.accent, 700)
    })
    const draftTex = canvasTexture(256, 352, (c, w, h) => {
      c.fillStyle = C.panel
      c.fillRect(0, 0, w, h)
      print(c, 'DRAF', 24, 47, 22, C.text, 650)
      print(c, 'Penawaran', 24, 85, 17, C.muted)
      for (let i = 0; i < 4; i++) {
        rounded(c, 24, 108 + i * 44, 208, 32, 6, C.raised)
        c.fillStyle = i === 3 ? C.hi : C.line2
        c.fillRect(36, 121 + i * 44, 120 - i * 14, 6)
      }
      print(c, 'MENUNGGU ANDA', 24, 327, 17, C.ice, 650)
    })
    const packetTextures = [messageTex, answerTex, draftTex, recordTex, receiptTex]
    const packets: Array<{
      group: THREE.Group
      faces: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>[]
      halo: THREE.Mesh
      stage: number
      phase: number
    }> = []
    for (let i = 0; i < 6; i++) {
      const g = new THREE.Group()
      g.userData.moving = true
      machine.add(g)
      box(g, 0.47, 0.71, 0.04, 0, 0, 0, M.ivory, 0.022)
      const faces = packetTextures.map((tex) => {
        const s = screen(g, 0.43, 0.665, 0, 0, 0.024, tex)
        s.material.side = THREE.DoubleSide
        s.visible = false
        return s
      })
      const halo = new THREE.Mesh(
        new THREE.RingGeometry(0.4, 0.414, 40),
        new THREE.MeshBasicMaterial({
          color: C.hi,
          transparent: true,
          opacity: 0.8,
          side: THREE.DoubleSide,
          depthWrite: false,
        })
      )
      halo.rotation.x = -Math.PI / 2
      halo.position.y = -0.37
      g.add(halo)
      halo.visible = false
      packets.push({ group: g, faces, halo, stage: -1, phase: 0 })
    }
    // Find ports by arc length, so the travelling card arrives at the actual station.
    function nearestPort(x: number, z: number) {
      let best = 0,
        dist = Infinity
      for (let i = 0; i < 300; i++) {
        const p = path.getPointAt(i / 300),
          d = (p.x - x) ** 2 + (p.z - z) ** 2
        if (d < dist) {
          dist = d
          best = i / 300
        }
      }
      return best
    }
    const automationU = nearestPort(-1.65, -0.7),
      customU = nearestPort(1.5, -0.7),
      approvalU = nearestPort(0.93, 2.65)
    // Card stage (0..4) -> index of the station that owns that step.
    const stageStation = [3, 0, 1, 2, 4]

    // Merge static geometry per parent/material. Moving assemblies remain separate.
    function compact(group: THREE.Object3D) {
      for (const child of [...group.children]) if ((child as THREE.Group).isGroup) compact(child)
      const buckets = new Map<string, THREE.Mesh<THREE.BufferGeometry, THREE.Material>[]>()
      for (const object of group.children) {
        const child = object as THREE.Mesh<THREE.BufferGeometry, THREE.Material> & {
          isInstancedMesh?: boolean
        }
        if (
          !child.isMesh ||
          child.isInstancedMesh ||
          child.userData.moving ||
          Array.isArray(child.material)
        )
          continue
        const key = child.material.uuid
        if (!buckets.has(key)) buckets.set(key, [])
        buckets.get(key)!.push(child)
      }
      for (const list of buckets.values()) {
        if (list.length < 2) continue
        const geos = list.map((m) => {
          m.updateMatrix()
          const g = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone()
          return g.applyMatrix4(m.matrix)
        })
        const merged = mergeGeometries(geos, false)
        for (const geo of geos) geo.dispose()
        if (!merged) continue
        const mesh = new THREE.Mesh(merged, list[0]!.material)
        mesh.castShadow = list.some((x) => x.castShadow)
        mesh.receiveShadow = list.some((x) => x.receiveShadow)
        for (const m of list) group.remove(m)
        group.add(mesh)
      }
    }
    compact(machine)
    stations.forEach((s) =>
      s.group.traverse((o) => {
        o.userData.station = s.id
      })
    )
    const pickables = stations.map((s) => s.group)

    let mode: MachineMode = 'assembled',
      cameraMode: MachineCamera = 'overview',
      playing = !reduceMotion,
      simTime = 0,
      spread = 0,
      selected: string = 'chat',
      hovered: string | null = null

    let width = frameWidth(),
      height = frameHeight(),
      mobile = width <= 900,
      lastInteraction = performance.now(),
      dragging = false,
      wasDragged = false,
      downX = 0,
      downY = 0
    let cameraAnimating = true,
      flightTime = 0,
      lastDraw = -1,
      visible = true,
      contextLost = false
    const desiredPosition = new THREE.Vector3(),
      desiredTarget = new THREE.Vector3(0, 1, 0)
    const viewDirection = new THREE.Vector3(10.5, 10.8, 17).normalize()
    let baseDistance = 25,
      sized = false,
      readySent = false
    // Wait for a real size before placing the camera: a zero-size box would put NaN into the
    // uniforms and leave the scene black. The first real size places the camera at once.
    function layoutCamera() {
      if (!frameWidth() || !frameHeight()) return
      const first = !sized
      sized = true
      width = frameWidth()
      height = frameHeight()
      mobile = width <= 900
      renderer.setSize(width, height)
      camera.aspect = width / height
      // Embedded in a wide hero, a shifted frustum centers the machine in the right 58%
      // (the headline goes on the left), without moving the orbit target.
      camera.setViewOffset(
        width,
        height,
        mobile || !embedded ? 0 : -width * 0.21,
        height * (embedded ? 0.07 : 0.025),
        width,
        height
      )
      const aspect = width / height
      const availableWidth = mobile ? 0.91 : Math.min(0.55, aspect > 2 ? 0.54 : 0.57)
      const horizontalFit =
        17.3 / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * aspect * availableWidth)
      const verticalFit =
        11.5 / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * (embedded ? 0.85 : 0.62))
      baseDistance =
        (Math.max(horizontalFit, verticalFit) * (mobile ? 0.97 : 1)) /
        (embedded ? (mobile ? 1.12 : 1.28) : 1)
      controls.maxDistance = Math.max(55, baseDistance * 1.6)
      camera.updateProjectionMatrix()
      setCameraGoal()
      cameraAnimating = true
      if (first) {
        camera.position.copy(desiredPosition)
        controls.target.copy(desiredTarget)
        controls.update()
        cameraAnimating = false
      }
    }
    function setCameraGoal() {
      const expand = mode === 'stations' ? 1.2 : 1
      if (cameraMode === 'station') {
        const s = stations.find((s) => s.id === selected)!
        desiredTarget.copy(s.group.position).add(new THREE.Vector3(0, 1.25, 0))
        // In the hero the focused station stays on the machine's side of the frame.
        desiredPosition
          .copy(desiredTarget)
          .addScaledVector(viewDirection, embedded ? (mobile ? 13 : 20) : mobile ? 9 : 12)
      } else {
        desiredTarget.set(0, 1, 0)
        const distance = baseDistance * expand
        if (cameraMode === 'side')
          desiredPosition.set(13, 5, 20).normalize().multiplyScalar(distance).add(desiredTarget)
        else if (cameraMode === 'top') desiredPosition.set(0.01, distance, 0.8).add(desiredTarget)
        else desiredPosition.copy(viewDirection).multiplyScalar(distance).add(desiredTarget)
      }
    }
    function syncButtons() {
      options.onState?.({ mode, camera: cameraMode })
      $('journey').classList.toggle('visible', embedded || mode === 'order')
    }
    function setMode(name: string) {
      if (!MODES.includes(name as MachineMode)) return false
      mode = name as MachineMode
      lastInteraction = performance.now()
      if (mode === 'order') {
        simTime = 0
        lastDraw = -1
        play()
        cameraMode = 'overview'
      } else if (cameraMode === 'station') cameraMode = 'overview'
      setCameraGoal()
      cameraAnimating = true
      syncButtons()
      return true
    }
    function focusStation(id: string) {
      const s = stations.find((s) => s.id === id)
      if (!s) return false
      selected = id
      if (mode === 'order') mode = 'assembled'
      cameraMode = 'station'
      lastInteraction = performance.now()
      setCameraGoal()
      cameraAnimating = true
      syncButtons()
      return true
    }
    function setCamera(name: string) {
      if (!CAMERAS.includes(name as MachineCamera)) return false
      cameraMode = name as MachineCamera
      if (mode === 'order') mode = 'assembled'
      lastInteraction = performance.now()
      flightTime = 0
      setCameraGoal()
      cameraAnimating = true
      syncButtons()
      return true
    }
    function syncPlayback() {
      options.onState?.({ playing })
      $('status').classList.toggle('paused', !playing)
      $('status-text').textContent = playing ? 'Mesin berjalan' : 'Mesin dijeda'
    }
    function play() {
      playing = true
      syncPlayback()
      return true
    }
    function pause() {
      playing = false
      syncPlayback()
      return true
    }
    const api: MachineApi = { setMode, focusStation, setCamera, play, pause }
    window.__machine = api
    cleanups.push(() => {
      if (window.__machine === api) delete window.__machine
    })
    options.onApi?.(api)
    syncPlayback()
    syncButtons()
    layoutCamera()
    listen(window, 'resize', layoutCamera)
    const resizeObserver = new ResizeObserver(() => layoutCamera())
    resizeObserver.observe(root)
    cleanups.push(() => resizeObserver.disconnect())
    controls.addEventListener('start', () => {
      dragging = true
      cameraAnimating = false
      lastInteraction = performance.now()
    })
    controls.addEventListener('end', () => {
      dragging = false
      lastInteraction = performance.now()
    })
    controls.addEventListener('change', () => {
      if (dragging) lastInteraction = performance.now()
    })
    const raycaster = new THREE.Raycaster(),
      pointer = new THREE.Vector2(),
      tooltip = $('tooltip')
    const local = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect()
      return { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    function hitStation(x: number, y: number) {
      pointer.set((x / width) * 2 - 1, (-y / height) * 2 + 1)
      raycaster.setFromCamera(pointer, camera)
      const hits = raycaster.intersectObjects(pickables, true)
      return hits.length ? stations.find((s) => s.id === hits[0]!.object.userData.station) : null
    }
    listen(renderer.domElement, 'pointermove', (e: PointerEvent) => {
      const { x, y } = local(e)
      if (Math.hypot(x - downX, y - downY) > 5) wasDragged = true
      if (dragging) return
      const s = hitStation(x, y)
      hovered = s ? s.id : null
      renderer.domElement.style.cursor = s ? 'pointer' : 'grab'
      tooltip.classList.toggle('visible', !!s)
      if (s) {
        tooltip.querySelector('strong')!.innerHTML = `<span>${stepNo(s.step)}</span>${s.name}`
        tooltip.querySelector('p')!.textContent = s.desc
        tooltip.style.left = Math.min(width - 255, Math.max(10, x + 16)) + 'px'
        tooltip.style.top = Math.max(10, Math.min(height - 95, y - 65)) + 'px'
      }
    })
    listen(renderer.domElement, 'pointerleave', () => {
      hovered = null
      tooltip.classList.remove('visible')
    })
    listen(renderer.domElement, 'pointerdown', (e: PointerEvent) => {
      const { x, y } = local(e)
      downX = x
      downY = y
      wasDragged = false
      tooltip.classList.remove('visible')
    })
    listen(renderer.domElement, 'pointerup', (e: PointerEvent) => {
      if (wasDragged) return
      const { x, y } = local(e)
      const s = hitStation(x, y)
      if (!s) return
      focusStation(s.id)
      options.onStation?.(s.id)
    })
    listen(document, 'visibilitychange', () => {
      visible = !document.hidden
      lastFrame = performance.now()
    })
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0]!.isIntersecting && !document.hidden
        lastFrame = performance.now()
      },
      { threshold: 0.01 }
    )
    observer.observe(renderer.domElement)
    cleanups.push(() => observer.disconnect())
    listen(renderer.domElement, 'webglcontextlost', (e: Event) => {
      e.preventDefault()
      contextLost = true
      showError('Konteks grafis terputus. Animasi akan kembali sendiri saat WebGL tersedia lagi.')
    })
    listen(renderer.domElement, 'webglcontextrestored', () => {
      contextLost = false
      $('error').style.display = 'none'
      lastFrame = performance.now()
    })

    const scratch = new THREE.Vector3(),
      anchor = new THREE.Vector3()
    const journeySteps: Array<[string, string]> = [
      ['Pesan masuk', 'Kanal · pertanyaan dari pelanggan'],
      ['AI menjawab', `${stations[0]!.name} · jawaban dari data bisnis Anda`],
      ['Draf disiapkan', `${stations[1]!.name} · penawaran dan follow-up`],
      ['Tercatat di sistem', `${stations[2]!.name} · dashboard sesuai alur Anda`],
      ['Anda menyetujui', 'Persetujuan · baru setelah itu terkirim'],
    ]
    let prevJourney = '',
      prevPhase = '',
      lastFrame = performance.now(),
      frameCount = 0,
      measureTime = 0,
      pixelRatio = renderer.getPixelRatio()
    let rafId = 0
    function animate(now: number) {
      rafId = requestAnimationFrame(animate)
      const dt = Math.max(0, Math.min((now - lastFrame) / 1000, 0.045))
      lastFrame = now
      if (!visible || contextLost) return
      if (playing) {
        simTime += dt
        flightTime += dt
      }
      const t = simTime,
        beat = (t / 4) % 1,
        tact = (t * TAU) / 4,
        smooth = 1 - Math.exp(-dt * 5)
      spread = THREE.MathUtils.lerp(spread, mode === 'stations' ? 1 : 0, smooth)
      cutPlane.constant = THREE.MathUtils.lerp(
        cutPlane.constant,
        mode === 'cutaway' ? 0.99 : 10,
        smooth
      )
      // In the hero, the station working on the highlighted card lights up.
      const activeStation =
        embedded && cameraMode !== 'station' && packets[0]!.stage >= 0
          ? stageStation[packets[0]!.stage]
          : -1
      stations.forEach((s, i) => {
        s.group.position.copy(s.base)
        s.group.position.x *= 1 + spread * 0.29
        s.group.position.z *= 1 + spread * 0.37
        s.group.position.y += spread * (i % 2 ? 0.32 : 0.55)
        const pulse = Math.pow(Math.max(0, Math.sin(tact - i * 0.9)), 7)
        s.glowMat.emissiveIntensity = THREE.MathUtils.lerp(
          s.glowMat.emissiveIntensity,
          hovered === s.id || (cameraMode === 'station' && selected === s.id)
            ? 3.5
            : i === activeStation
              ? 2.8
              : 0.55 + pulse * 0.65,
          smooth
        )
      })
      belt.scale.set(1 + spread * 0.12, 1, 1 + spread * 0.15)
      pipes.scale.set(1 + spread * 0.25, 1, 1 + spread * 0.3)
      people.forEach(({ head, hands }, i) => {
        hands.position.y = Math.sin(t * 9 + i * 1.7) * 0.012
        head.rotation.y = head.userData.look + Math.sin(t * 0.5 + i) * 0.3
        head.rotation.x = Math.sin(t * 0.8 + i * 2) * 0.06
      })
      report.position.y = Math.sin(tact) * 0.04
      const orderPhase = (t / 24) % 1,
        approveBeat =
          mode === 'order' ? THREE.MathUtils.clamp((orderPhase - 0.88) / 0.12, 0, 1) : beat
      receipt.visible = token.visible = mode !== 'order' || orderPhase > 0.88
      receipt.scale.y = 0.2 + Math.min(1, approveBeat * 1.5) * 0.8
      token.position.set(1.04, 2.7 - Math.min(1, approveBeat * 1.7) ** 2 * 2.17, 0.55)
      token.rotation.y = t * 3.5
      token.scale.setScalar(approveBeat > 0.9 ? 1 - (approveBeat - 0.9) * 8 : 1)
      const incomingBeat = mode === 'order' ? Math.min(1, orderPhase / 0.15) : beat
      incoming.visible = mode !== 'order' || orderPhase < 0.15
      incoming.position.set(
        Math.sin(incomingBeat * Math.PI) * 0.24,
        2.9 - incomingBeat * 1.9,
        1.1 - incomingBeat * 0.55
      )
      incoming.rotation.z = Math.sin(incomingBeat * Math.PI) * -0.14
      incoming.scale.setScalar(Math.min(1, incomingBeat * 8 + 0.15, (1 - incomingBeat) * 7 + 0.1))
      if (t - lastDraw > 1 / 18 || lastDraw < 0) {
        drawChat(t)
        drawQueue(t)
        queue.texture.needsUpdate = true
        lastDraw = t
      }
      packets.forEach((packet, i) => {
        const phase = (t / 24 + i / 6) % 1
        packet.phase = phase
        let stage
        if (phase < 0.15) {
          stage = 0
          const f = phase / 0.15
          packet.group.position.copy(stations[3]!.group.position).add(new THREE.Vector3(0, 1.6, 0.6))
          scratch.copy(stations[0]!.group.position).add(new THREE.Vector3(0, 1.3, 0.65))
          packet.group.position.lerp(scratch, f)
          packet.group.position.y += Math.sin(f * Math.PI) * 2
          packet.group.rotation.set(0, Math.sin(f * Math.PI) * 0.28, Math.sin(f * Math.PI) * -0.1)
        } else {
          const u = ((phase - 0.15) / 0.85) * approvalU
          path.getPointAt(u, packet.group.position)
          packet.group.position.x *= 1 + spread * 0.12
          packet.group.position.z *= 1 + spread * 0.15
          packet.group.position.y += 0.43
          packet.group.rotation.set(0, 0.18, 0)
          stage =
            u < automationU * 0.7 ? 1 : u < customU * 0.96 ? 2 : u < approvalU * 0.83 ? 3 : 4
        }
        if (packet.stage !== stage) {
          packet.faces.forEach((f, j) => (f.visible = j === stage))
          packet.stage = stage
        }
        const lead = i === 0 && (mode === 'order' || embedded)
        packet.group.visible = mode !== 'order' || i === 0
        packet.halo.visible = lead
        packet.group.scale.setScalar(lead ? 1.35 : 1)
        if (phase > 0.94) packet.group.scale.multiplyScalar(Math.max(0.05, (1 - phase) / 0.06))
      })
      // The caption follows the highlighted card from station to station.
      // A focused station (tab or click) takes over both until the camera returns.
      const lead = packets[0]!
      const focused = cameraMode === 'station' ? stations.find((s) => s.id === selected) : undefined
      const current = focused ?? stations[stageStation[lead.stage]!]!
      if (current.id !== prevPhase) {
        options.onState?.({ phase: current.id })
        prevPhase = current.id
      }
      if (mode === 'order' || embedded) {
        const key = `${current.id}:${focused ? 1 : 0}`
        if (key !== prevJourney) {
          $('journey-step').textContent = stepNo(current.step)
          $('journey-title').textContent = journeySteps[current.step - 1]![0]
          $('journey-detail').textContent = focused ? focused.desc : journeySteps[current.step - 1]![1]
          prevJourney = key
        }
        $('journey-progress').style.width = lead.phase * 100 + '%'
      }
      // In the hero a focused station returns to the overview on its own.
      if (embedded && cameraMode === 'station' && !dragging && now - lastInteraction > 7000)
        setCamera('overview')
      if (mode === 'order') {
        if (!dragging && playing) {
          desiredTarget.copy(packets[0]!.group.position)
          desiredPosition.copy(desiredTarget).addScaledVector(viewDirection, mobile ? 10 : 15)
          cameraAnimating = true
        }
      } else if (cameraMode === 'flight' && playing && !dragging) {
        const a = flightTime * 0.12,
          d = baseDistance * (mode === 'stations' ? 1.2 : 1)
        desiredTarget.set(0, 1, 0)
        desiredPosition
          .set(
            Math.sin(a + 0.55) * d * 0.83,
            d * (0.5 + Math.sin(a * 0.7) * 0.09),
            Math.cos(a + 0.55) * d * 0.83
          )
          .add(desiredTarget)
        cameraAnimating = true
      } else if (cameraMode === 'station' && cameraAnimating) setCameraGoal()
      if (cameraAnimating && !dragging) {
        const speed = 1 - Math.exp(-dt * (mode === 'order' ? 2.2 : 3))
        camera.position.lerp(desiredPosition, speed)
        controls.target.lerp(desiredTarget, speed)
        if (
          cameraMode !== 'flight' &&
          mode !== 'order' &&
          camera.position.distanceTo(desiredPosition) < 0.015 &&
          controls.target.distanceTo(desiredTarget) < 0.015
        )
          cameraAnimating = false
      }
      controls.autoRotate =
        playing &&
        !reduceMotion &&
        !dragging &&
        !cameraAnimating &&
        mode !== 'order' &&
        cameraMode === 'overview' &&
        now - lastInteraction > 6500
      controls.autoRotateSpeed = 0.24
      controls.update(dt)
      // Project station callouts after the camera update, clamping them inside the frame.
      stations.forEach((s, i) => {
        const show = mode === 'stations'
        s.label.classList.toggle('visible', show)
        if (!show) return
        anchor.copy(s.group.position).add(s.anchor).project(camera)
        const offsets = mobile
          ? [
              [-30, 25],
              [-27, -50],
              [15, -65],
              [16, -1],
              [-5, 52],
            ]
          : [
              [-48, -14],
              [-8, -64],
              [30, -12],
              [30, 20],
              [-12, 40],
            ]
        let x = (anchor.x * 0.5 + 0.5) * width - 40 + offsets[i]![0]!,
          y = (-anchor.y * 0.5 + 0.5) * height - 52 + offsets[i]![1]!
        x = THREE.MathUtils.clamp(
          x,
          mobile || !embedded ? 9 : width * 0.425,
          width - (mobile ? 123 : 165)
        )
        y = THREE.MathUtils.clamp(y, 130, height - 200)
        s.label.style.transform = `translate(${x}px,${y}px)`
      })
      renderer.render(scene, camera)
      // The first real frame is ready: the host page can fade the scene in.
      if (!readySent && sized) {
        readySent = true
        options.onReady?.()
      }
      // Reduce only raster resolution on sustained slow devices; geometry and timing stay identical.
      if (playing) {
        frameCount++
        measureTime += dt
        if (measureTime > 4) {
          if (frameCount / measureTime < 43 && pixelRatio > 1) {
            pixelRatio = Math.max(1, pixelRatio - 0.25)
            renderer.setPixelRatio(pixelRatio)
          }
          frameCount = 0
          measureTime = 0
        }
      }
    }
    rafId = requestAnimationFrame(animate)
    cleanups.push(() => {
      cancelAnimationFrame(rafId)
      controls.dispose()
      // Free every GPU resource the scene created, then the context itself.
      const textures = new Set<THREE.Texture>()
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh
        if (mesh.geometry) mesh.geometry.dispose()
        const list = mesh.material
          ? Array.isArray(mesh.material)
            ? mesh.material
            : [mesh.material]
          : []
        for (const material of list) {
          for (const value of Object.values(material))
            if (value instanceof THREE.Texture) textures.add(value)
          material.dispose()
        }
      })
      geometries.forEach((g) => g.dispose())
      textures.forEach((t) => t.dispose())
      env.dispose()
      renderer.dispose()
      renderer.forceContextLoss()
      renderer.domElement.remove()
    })
    renderer.compile(scene, camera)
    // Draw one frame now, even while scrolled out of view, so the host can fade the scene in
    // before the visitor reaches it.
    if (sized) {
      renderer.render(scene, camera)
      readySent = true
      options.onReady?.()
    }

    $('loading').classList.add('done')
    $('error').style.display = 'none'
  } catch (error) {
    console.error('Studio machine: failed to start', error)
    showError()
  }
  return dispose
}

// ---------------------------------------------------------------------------
// Styles, scoped to .studio-machine-3d. Colours use the tokens from app/globals.css.
// ---------------------------------------------------------------------------

const STYLES = String.raw`
.studio-machine-3d {
  --sm-accent: var(--blue-500, #0560f3);
  --sm-hi: var(--blue-400, #1390fb);
  --sm-glow: rgba(19, 144, 251, 0.4);
  --sm-line: var(--border-default, #242836);
  position: relative;
  width: 100%;
  overflow: hidden;
  contain: layout;
  background: var(--surface-page, #07080c);
  font-family: var(--font-body), system-ui, sans-serif;
  color: var(--text-strong, #fff);
  font-size: 13px;
  -webkit-font-smoothing: antialiased;
}
.studio-machine-3d, .studio-machine-3d * {
  box-sizing: border-box;
}
.studio-machine-3d button {
  font: inherit;
  color: inherit;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.studio-machine-3d #scene {
  position: absolute;
  inset: 0;
  outline: none;
}
.studio-machine-3d #scene canvas {
  display: block;
  width: 100%;
  height: 100%;
}
.studio-machine-3d .vignette {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(ellipse at 50% 48%, transparent 30%, rgba(0, 0, 0, 0.12) 64%, rgba(0, 0, 0, 0.6) 100%);
}
.studio-machine-3d .topbar {
  position: absolute;
  inset: 28px 32px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
}
.studio-machine-3d .identity strong {
  display: block;
  font-family: var(--font-display), sans-serif;
  font-weight: 700;
  font-size: 14px;
}
.studio-machine-3d .identity small {
  display: block;
  margin-top: 4px;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  color: var(--text-muted, #9496a1);
  text-transform: uppercase;
}
.studio-machine-3d .status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--text-body, #c8c9d0);
}
.studio-machine-3d .status i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--sm-hi);
  box-shadow: 0 0 10px var(--sm-glow);
}
.studio-machine-3d .status.paused i {
  background: var(--text-subtle, #6e707b);
  box-shadow: none;
}
.studio-machine-3d .scene-heading {
  position: absolute;
  top: 100px;
  left: 24%;
  right: 24%;
  pointer-events: none;
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--text-eyebrow, #1390fb);
  text-transform: uppercase;
}
.studio-machine-3d .scene-heading:before {
  content: '';
  width: 22px;
  height: 1px;
  background: var(--sm-hi);
}
.studio-machine-3d .scene-heading .index {
  margin-left: auto;
  color: var(--text-muted, #9496a1);
}
.studio-machine-3d .coordinates {
  position: absolute;
  top: 150px;
  right: 33px;
  color: var(--text-subtle, #6e707b);
  writing-mode: vertical-rl;
  font: 10px var(--font-mono), ui-monospace, monospace;
  letter-spacing: 0.1em;
  pointer-events: none;
}
.studio-machine-3d .controls {
  position: absolute;
  bottom: 64px;
  left: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 12px;
  z-index: 5;
}
.studio-machine-3d .phase-bar {
  max-width: 100%;
  flex-wrap: wrap;
  justify-content: center;
}
.studio-machine-3d .phase-bar button span {
  margin-right: 7px;
  font: 500 11px var(--font-mono), ui-monospace, monospace;
  opacity: 0.75;
}
.studio-machine-3d .phase-bar,
.studio-machine-3d .mode-bar {
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 5px;
  border: 1px solid var(--sm-line);
  border-radius: 14px;
  background: rgba(18, 20, 28, 0.9);
  backdrop-filter: blur(16px);
}
.studio-machine-3d :is(.phase-bar, .mode-bar) button {
  border: 0;
  background: none;
  color: var(--text-body, #c8c9d0);
  white-space: nowrap;
  min-height: 44px;
  padding: 0 16px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 10px;
  transition: background 0.2s, color 0.2s;
}
.studio-machine-3d :is(.phase-bar, .mode-bar) button:hover {
  background: var(--surface-raised, #191c26);
  color: #fff;
}
.studio-machine-3d :is(.phase-bar, .mode-bar) button[aria-pressed='true'] {
  background: var(--sm-accent);
  color: #fff;
}
.studio-machine-3d .camera-row {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.studio-machine-3d .camera-row .caption {
  font: 10px var(--font-mono), ui-monospace, monospace;
  letter-spacing: 0.1em;
  color: var(--text-muted, #9496a1);
  margin-right: 8px;
}
.studio-machine-3d .camera-row button {
  border: 0;
  background: transparent;
  color: var(--text-muted, #9496a1);
  min-height: 44px;
  padding: 0 10px;
  font-size: 12px;
  transition: color 0.2s;
}
.studio-machine-3d .camera-row button:hover {
  color: #fff;
}
.studio-machine-3d .camera-row button {
  position: relative;
}
/* The original's marker: a dot under the active view. */
.studio-machine-3d .camera-row button[data-dot]::after,
.studio-machine-3d .camera-row button[aria-pressed='true']:not(#play)::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 6px;
  width: 4px;
  height: 4px;
  margin-left: -2px;
  border-radius: 50%;
  background: var(--sm-hi);
}
.studio-machine-3d .camera-row button[aria-pressed='true'] {
  color: var(--text-link, #5aa2ff);
}
.studio-machine-3d .camera-row .divider {
  width: 1px;
  height: 14px;
  background: var(--sm-line);
  margin: 0 8px;
}
.studio-machine-3d .camera-row #play {
  width: 44px;
  display: grid;
  place-items: center;
  color: #fff;
}
.studio-machine-3d .footer {
  position: absolute;
  bottom: 22px;
  left: 32px;
  right: 32px;
  display: flex;
  justify-content: flex-end;
  pointer-events: none;
}
.studio-machine-3d .hint {
  color: var(--text-muted, #9496a1);
  font-size: 12px;
}
.studio-machine-3d #labels {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}
.studio-machine-3d .station-label {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  transition: opacity 0.3s;
  will-change: transform;
  pointer-events: none;
  min-width: 138px;
}
.studio-machine-3d .station-label.visible {
  opacity: 1;
}
.studio-machine-3d .station-label .stem {
  height: 26px;
  width: 1px;
  background: linear-gradient(transparent, var(--sm-glow));
  margin: 0 0 0 10px;
}
.studio-machine-3d .station-label .label-card,
.studio-machine-3d #tooltip {
  background: rgba(18, 20, 28, 0.94);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-strong, #323748);
  border-radius: 10px;
  padding: 10px 13px;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.35);
}
.studio-machine-3d .station-label .label-title,
.studio-machine-3d #tooltip strong {
  font-family: var(--font-display), sans-serif;
  font-weight: 700;
  font-size: 14px;
  white-space: nowrap;
}
.studio-machine-3d .station-label .label-title span,
.studio-machine-3d #tooltip strong span {
  color: var(--text-eyebrow, #1390fb);
  font: 500 11px var(--font-mono), ui-monospace, monospace;
  margin-right: 9px;
}
.studio-machine-3d .station-label .label-meta {
  font-size: 12px;
  color: var(--text-muted, #9496a1);
  margin-top: 4px;
  white-space: nowrap;
}
.studio-machine-3d #tooltip {
  position: absolute;
  pointer-events: none;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.15s;
  max-width: 240px;
}
.studio-machine-3d #tooltip.visible {
  opacity: 1;
}
.studio-machine-3d #tooltip p {
  font-size: 13px;
  color: var(--text-body, #c8c9d0);
  margin: 6px 0 0;
  line-height: 1.5;
}
/* The caption sits in the controls column, right above the tabs. */
.studio-machine-3d #journey {
  display: none;
  align-self: stretch;
  align-items: center;
  gap: 13px;
  pointer-events: none;
  padding: 10px 14px;
  border-radius: 14px;
  background: rgba(7, 8, 12, 0.62);
  backdrop-filter: blur(8px);
}
.studio-machine-3d #journey.visible {
  display: flex;
}
@media (max-width: 640px) {
  .studio-machine-3d #journey.visible {
    display: none;
  }
}
.studio-machine-3d .journey-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: var(--accent-soft, rgba(5, 96, 243, 0.16));
  color: var(--text-link, #5aa2ff);
  font: 500 13px var(--font-mono), ui-monospace, monospace;
}
.studio-machine-3d #journey strong {
  display: block;
  font-family: var(--font-display), sans-serif;
  font-size: 15px;
  font-weight: 700;
  white-space: nowrap;
}
.studio-machine-3d #journey small {
  display: block;
  font-size: 13px;
  margin-top: 2px;
  color: var(--text-muted, #9496a1);
}
.studio-machine-3d #journey .track {
  height: 2px;
  background: var(--sm-line);
  flex: 1;
  min-width: 40px;
  margin-left: 8px;
}
.studio-machine-3d #journey .track i {
  display: block;
  height: 100%;
  background: var(--sm-hi);
  width: 0;
}
.studio-machine-3d #loading {
  position: absolute;
  left: 50%;
  top: 48%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text-muted, #9496a1);
  font-size: 13px;
  transition: opacity 0.4s;
  z-index: 20;
}
.studio-machine-3d #loading i {
  height: 18px;
  width: 18px;
  border-radius: 50%;
  border: 1px solid var(--sm-line);
  border-top-color: var(--sm-hi);
  animation: studio-machine-3d-spin 1s linear infinite;
}
@keyframes studio-machine-3d-spin {
  to {
    transform: rotate(360deg);
  }
}
.studio-machine-3d #loading.done {
  opacity: 0;
  pointer-events: none;
}
.studio-machine-3d #error {
  position: absolute;
  left: 27.5%;
  right: 27.5%;
  top: 40%;
  border: 1px solid var(--border-strong, #323748);
  background: var(--surface-card, #12141c);
  padding: 24px;
  border-radius: 16px;
  display: none;
  font-size: 14px;
  line-height: 1.6;
}
.studio-machine-3d #error strong {
  font-family: var(--font-display), sans-serif;
}
.studio-machine-3d #error p {
  color: var(--text-muted, #9496a1);
  margin: 8px 0 0;
}
.studio-machine-3d #error button {
  border: 1px solid var(--border-strong, #323748);
  background: transparent;
  min-height: 44px;
  padding: 0 18px;
  border-radius: 10px;
  margin-top: 14px;
  font-weight: 700;
}

/* Hero mode: transparent over the page, no panels, caption under the machine. */
.studio-machine-3d.embed {
  background: transparent;
}
.studio-machine-3d.embed .debug-ui,
.studio-machine-3d.embed .vignette,
.studio-machine-3d.embed #error {
  display: none !important;
}
.studio-machine-3d.embed .controls {
  left: 42%;
  right: 2%;
  bottom: 14px;
  gap: 6px;
}
.studio-machine-3d.embed .phase-bar button {
  padding: 0 12px;
}
@media (min-width: 901px) {
  .studio-machine-3d.embed #loading {
    left: 71%;
  }
}
@media (max-width: 900px) {
  .studio-machine-3d .topbar {
    inset: 20px 16px auto;
  }
  .studio-machine-3d .scene-heading {
    left: 16px;
    right: 16px;
    top: 84px;
  }
  .studio-machine-3d .coordinates {
    display: none;
  }
  .studio-machine-3d :is(.phase-bar, .mode-bar) button {
    padding: 0 11px;
    font-size: 12px;
  }
  .studio-machine-3d .camera-row .caption {
    display: none;
  }
  .studio-machine-3d #error {
    left: 16px;
    right: 16px;
    top: 35%;
  }
  .studio-machine-3d.embed .controls {
    left: 12px;
    right: 12px;
    bottom: 6px;
  }
  .studio-machine-3d .camera-row {
    flex-wrap: nowrap;
  }
  .studio-machine-3d .camera-row button {
    padding: 0 7px;
  }
  .studio-machine-3d .camera-row .divider {
    margin: 0 2px;
  }
  .studio-machine-3d .station-label {
    min-width: 100px;
  }
  .studio-machine-3d .station-label .label-card {
    padding: 7px 9px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .studio-machine-3d, .studio-machine-3d * {
    transition: none !important;
  }
  .studio-machine-3d #loading i {
    animation: none;
  }
}
`
