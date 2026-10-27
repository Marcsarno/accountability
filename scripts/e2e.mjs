// Drives the fresh-user core path through the real UI (Chromium, iPhone-sized). Exits non-zero on failure.
import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
const { chromium } = createRequire(import.meta.url)('playwright')

const server = spawn('npx', ['vite', 'preview', '--port', '4176', '--strictPort'], { stdio: 'ignore' })
await new Promise((r) => setTimeout(r, 1500))
const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
const page = await ctx.newPage()
const errors = []
page.on('pageerror', (e) => errors.push(e.message))
let step = ''
const check = async (name, fn) => { step = name; await fn(); console.log('ok  ', name) }
const sheet = () => page.getByRole('dialog')

try {
  await page.goto('http://localhost:4176/')
  await check('fresh user starts empty', async () => {
    await page.getByRole('button', { name: 'Start with an empty day' }).click()
    await page.getByText('Nothing to plan yet').waitFor()
  })
  const add = async (title, criterion, est) => {
    await page.getByRole('button', { name: 'Capture a new action' }).click()
    await sheet().getByLabel('Action', { exact: true }).fill(title)
    await sheet().getByLabel('Done when…').fill(criterion)
    if (est != null) await sheet().getByLabel('Estimate (min)').fill(String(est))
    await sheet().getByRole('button', { name: 'Add' }).click()
    await sheet().waitFor({ state: 'detached' })
  }
  await check('capture three actions for today (A02 numbers)', async () => {
    await add('Writing', '300 words', 30)
    await add('Walk', '20 min outside', 20)
    await add('Project', 'Section drafted', 45)
  })
  await check('overload 35 shown and commit blocked until acknowledged', async () => {
    for (const t of ['Writing', 'Walk', 'Project']) {
      const box = page.locator('label.row', { hasText: t }).locator('input[type=checkbox]')
      if (!(await box.isChecked())) await box.check()
    }
    await page.getByText('Over by 35m').first().waitFor()
    const commit = page.getByRole('button', { name: /Commit 3 actions/ })
    if (!(await commit.isDisabled())) throw new Error('commit should be disabled before acknowledgement')
    await page.getByText(/I’ve seen this/).click()
    await commit.click()
    await page.getByRole('heading', { name: /Commitment/ }).waitFor()
  })
  await check('record a partial result with minutes', async () => {
    await page.locator('.list .row', { hasText: 'Writing' }).click()
    await sheet().getByRole('radio', { name: /Partial/ }).click()
    await sheet().getByLabel('Actual minutes').fill('15')
    await sheet().getByRole('button', { name: 'Save' }).click()
    await sheet().waitFor({ state: 'detached' })
    await page.locator('.list .row', { hasText: 'Writing' }).getByText('did 15m').waitFor()
  })
  await check('correct it to completed; history keeps both', async () => {
    await page.locator('.list .row', { hasText: 'Writing' }).click()
    await sheet().getByRole('radio', { name: /Completed/ }).click()
    await sheet().getByRole('button', { name: 'Save' }).click()
    await sheet().waitFor({ state: 'detached' })
    await page.locator('.list .row', { hasText: 'Writing' }).click()
    await sheet().getByText('(correction)').waitFor()
    await page.keyboard.press('Escape')
  })
  await check('private check-in with no partner', async () => {
    await page.getByRole('button', { name: 'Check in privately' }).click()
    await sheet().getByText(/2 not reported/).waitFor()
    await sheet().getByLabel('What happened? (private)').fill('Project was too big.')
    await sheet().getByRole('button', { name: /Check in for/ }).click()
    await page.getByText('Day marked').waitFor()
    await page.getByText('Privately submitted').waitFor()
  })
  await check('offline: result saves locally, status says so', async () => {
    await page.evaluate(() => { location.hash = '#/settings' })
    await page.getByText(/Connected/).click()
    await page.evaluate(() => { location.hash = '#/today' })
    await page.getByText(/Offline\./).waitFor()
    await page.locator('.list .row', { hasText: 'Walk' }).click()
    await sheet().getByRole('radio', { name: /Completed/ }).click()
    await sheet().getByRole('button', { name: 'Save' }).click()
    await page.getByRole('status').filter({ hasText: 'Saved on this device' }).waitFor()
  })
  await check('state survives reload (IndexedDB)', async () => {
    await page.reload()
    await page.locator('.list .row', { hasText: 'Walk' }).getByRole('img', { name: 'Completed' }).waitFor()
  })
  await check('Review shows explicit denominators', async () => {
    await page.evaluate(() => { location.hash = '#/review' })
    await page.getByText('2 of 3').first().waitFor()
  })
  if (errors.length) throw new Error('page errors: ' + errors.join(' | '))
  console.log('E2E PASSED')
} catch (e) {
  console.error(`FAIL at "${step}": ${e.message.split('\n')[0]}`)
  await page.screenshot({ path: 'e2e-failure.png' })
  process.exitCode = 1
} finally {
  await browser.close()
  server.kill()
}
