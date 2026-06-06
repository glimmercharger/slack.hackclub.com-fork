import base from '@hackclub/theme'
import { merge } from 'lodash'

const theme = base

theme.useColorSchemeMediaQuery = false

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
