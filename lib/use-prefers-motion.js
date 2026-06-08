import React from 'react'

const QUERY = '(prefers-reduced-motion: no-preference)'
const isRenderingOnServer = typeof window === 'undefined'

const getInitialState = () => {
  return isRenderingOnServer ? false : window.matchMedia(QUERY).matches
}

function usePrefersMotion() {
  const [prefersMotion, setPrefersMotion] = React.useState(getInitialState)
  React.useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY)
    const listener = (event) => {
      setPrefersMotion(event.matches)
    }
    mediaQueryList.addEventListener('change', listener)
    return () => {
      mediaQueryList.removeEventListener('change', listener)
    }
  }, [])
  return prefersMotion
}

export default usePrefersMotion
