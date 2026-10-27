// Drives the fresh-user core path through the real UI (Chromium, iPhone-sized). Exits non-zero on failure.
import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
const { chromium } = createRequire(import.meta.url)('playwright')

const server = spawn('npx', ['vite', 'preview', '--port', '4176', '--strictPort'], { stdio: 'ignore' })
await new Promise((r) => setTimeout(r, 1500))
const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
const page = await ctx.newPage()
// Controllable clock: real time flows, and runFor() fast-forwards the app's 30-second tick.
await page.clock.install()
const errors = []
page.on('pageerror', (e) => errors.push(e.message))
let step = ''
const check = async (name, fn) => { step = name; await fn(); console.log('ok  ', name) }
const sheet = () => page.getByRole('dialog')
const mark = (title) => page.getByRole('button', { name: new RegExp(`^${title}: `) })
const markIs = (title, outcome) => page.getByRole('button', { name: new RegExp(`^${title}: ${outcome}\\.`) })
const details = (title) => page.getByRole('button', { name: `${title} — details` })
const save = () => sheet().getByRole('button', { name: 'Save', exact: true })
const toast = (text) => page.getByRole('status').filter({ hasText: text })

try {
  await page.goto('http://localhost:4176/')
  await check('fresh user starts empty', async () => {
    await page.getByRole('button', { name: 'Start with an empty day' }).click()
    await page.getByText('Nothing to plan yet').waitFor()
  })
  await check('an open sheet keeps keyboard focus across app clock ticks', async () => {
    await page.getByRole('button', { name: 'Capture a new action' }).click()
    const title = sheet().getByLabel('Action', { exact: true })
    await title.fill('Writing')
    await page.clock.runFor(65_000)
    if (!(await title.evaluate((el) => el === document.activeElement))) throw new Error('focus left the input after the clock ticked')
  })
  await check('closing with edits asks first; Keep editing keeps them', async () => {
    await page.keyboard.press('Escape')
    await sheet().getByText('Discard your changes?').waitFor()
    await sheet().getByRole('button', { name: 'Keep editing' }).click()
    if ((await sheet().getByLabel('Action', { exact: true }).inputValue()) !== 'Writing') throw new Error('edit lost')
    await sheet().getByRole('button', { name: 'Close' }).click()
    await sheet().getByRole('button', { name: 'Discard' }).click()
    await sheet().waitFor({ state: 'detached' })
  })
  const add = async (title, criterion, est) => {
    await page.getByRole('button', { name: 'Capture a new action' }).click()
    await sheet().getByLabel('Action', { exact: true }).fill(title)
    await sheet().getByLabel('Done when…').fill(criterion)
    if (est != null) await sheet().getByLabel('Estimate (min)').fill(String(est))
    await sheet().getByRole('button', { name: 'Add', exact: true }).click()
    await sheet().waitFor({ state: 'detached' })
  }
  await check('capture three actions for today (A02 numbers)', async () => {
    await add('Writing', '300 words', 30)
    await add('Walk', '20 min outside', 20)
    await add('Project', 'Section drafted', 45)
  })
  await check('overload 35 shown and commit blocked until acknowledged', async () => {
    for (const t of ['Writing', 'Walk', 'Project']) {
      const box = page.locator('label.plan-pick', { hasText: t }).locator('input[type=checkbox]')
      if (!(await box.isChecked())) await box.check()
    }
    await page.getByText('Over by 35m').first().waitFor()
    const commit = page.getByRole('button', { name: /Commit 3 actions/ })
    if (!(await commit.isDisabled())) throw new Error('commit should be disabled before acknowledgement')
    await page.getByText(/I’ve seen this/).click()
    await commit.click()
    await page.getByRole('heading', { name: /Commitment/ }).waitFor()
  })
  await check('record a partial result with minutes in the result sheet', async () => {
    await details('Writing').click()
    await sheet().getByRole('radio', { name: /Partial/ }).click()
    await sheet().getByLabel('Actual minutes').fill('15')
    await save().click()
    await sheet().waitFor({ state: 'detached' })
    await page.locator('.entry', { hasText: 'Writing' }).getByText('did 15m').waitFor()
  })
  await check('quick-correct it to completed; minutes and history kept', async () => {
    await mark('Writing').click()
    await page.getByRole('group', { name: /What happened with Writing/ }).getByRole('button', { name: 'Completed' }).click()
    await markIs('Writing', 'Completed').waitFor()
    await page.locator('.entry', { hasText: 'Writing' }).getByText('did 15m').waitFor()
    await details('Writing').click()
    await sheet().getByText('(correction)').waitFor()
    await page.keyboard.press('Escape')
    await sheet().waitFor({ state: 'detached' })
  })
  await check('private check-in records a result inline, with no partner', async () => {
    await page.getByRole('button', { name: 'Check in privately' }).click()
    await sheet().getByText(/2 not reported/).waitFor()
    await sheet().getByRole('button', { name: /^Project: / }).click()
    await sheet().getByRole('group', { name: /What happened with Project/ }).getByRole('button', { name: 'Skipped' }).click()
    await sheet().getByText(/1 not reported/).waitFor()
    await sheet().getByLabel('What happened? (private)').fill('Project was too big.')
    await sheet().getByLabel('Next step').fill('Outline one section')
    await sheet().getByRole('button', { name: /Check in for/ }).click()
    await page.getByText('Day marked').waitFor()
    await page.getByText('Privately submitted').waitFor()
  })
  await check('offline: a quick result saves locally, status says so', async () => {
    await page.evaluate(() => { location.hash = '#/settings' })
    await page.getByText(/Connected/).click()
    await page.evaluate(() => { location.hash = '#/today' })
    await page.getByText(/Offline\./).waitFor()
    await mark('Walk').click()
    await page.getByRole('group', { name: /What happened with Walk/ }).getByRole('button', { name: 'Completed' }).click()
    await toast('Saved on this device').waitFor()
  })
  await check('state survives reload (IndexedDB)', async () => {
    await page.reload()
    await markIs('Walk', 'Completed').waitFor()
  })
  await check('Review shows explicit denominators', async () => {
    await page.evaluate(() => { location.hash = '#/review' })
    await page.getByText('2 of 3').first().waitFor()
  })
  await check('the next step carries into the next day and is planned once', async () => {
    await page.evaluate(() => { location.hash = '#/today' })
    await page.getByRole('button', { name: /^Plan / }).click()
    await page.getByText('Outline one section').waitFor()
    await page.getByRole('button', { name: 'Plan it' }).click()
    if ((await sheet().getByLabel('Action', { exact: true }).inputValue()) !== 'Outline one section') throw new Error('next step not prefilled')
    await sheet().getByLabel('Done when…').fill('Headings for section 2')
    await sheet().getByRole('button', { name: 'Add', exact: true }).click()
    await sheet().waitFor({ state: 'detached' })
    await page.locator('label.plan-pick', { hasText: 'Outline one section' }).getByText(/Next step from/).waitFor()
    if (await page.getByRole('button', { name: 'Plan it' }).count()) throw new Error('next step still offered after planning it')
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
