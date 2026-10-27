import { useCallback, useState } from 'react'

export type Theme = 'system' | 'light' | 'dark'
const KEY = 'theme'

/** The theme currently applied. index.html applies the stored choice before first paint. */
function appliedTheme(): Theme {
  const t = document.documentElement.dataset.theme
  return t === 'light' || t === 'dark' ? t : 'system'
}

/** Theme is a per-device display preference, so it lives in localStorage rather than app state. */
export function useTheme(): [Theme, (t: Theme) => void] {
  const [theme, setThemeState] = useState(appliedTheme)
  const setTheme = useCallback((t: Theme) => {
    if (t === 'system') delete document.documentElement.dataset.theme
    else document.documentElement.dataset.theme = t
    try { localStorage.setItem(KEY, t) } catch { /* storage unavailable (private mode): applies for this session only */ }
    setThemeState(t)
  }, [])
  return [theme, setTheme]
}
