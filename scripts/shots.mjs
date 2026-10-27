// Renders every main screen at iPhone standalone sizes (light + dark) and desktop for self-review.
// Usage: npm run build && npm run shots [-- outDir]
import { spawn } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import { createRequire } from 'node:module'
const { chromium } = createRequire(import.meta.url)('playwright')

const out = process.argv[2] ?? 'shots'
mkdirSync(out, { recursive: true })
const server = spawn('npx', ['vite', 'preview', '--port', '4174', '--strictPort'], { stdio: 'ignore' })
await new Promise((r) => setTimeout(r, 1500))
const URL = 'http://localhost:4174/'

// Full-screen standalone viewports (no Safari chrome). Safe areas simulated via CSS vars.
const PHONES = [
  { name: 'iphone17pro', width: 402, height: 874, sat: 62, sab: 34 },
  { name: 'se', width: 320, height: 568, sat: 20, sab: 0 },
]
const SCREENS = ['today', 'inbox', 'review', 'partner', 'settings']

const browser = await chromium.launch()
async function session(vp, scheme, dpr = 2) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: dpr, colorScheme: scheme, isMobile: vp.width < 900, hasTouch: vp.width < 900 })
  const page = await ctx.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()) })
  await page.goto(URL)
  if (vp.sat != null) await page.addStyleTag({ content: `:root{--debug-sat:${vp.sat}px;--debug-sab:${vp.sab}px}` })
  return { ctx, page, errors }
}
const go = async (page, tab) => { await page.evaluate((t) => { location.hash = '#/' + t }, tab); await page.waitForTimeout(350) }
const snap = (page, name, full = false) => page.screenshot({ path: `${out}/${name}.png`, fullPage: full })

const problems = []
for (const scheme of ['light', 'dark']) {
  for (const vp of PHONES) {
    const { ctx, page, errors } = await session(vp, scheme)
    const tag = `${vp.name}-${scheme}`
    if (vp.name === 'iphone17pro') await snap(page, `onboarding-${tag}`)
    await page.getByRole('button', { name: 'Explore a sample day' }).click()
    await page.waitForTimeout(400)
    for (const s of SCREENS) {
      await go(page, s)
      await snap(page, `${s}-${tag}`, vp.name === 'iphone17pro')
      const overflow = await page.evaluate((w) => Math.max(document.documentElement.scrollWidth, innerWidth) - w, vp.width)
      if (overflow > 0) problems.push(`${tag} ${s}: horizontal overflow ${overflow}px`)
    }
    if (vp.name === 'iphone17pro') {
      await go(page, 'today')
      await page.locator('.mark-btn').first().click(); await page.waitForTimeout(250)
      await snap(page, `today-quickpick-${tag}`); await page.locator('.mark-btn').first().click()
      await page.locator('.entry-main').first().click(); await page.waitForTimeout(500)
      await snap(page, `sheet-result-${tag}`); await page.keyboard.press('Escape'); await page.waitForTimeout(200)
      await page.getByRole('button', { name: 'Update check-in' }).click(); await page.waitForTimeout(500)
      await snap(page, `sheet-checkin-${tag}`)
      await page.getByRole('dialog').getByLabel('Next step').fill('Something new')
      await page.keyboard.press('Escape'); await page.waitForTimeout(200)
      await snap(page, `sheet-discard-${tag}`)
      await page.getByRole('dialog').getByRole('button', { name: 'Discard' }).click(); await page.waitForTimeout(200)
      await page.locator('.week .d').last().click(); await page.waitForTimeout(300)
      await snap(page, `plan-carry-${tag}`, true)
      await page.locator('.week .d').nth(5).click(); await page.waitForTimeout(200)
      await page.getByRole('button', { name: /Amend shared check-in|Share results/ }).click(); await page.waitForTimeout(500)
      await snap(page, `sheet-share-${tag}`); await page.keyboard.press('Escape'); await page.waitForTimeout(200)
      await go(page, 'partner')
      await page.getByRole('button', { name: /View as/ }).first().click(); await page.waitForTimeout(400)
      await snap(page, `peerview-${tag}`, true)
    }
    if (errors.length) problems.push(`${tag}: ${errors.join(' | ')}`)
    await ctx.close()
  }
}
// Fresh-user path + desktop
{
  const { ctx, page, errors } = await session({ width: 402, height: 874, sat: 62, sab: 34 }, 'light')
  await page.getByRole('button', { name: 'Start with an empty day' }).click(); await page.waitForTimeout(300)
  await snap(page, 'fresh-today-iphone17pro-light')
  if (errors.length) problems.push(`fresh: ${errors.join(' | ')}`)
  await ctx.close()
}
for (const scheme of ['light', 'dark']) {
  const { ctx, page, errors } = await session({ width: 1366, height: 900 }, scheme, 1)
  await page.getByRole('button', { name: 'Explore a sample day' }).click(); await page.waitForTimeout(300)
  await snap(page, `desktop-today-${scheme}`)
  await go(page, 'review'); await snap(page, `desktop-review-${scheme}`)
  if (errors.length) problems.push(`desktop: ${errors.join(' | ')}`)
  await ctx.close()
}
await browser.close()
server.kill()
console.log(problems.length ? 'PROBLEMS:\n' + problems.join('\n') : 'no console errors, no horizontal overflow')
