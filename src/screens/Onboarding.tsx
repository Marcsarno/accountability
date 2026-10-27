import { useStore } from '../app/store'
import { BrandMark } from '../ui/kit'

export function Onboarding() {
  const { run, loadSample } = useStore()
  return (
    <div className="onboard main" style={{ maxWidth: 520, display: 'grid', alignContent: 'center', minHeight: '100dvh' }}>
      <BrandMark size={72} />
      <h1 className="large-title" style={{ marginTop: 24, fontSize: 'var(--t-title1)', lineHeight: 1.2 }}>A manageable commitment. An honest result. A practical next attempt.</h1>
      <div className="card" style={{ marginTop: 24 }}>
        {[
          ['Commit', 'Pick what fits the time you actually have — with a clear finish line.'],
          ['Report honestly', 'Done, partial, missed or skipped. Unreported stays unreported.'],
          ['Try again, smaller', 'Review the week and choose one experiment. No streaks to lose.'],
        ].map(([t, d], i) => (
          <div key={t} style={{ display: 'flex', gap: 12, marginTop: i ? 14 : 0 }}>
            <span className="num" style={{ width: 28, height: 28, borderRadius: 14, background: 'var(--signal-soft)', color: 'var(--signal-ink)', display: 'grid', placeItems: 'center', fontWeight: 750, flex: 'none' }}>{i + 1}</span>
            <div><b>{t}</b><p style={{ margin: '2px 0 0' }}>{d}</p></div>
          </div>
        ))}
      </div>
      <p className="footnote" style={{ marginTop: 16 }}>Private by default. A partner is optional and sees only what you choose to share.</p>
      <button className="btn primary block" style={{ marginTop: 16 }} onClick={() => run({ type: 'MarkOnboarded' })}>Start with an empty day</button>
      <button className="btn block" style={{ marginTop: 8 }} onClick={loadSample}>Explore a sample day</button>
      <p className="footnote" style={{ textAlign: 'center' }}>Prototype: fictional data, simulated partner, sync and reminders.</p>
    </div>
  )
}
