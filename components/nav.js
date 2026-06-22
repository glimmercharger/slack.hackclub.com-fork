import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/react'
import { Box, Container, Flex, Link } from 'theme-ui'
import theme from '../lib/theme'
import Icon from './icon'
import Flag from './flag'

const desktopAbout = [
  { label: 'Philosophy', href: 'https://hackclub.com/philosophy' },
  { label: 'Philanthropy', href: 'https://hackclub.com/philanthropy' },
  { label: 'Team & Board', href: 'https://hackclub.com/team' },
  { label: 'Jobs', href: 'https://hackclub.com/jobs' },
  { label: 'Branding Guide', href: 'https://hackclub.com/brand' },
  { label: 'Press Inquiries', href: 'https://hackclub.com/press' }
]

const desktopResources = [
  { label: 'HCB Fiscal Sponsorship', href: 'https://hackclub.com/fiscal-sponsorship' },
  { label: 'Hacker Toolbox', href: 'https://toolbox.hackclub.com' },
  { label: 'Code of Conduct', href: 'https://hackclub.com/conduct' },
  { label: 'Privacy & Terms', href: 'https://hackclub.com/privacy-and-terms' },
  { label: 'Safety', href: 'https://hackclub.com/safety' }
]

const desktopLinks = [
  { label: 'About', dropdown: desktopAbout },
  { label: 'Programs', href: 'https://hackclub.com/programs' },
  { label: 'Clubs', href: 'https://hackclub.com/clubs' },
  { label: 'Resources', dropdown: desktopResources },
  { label: 'Donate', href: 'https://hackclub.com/philanthropy' }
]

const mobileLinks = [
  { label: 'Clubs', href: 'https://hackclub.com/clubs' },
  { label: 'Fiscal Sponsorship', href: 'https://hackclub.com/hcb' },
  { label: 'Hackathons', href: 'https://hackclub.com/hackathons' },
  { label: 'Join', href: '/' },
  { label: 'Toolbox', href: 'https://toolbox.hackclub.com/' },
  { label: 'Donors', href: 'https://hackclub.com/philanthropy' }
]

const rgbaBgColor = (props, opacity) =>
  `rgba(
    ${props.bgColor[0]},
    ${props.bgColor[1]},
    ${props.bgColor[2]},
    ${opacity}
  )`

const fixed = (props) =>
  (props.scrolled || props.toggled || props.fixed) &&
  css`
    background-color: rgba(22, 18, 27, 0.86);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
      background-color: rgba(22, 18, 27, 0.86);
      -webkit-backdrop-filter: saturate(180%) blur(20px);
      backdrop-filter: saturate(180%) blur(20px);
    }
  `

const Root = styled(Box, {
  shouldForwardProp: (prop) =>
    !['bgColor', 'scrolled', 'toggled', 'color', 'dark'].includes(prop)
})`
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 1000;
  ${fixed};
  @media print {
    display: none;
  }
`

export const Content = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 2;
`

const hoverColor = (name) =>
  ({
    white: 'smoke',
    smoke: 'muted',
    muted: 'slate',
    slate: 'white',
    black: 'slate',
    primary: 'error'
  })[name] || 'black'

const slide = keyframes({
  from: { transform: 'translateY(-25%)', opacity: 0 },
  to: { transform: 'translateY(0)', opacity: 1 }
})

const layout = (props) =>
  props.isMobile
    ? css`
        display: ${props.toggled ? 'flex' : 'none'};
        flex-direction: column;
        overflow-y: auto;
        text-align: left;
        height: 100vh;
        @media (prefers-reduced-motion: no-preference) {
          animation: ${slide} 0.25s ease-in;
        }
        a {
          color: ${theme.colors[props.dark ? 'white' : 'black']} !important;
          margin: 0 auto;
          height: 64px;
          font-weight: bold;
          font-size: ${theme.fontSizes[2]}px;
          width: 100vw;
          &:not(:last-child) {
            border-bottom: 1px solid rgba(48, 48, 48, 0.125);
          }
          @media screen and (max-width: 22em) {
            max-width: 16rem;
          }
        }
      `
    : css`
        @media (min-width: 56em) {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: ${theme.space[3]}px;
        }
        a {
          font-size: 16px;
          &:hover {
            color: ${theme.colors[hoverColor(props.color)]};
          }
        }
      `
const NavBar = styled(Box, {
  shouldForwardProp: (prop) => !['isMobile', 'toggled','scrolled','color','dark'].includes(prop)
})`
  display: none;
  ${layout};
  a {
    margin-left: ${theme.space[1]}px;
    padding: ${theme.space[3]}px;
    text-decoration: none;
    color: ${theme.colors.white};
    transition:
      color 0.2s ease,
      background-color 0.2s ease,
      transform 0.2s ease;
  }
  @media (min-width: 56em) {
    flex: 1;
    margin-left: ${theme.space[4]}px;
    a {
      margin-left: 0;
      padding: 10px 0;
      line-height: 1;
    }
    a:hover {
      color: #ec3750;
      transform: translateY(-1px);
    }
    .nav-cta {
      margin-left: ${theme.space[2]}px;
      padding: 12px 18px;
      border-radius: 9999px;
      background: ${theme.colors.primary};
      color: ${theme.colors.white};
      font-weight: bold;
      white-space: nowrap;
      box-shadow: ${theme.shadows.card};
    }
    .nav-cta:hover {
      background: #d92d4f;
      color: ${theme.colors.white};
      transform: translateY(-1px);
    }
    .nav-dropdown {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .nav-arrow {
      width: 12px;
      height: 12px;
      opacity: 0.8;
    }
  }
`

const DropdownMenu = ({ items, menuId, onMouseEnter, onMouseLeave }) => (
  <>
    <div
      className="dropdown-menu"
      id={menuId}
      role="menu"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'absolute',
        top: 'calc(100% + 16px)',
        left: '50%',
        background: 'rgba(23, 20, 27, 0.98)',
        borderRadius: 14,
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.32)',
        padding: 8,
        minWidth: 260,
        zIndex: 100,
        pointerEvents: 'auto',
        transform: 'translate3d(-50%, 0, 0)'
      }}
    >
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          role="menuitem"
          sx={{
            display: 'block',
            px: 2,
            py: 2,
            borderRadius: 8,
            fontFamily: 'body',
            fontSize: 2,
              color: 'white',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            '&:hover': {
              bg: 'rgba(255, 255, 255, 0.08)',
                color: 'white'
            }
          }}
        >
          {item.label}
        </Link>
      ))}
    </div>
    <style jsx>{`
      .dropdown-menu {
        opacity: 1;
      }
    `}</style>
  </>
)

const Navigation = ({ isMobile, toggled, dark, scrolled, openDd, enterDropdown, leaveDropdown }) => (
  <NavBar role="navigation" isMobile={isMobile} toggled={toggled} dark={dark} scrolled={scrolled}>
    {(isMobile ? mobileLinks : desktopLinks).map((item) => {
      if (item.dropdown) {
        const menuId = `dropdown-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
        return (
          <div
            key={item.label}
            style={{ position: 'relative' }}
            onMouseEnter={() => !isMobile && enterDropdown(item.label)}
            onMouseLeave={() => !isMobile && leaveDropdown()}
            onBlur={(event) => {
              if (!isMobile && !event.currentTarget.contains(event.relatedTarget)) {
                leaveDropdown()
              }
            }}
          >
            <Link
              href="#"
              className="nav-dropdown"
              role="button"
              aria-haspopup="menu"
              aria-controls={menuId}
              onClick={(e) => {
                e.preventDefault()
                clearDropdownTimer()
                if (openDd === item.label) {
                  closeDropdown()
                } else {
                  enterDropdown(item.label)
                }
              }}
              sx={{
                color: 'white',
                textDecoration: 'none',
                cursor: 'pointer',
                '&:hover': { color: '#ff7f95' }
              }}
            >
              {item.label}
              <svg className="nav-arrow" viewBox="0 0 12 8" aria-hidden="true" focusable="false">
                <path
                  d="M1 1.5L6 6.5L11 1.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            {!isMobile && openDd === item.label && (
              <DropdownMenu
                items={item.dropdown}
                menuId={menuId}
                onMouseEnter={() => enterDropdown(item.label)}
                onMouseLeave={() => leaveDropdown()}
              />
            )}
          </div>
        )
      }

      return (
        <Link key={item.label} href={item.href} sx={{ color: 'white', textDecoration: 'none', '&:hover': { color: '#ff7f95' } }}>
          {item.label}
        </Link>
      )
    })}
    {!isMobile && (
      <Link href="https://slack.hackclub.com" className="nav-cta" sx={{ textDecoration: 'none' }}>
        Join the community
      </Link>
    )}
  </NavBar>
)

const ToggleContainer = styled(Flex)`
  align-items: center;
  justify-content: center;
  min-width: 64px;
  min-height: 44px;
  cursor: pointer;
  user-select: none;
  margin-left: auto;
  @media (min-width: 56em) {
    display: none;
  }
`

function Header({ unfixed, color, bgColor, dark, fixed, ...props }) {
  const [scrolled, setScrolled] = useState(false)
  const [toggled, setToggled] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [openDd, setOpenDd] = useState(null)
  const navRef = React.useRef(null)
  const closeDropdownTimer = React.useRef(null)

  const onScroll=React.useCallback(()=>{
    setScrolled(window.scrollY>=16)
    setOpenDd(null)
  },[])
  const handleToggleMenu = () => {
    setToggled((t) => !t)
  }
  const clearDropdownTimer = () => {
    if (closeDropdownTimer.current) {
      window.clearTimeout(closeDropdownTimer.current)
      closeDropdownTimer.current = null
    }
  }
  const enterDropdown = (label) => {
    clearDropdownTimer()
    setOpenDd(label)
  }
  const leaveDropdown = () => {
    clearDropdownTimer()
    closeDropdownTimer.current = window.setTimeout(() => {
      setOpenDd(null)
    }, 180)
  }
  const closeDropdown = () => {
    clearDropdownTimer()
    setOpenDd(null)
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleOutsideClick = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        closeDropdown()
      }
    }

      if (!unfixed) {
        window.addEventListener('scroll', onScroll)
      }

      const mobileQuery = window.matchMedia('(max-width: 48em)')
      const handleMobileChange = (e) => {
        setMobile(e.matches)
        setToggled(false)
      }
      mobileQuery.addEventListener('change',handleMobileChange)
      setMobile(mobileQuery.matches)
      document.addEventListener('mousedown', handleOutsideClick)
    

    return () => {
      window.removeEventListener('scroll', onScroll)
      mobileQuery.removeEventListener('change',handleMobileChange)
      document.removeEventListener('mousedown', handleOutsideClick)
      clearDropdownTimer()
    }
  }, [unfixed])

  const baseColor = dark
    ? color || 'white'
    : color === 'white' && scrolled
      ? 'black'
      : color
  const toggleColor = dark
    ? color || 'snow'
    : toggled || (color === 'white' && scrolled)
      ? 'slate'
      : color

  return (
    <Root
      ref={navRef}
      {...props}
      fixed={fixed}
      scrolled={scrolled}
      toggled={toggled}
      dark={dark}
      bgColor={bgColor || (dark ? [32, 34, 36] : [255, 255, 255])}
      as="header"
      sx={{
        '@media (min-width: 56em)': {
          backgroundColor: 'rgba(22, 18, 27, 0.86)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)'
        }
      }}
    >
      <Content>
        <Flag scrolled={scrolled || fixed || undefined} />
        <Navigation
          isMobile={false}
          toggled={toggled}
          dark={dark}
          scrolled={scrolled}
          openDd={openDd}
          enterDropdown={enterDropdown}
          leaveDropdown={leaveDropdown}
        />
        <ToggleContainer color={toggleColor} onClick={handleToggleMenu}>
          <Icon glyph={toggled ? 'view-close' : 'menu'} />
        </ToggleContainer>
      </Content>
      <Navigation
        isMobile
        dark={dark}
        scrolled={scrolled}
        openDd={openDd}
        enterDropdown={enterDropdown}
        leaveDropdown={leaveDropdown}
      />
      {toggled && <style>{`body { overflow: hidden; }`}</style>}
    </Root>
  )
}

Header.defaultProps = {
  color: 'white'
}

export default Header
