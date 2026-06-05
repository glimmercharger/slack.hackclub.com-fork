import base from '@hackclub/theme'
import { merge } from 'lodash'

const theme = base

theme.useColorSchemeMediaQuery = false
theme.initialColorModeName = 'light'

theme.colors = merge(theme.colors, {
  modes: {
    dark: {
      text: '#f0f0f0',
      background: '#1a1b1e',
      primary: '#ec3750',
      secondary: '#ff8c37',
      muted: '#9ca3af',
      steel: '#d1d5db',
      slate: '#e5e7eb',
      smoke: '#2d2f36',
      snow: '#1a1b1e',
      sunken: '#111214',
      border: '#2d2f36',
      white: '#f0f0f0'
    }
  }
})

theme.buttons.primary = merge(theme.buttons.primary, {
  textTransform: 'uppercase'
})

theme.layout.copy.maxWidth = [null, null, 'copyPlus']

theme.text.title.fontSize = [5, 6]

theme.shadows = merge(theme.shadows, {
  card: '0 4px 12px rgba(0, 0, 0, 0.08)',
  elevated: '0 8px 24px rgba(0, 0, 0, 0.12)'
})

export default theme
