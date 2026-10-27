import { Sheet } from '../ui/kit'

const Step = ({ n, title, children }: { n: number; title: string; children: React.ReactNode }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '88px 1fr', gap: 14, alignItems: 'center', marginBottom: 16 }}>
    <svg viewBox="0 0 88 88" width="88" height="88" aria-hidden="true">
      <rect x="2" y="2" width="84" height="84" rx="20" fill="var(--surface)" stroke="var(--line)" />
      {children}
    </svg>
    <div><div className="eyebrow">Step {n}</div><b>{title}</b></div>
  </div>
)

export function InstallGuide({ onClose }: { onClose: () => void }) {
  return (
    <Sheet title="Add to Home Screen" onClose={onClose}>
      <p style={{ marginTop: 0, color: 'var(--ink-2)' }}>On iPhone, reminders only work from the Home Screen app. It takes four taps in Safari.</p>
      <Step n={1} title="Tap ••• (or Share) in Safari’s toolbar">
        <circle cx="30" cy="44" r="5" fill="var(--ink)" /><circle cx="44" cy="44" r="5" fill="var(--ink)" /><circle cx="58" cy="44" r="5" fill="var(--ink)" />
      </Step>
      <Step n={2} title="Tap Share, then scroll to “Add to Home Screen”">
        <rect x="30" y="36" width="28" height="30" rx="5" fill="none" stroke="var(--ink)" strokeWidth="4" /><path d="M44 20v28M34 30l10-10 10 10" fill="none" stroke="var(--signal)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </Step>
      <Step n={3} title="Keep “Open as Web App” switched on">
        <rect x="18" y="32" width="52" height="26" rx="13" fill="var(--done)" /><circle cx="57" cy="45" r="10" fill="var(--surface)" />
      </Step>
      <Step n={4} title="Tap Add, then open Daymark from your Home Screen">
        <rect x="26" y="26" width="36" height="36" rx="9" fill="var(--ink)" /><path d="M32 47a12 12 0 0 1 24 0z" fill="var(--signal)" /><rect x="30" y="49" width="28" height="3" rx="1.5" fill="var(--bg)" />
      </Step>
      <p className="footnote">The Home Screen app keeps its own storage, separate from Safari. Turning “Open as Web App” off makes a plain bookmark without reminders.</p>
    </Sheet>
  )
}
