// Generates icons and iOS splash screens from code. Rasterizes with Playwright/Chromium.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { formatHex, parse } from 'culori'
import { createRequire } from 'node:module'
const { chromium } = createRequire(import.meta.url)('playwright') // preinstalled with its browser; don't add another version

const root = new URL('..', import.meta.url).pathname
const tokens = readFileSync(root + 'src/styles/tokens.css', 'utf8')
const tok = (name, dark = false) => {
  const block = dark ? tokens.slice(tokens.indexOf(':root[data-theme="dark"] {')) : tokens
  return formatHex(parse(block.match(new RegExp(`${name}:\\s*(oklch\\([^)]*\\))`))[1]))
}
const C = { ink: tok('--ink'), signal: tok('--signal'), paper: tok('--bg'), night: tok('--bg', true), signalSoft: '#ffd7a8' }

/** Full-bleed square master (iOS applies its own corner mask). `inset` scales the glyph for maskable. */
const iconSvg = (size, inset = 1) => {
  const s = 1024
  const g = (v) => s / 2 + (v - s / 2) * inset
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${s} ${s}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#26324a"/><stop offset="1" stop-color="${C.ink}"/></linearGradient>
    <linearGradient id="sun" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffc163"/><stop offset="1" stop-color="${C.signal}"/></linearGradient>
  </defs>
  <rect width="${s}" height="${s}" fill="url(#bg)"/>
  <path d="M${g(232)} ${g(552)}a${280 * inset} ${280 * inset} 0 0 1 ${560 * inset} 0z" fill="url(#sun)"/>
  <rect x="${g(176)}" y="${g(600)}" width="${672 * inset}" height="${60 * inset}" rx="${30 * inset}" fill="${C.paper}"/>
  <rect x="${g(352)}" y="${g(724)}" width="${320 * inset}" height="${60 * inset}" rx="${30 * inset}" fill="${C.paper}" opacity=".5"/>
</svg>`
}

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="${C.ink}"/><path d="M14 38a18 18 0 0 1 36 0z" fill="${C.signal}"/><rect x="10" y="41" width="44" height="4" rx="2" fill="${C.paper}"/><rect x="22" y="49" width="20" height="4" rx="2" fill="${C.paper}" opacity=".55"/></svg>`

// Portrait CSS size and DPR for current iPhones (splash media queries need exact matches).
const DEVICES = [[440, 956, 3], [402, 874, 3], [420, 912, 3], [430, 932, 3], [393, 852, 3], [390, 844, 3], [428, 926, 3], [375, 812, 3], [414, 896, 3], [414, 896, 2], [375, 667, 2]]

const browser = await chromium.launch()
const shot = async (svg, size, out) => {
  const page = await browser.newPage({ viewport: { width: size, height: size } })
  await page.setContent(`<body style="margin:0">${svg}</body>`)
  await page.screenshot({ path: root + 'public/' + out, omitBackground: false })
  await page.close()
}
await shot(iconSvg(1024), 1024, 'icon-1024.png')
await shot(iconSvg(180), 180, 'apple-touch-icon.png')
await shot(iconSvg(192), 192, 'icon-192.png')
await shot(iconSvg(512), 512, 'icon-512.png')
await shot(iconSvg(512, 0.78), 512, 'icon-maskable-512.png') // glyph inside the 80% safe circle
writeFileSync(root + 'public/favicon.svg', favicon)
writeFileSync(root + 'public/icon-master.svg', iconSvg(1024))

// Splash: plain screens matching the first frame's background (HIG: no logo or text).
mkdirSync(root + 'public/splash', { recursive: true })
const links = []
for (const [w, h, dpr] of DEVICES) {
  for (const [mode, color] of [['light', C.paper], ['dark', C.night]]) {
    const name = `splash/${w}x${h}@${dpr}-${mode}.png`
    const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: dpr })
    await page.setContent(`<body style="margin:0;background:${color};height:100vh"></body>`)
    await page.screenshot({ path: root + 'public/' + name })
    await page.close()
    links.push(`<link rel="apple-touch-startup-image" media="(device-width: ${w}px) and (device-height: ${h}px) and (-webkit-device-pixel-ratio: ${dpr}) and (orientation: portrait) and (prefers-color-scheme: ${mode})" href="/${name}" />`)
  }
}
await browser.close()

const html = readFileSync(root + 'index.html', 'utf8').replace(/<!--splash-->[\s\S]*?<!--\/splash-->|<!--splash-->/, `<!--splash-->\n    ${links.join('\n    ')}\n    <!--/splash-->`)
writeFileSync(root + 'index.html', html)
console.log('colors', C, '\nicons + favicon +', links.length, 'splash images')
