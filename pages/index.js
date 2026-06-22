/** @jsxImportSource theme-ui */
import Meta from '@hackclub/meta'
import Head from 'next/head'
import { Box, Heading, Text, Link as ThemeLink } from 'theme-ui'
import { useState, useRef, useCallback } from 'react'
import channels from '../channels.json'

import { thousands } from '../lib/members'
import Footer from '../components/footer'
import ForceTheme from '../components/force-theme'
import Nav from '../components/nav'
import Header from '../components/slack/header'
import Slides from '../components/slides/Slides'

const ChannelName = ({ children, href }) => (
  <Text
    as={href ? 'a' : 'span'}
    href={href}
    target={href ? '_blank' : undefined}
    sx={{
      fontWeight: 500,
      color: '#1264a3',
      fontSize: '1.1rem',
      backgroundColor: '#e8f5fa',
      border: '1px solid rgba(18, 100, 163, 0.1)',
      px: '0.4em',
      py: '0.1em',
      borderRadius: '6px',
      textDecoration: 'none',
      display: 'inline-block',
      lineHeight: '1.4',
      transition: 'all 0.2s ease-in-out',
      ...(href && {
        '&:hover': {
          backgroundColor: '#c9e5f2',
          transform: 'scale(1.05)',
          boxShadow: '0 2px 8px rgba(18, 100, 163, 0.15)'
        }
      })
    }}
  >
    {children}
  </Text>
)

const GuideItem = ({ title, children, isOpen, onToggle }) => {
  const contentRef = useRef(null)

  const handleClick = () => {
    onToggle()
  }

  const handleTransitionEnd = useCallback(() => {}, [])

  return (
    <Box
      sx={{
        borderBottom: '1px solid',
        borderColor: 'smoke',
        overflow: 'hidden',
        '&:last-child': { borderBottom: 'none' }
      }}
    >
      <Box
        as="button"
        onClick={handleClick}
        sx={{
          width: '100%',
          py: '1.25rem',
          px: '0.5rem',
          fontWeight: 600,
          fontSize: '1.5rem',
          color: 'steel',
          cursor: 'pointer',
          background: 'none',
          border: 'none',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'inherit',
          textAlign: 'left',
          borderRadius: '8px',
          transition: 'all 0.2s ease',
          '&:hover': {
            color: 'primary',
            bg: 'rgba(236, 55, 80, 0.05)'
          },
          '&:hover .guide-icon': { color: 'primary' }
        }}
      >
        {title}
        <Text
          className="guide-icon"
          sx={{
            fontSize: '1.5rem',
            fontWeight: 400,
            color: 'muted',
            transition: 'transform 0.3s ease, color 0.2s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
          }}
        >
          {isOpen ? '−' : '+'}
        </Text>
      </Box>
      <Box
        ref={contentRef}
        onTransitionEnd={handleTransitionEnd}
        sx={{
          display: 'grid',
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.3s ease',
          '& > div': { overflow: 'hidden' }
        }}
      >
        <Box
          sx={{
            fontSize: '1.15rem',
            pb: isOpen ? '1.5rem' : 0,
            pt: isOpen ? '0.5rem' : 0,
            px: '0.5rem',
            transition: 'padding 0.3s ease',
            '& p': { mb: '0.75rem', color: 'slate', lineHeight: '1.6' },
            '& p:last-child, & ul:last-child': { mb: 0 },
            '& ul': { pl: '1.5rem' },
            '& li': { mb: '0.5rem', color: 'slate' },
            '& code': {
              bg: 'sunken',
              px: '0.3em',
              py: '0.1em',
              borderRadius: '4px',
              fontFamily: 'monospace'
            }
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}

const Card = ({ children, sx, ...props }) => (
  <Box
    sx={{
      bg: 'white',
      borderRadius: '16px',
      p: ['1.5rem', '2rem'],
      boxShadow: 'card',
      border: '1px solid',
      borderColor: 'smoke',
      borderTop: '6px solid',
      borderTopColor: 'primary',
      transition: 'all 0.25s ease-in-out',
      '&:hover': {
        boxShadow: 'elevated',
        transform: 'translateY(-6px)'
      },
      ...sx
    }}
    {...props}
  >
    {children}
  </Box>
)

const MakeFigure = (props) => {
  const imgUrl = props.imgUrl
  const imgDesc = props.imgDesc
  return (
    <figure
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
      }}
    >
      <img
        src={imgUrl}
        alt={imgDesc}
        loading="lazy"
        sx={{
          height: '22.5rem'
        }}
      />
      <figcaption>{imgDesc}</figcaption>
    </figure>
  )
}

const TimelineItem = ({ version, date, children, isLast }) => (
  <Box
    as="article"
    sx={{
      display: 'flex',
      gap: '1.5rem',
      position: 'relative',
      pb: isLast ? 0 : '2.5rem'
    }}
  >
    {!isLast && (
      <Box
        sx={{
          position: 'absolute',
          left: '11px',
          top: '24px',
          bottom: 0,
          width: '2px',
          background: (t) =>
            `linear-gradient(to bottom, ${t.colors.primary}, ${t.colors.orange})`,
          zIndex: 0
        }}
      />
    )}
    <Box
      sx={{
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        bg: 'primary',
        backgroundImage:
          'radial-gradient(ellipse farthest-corner at top left, #ff8c37, #ec3750)',
        border: '4px solid white',
        boxShadow: '0 0 0 2px rgba(236, 55, 80, 0.2)',
        flexShrink: 0,
        zIndex: 1,
        mt: '4px'
      }}
    />
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          mb: '0.5rem',
          flexWrap: 'wrap'
        }}
      >
        <Text
          sx={{
            fontWeight: 700,
            color: 'white',
            bg: 'primary',
            px: '0.6rem',
            py: '0.1rem',
            borderRadius: '20px',
            fontSize: '0.85rem',
            letterSpacing: '0.02em'
          }}
        >
          {version}
        </Text>
        <Text sx={{ fontSize: '0.9rem', color: 'muted', fontWeight: 500 }}>
          {date}
        </Text>
      </Box>
      <Text sx={{ fontSize: '1.15rem', color: 'slate', lineHeight: '1.5' }}>
        {children}
      </Text>
    </Box>
  </Box>
)

const SlackPage = () => {
  const nameInputRef = useRef(null)
  const [openGuide, setOpenGuide] = useState(null)
  const [slidesOpen, setSlidesOpen] = useState(false)
  const [countryChannel, setCountryChannel] = useState(null)
  const [stateChannel, setStateChannel] = useState(null)
  const [geoLoading, setGeoLoading] = useState(false)
  const [geoError, setGeoError] = useState(null)

  const applyCountryChannel = (countryName, countryCode, regionName = null) => {
    if (!countryName) return false

    const country = countryName.toLowerCase().replace(/[\s-]+/g, '-')
    const countryMatch = channels.find(
      (c) =>
        c.type === 'country' &&
        (country.includes(c.match) || c.match.includes(country))
    )

    if (!countryMatch) return false

    setCountryChannel({
      name: countryName,
      code: countryCode,
      channel: countryMatch
    })

    if (countryCode === 'US' && regionName) {
      const region = regionName.toLowerCase().replace(/[\s-]+/g, '-')
      const stateMatch = channels.find(
        (c) =>
          c.type === 'us-state' &&
          (region.includes(c.match) || c.match.includes(region))
      )

      if (stateMatch) {
        setStateChannel({ name: regionName, channel: stateMatch })
      }
    }

    return true
  }

  const getBrowserTimezone = () => {
    if (typeof window === 'undefined') return null
    return window.Intl?.DateTimeFormat?.().resolvedOptions?.().timeZone || null
  }

  const lookupLocation = async (url) => {
    const res = await fetch(url)

    if (!res.ok) {
      throw new Error('Location lookup failed.')
    }

    const data = await res.json()

    if (data.error) {
      throw new Error(data.reason || data.error || 'Location lookup failed.')
    }

    const matched = applyCountryChannel(
      data.country_name,
      data.country_code,
      data.region
    )

    if (!matched) {
      throw new Error('Location lookup failed.')
    }

    return matched
  }

  const lookupIpLocation = () => lookupLocation('/api/geo')

  const lookupBrowserLocation = async () => {
    const timezone = getBrowserTimezone()

    if (!timezone) {
      throw new Error('Your browser does not expose a timezone.')
    }

    return lookupLocation(`/api/geo?timezone=${encodeURIComponent(timezone)}`)
  }

  const handleGeolocate = async () => {
    setGeoLoading(true)
    setGeoError(null)
    const isLocalhost =
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname === '::1'

    try {
      await lookupBrowserLocation()
    } catch (browserError) {
      if (!isLocalhost) {
        try {
          await lookupIpLocation()
          return
        } catch {
          // Fall through to the browser error below.
        }
      }

      setGeoError(
        browserError.message === 'Browser geolocation is unavailable.'
          ? 'Your browser does not expose location data.'
          : browserError.message
      )
    } finally {
      setGeoLoading(false)
    }
  }

  const handleGuideToggle = (index) => {
    setOpenGuide(openGuide === index ? null : index)
  }

  const handleJoinClick = () => {
    setSlidesOpen(true)
  }

  const handleSlidesClose = useCallback(() => {
    setSlidesOpen(false)
    window.history.pushState(null, '', '/')
  }, [])

  return (
    <Box
      sx={{
        backgroundImage: 'url(/pattern.svg)',
        backgroundRepeat: 'repeat',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        backgroundColor: 'snow'
      }}
    >
      <Meta
        as={Head}
        name="Join our Slack"
        description={`The Hack Club Slack is a community of ${thousands}k+ high school hackers around the world. Chat, meet new friends, code together, share your work.`}
        image="https://cloud-n6i5i4zb9-hack-club-bot.vercel.app/02020-07-25_d2dd4egb1th5k71w4uj0abbfkvvtnc01.jpeg"
      />
      <ForceTheme theme="light" />
      <Nav />
      <Slides isOpen={slidesOpen} onClose={handleSlidesClose} />
      <Header onJoinClick={handleJoinClick} />

      <Box
        as="main"
        sx={{
          display: 'grid',
          gridTemplateColumns: ['1fr', '1fr 1fr'],
          gap: ['2rem', '3rem'],
          maxWidth: '1200px',
          mx: 'auto',
          p: ['1.5rem', '3rem'],
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Guide Section */}
        <Card sx={{ gridColumn: ['1', '1 / -1'] }}>
          <Heading
            as="h2"
            sx={{
              fontSize: ['2.5rem', '3.5rem'],
              color: 'primary',
              mb: '1.5rem',
              lineHeight: 'tight',
              fontWeight: 800,
              backgroundImage: (t) => t.util.gx('orange', 'red'),
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}
          >
            New? Read this first!
          </Heading>

          <GuideItem
            title="How Slack works"
            isOpen={openGuide === 0}
            onToggle={() => handleGuideToggle(0)}
          >
            <p>
              Welcome! Our Slack can be intimidating, but that&apos;s because
              there is so much happening. We care about you, and wrote this
              guide to help you.
            </p>
            <div>
              <Heading as="h3">Channels</Heading>
              <p>
                The best place to meet new people and have interesting
                conversations. When you want to talk about something, you find
                the channel with other people who want to talk about it, or if
                that channel doesn&apos;t exist, you make your own!
              </p>
              <MakeFigure
                imgUrl="/slack-channel.gif"
                imgDesc="A GIF showing channels in Slack"
              />
            </div>
            <div>
              <Heading as="h3">DMs</Heading>
              <p>
                You can also DM individual users or groups of users. This is
                another way to connect with members of our community!
              </p>
              <MakeFigure
                imgUrl="/slack-dms.gif"
                imgDesc="A GIF showing how the DMs section looks like in Slack"
              />
            </div>
            <div>
              <Heading as="h3">Search</Heading>
              <p>
                The search bar at the top of your Slack is how you find channels
                to join, find people to DM, and look up messages. It has so many
                hidden functions; for example you can search in a specific
                channel or DM for a specific message on a specific day!
              </p>
              <MakeFigure
                imgUrl="/slack-search.gif"
                imgDesc="A GIF showing the search bar in Slack"
              />
            </div>
            <div>
              <Heading as="h3">The Sidebar</Heading>
              <p>
                Once you join a channel or start a DM, it lives in your sidebar.
                You can play around and reorganize it in the way that makes
                sense to you.
              </p>
              <div
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}
              >
                <MakeFigure
                  imgUrl="/default-slack-sidebar.png"
                  imgDesc="How the Slack sidebar looks by default"
                />
                <MakeFigure
                  imgUrl="/slack-sidebar-small-icons.png"
                  imgDesc="Slack sidebar with small icons enabled"
                />
                <MakeFigure
                  imgUrl="/slack-sidebar-all-items-enabled.png"
                  imgDesc="Slack sidebar with all icons enabled"
                />
                <MakeFigure
                  imgUrl="/slack-sidebar-all-items-disabled.png"
                  imgDesc="Slack sidebar with most icons disabled"
                />
                <MakeFigure
                  imgUrl="/slack-sidebar-preferences.png"
                  imgDesc="Options for the slack sidebar"
                />
              </div>
            </div>
          </GuideItem>

          <GuideItem
            title="Where to start"
            isOpen={openGuide === 1}
            onToggle={() => handleGuideToggle(1)}
          >
            <p>
              <strong>
                As a new user, you&apos;re put into a special welcome channel
                for new users
              </strong>{' '}
              who joined around the same time as you. This is overseen by our
              Gardeners - teen hackers who volunteer to help new users.
              Don&apos;t be shy: ask them a question (they don&apos;t bite.)!
              It&apos;s also a good place to make friends with other new users,
              and do fun things organized by the Special Activities Division.
            </p>
            <p>Other than your welcome channel, here are some core channels:</p>
            <p>
              <ChannelName href="https://hackclub.enterprise.slack.com/archives/C0710J7F4U9">
                #ysws
              </ChannelName>{' '}
              - At Hack Club, the #1 activity is making things! &quot;You Ship,
              We Ship&quot; is a challenge where you make something and you get
              a prize in return! (sounds fun right). Make what? Get what? There
              are lots of different YSWS, offering different prizes for
              different kinds of projects. Browse{' '}
              <ChannelName href="https://hackclub.enterprise.slack.com/archives/C0710J7F4U9">
                #ysws
              </ChannelName>{' '}
              to find a challenge and get started.
            </p>
            <p>
              Once you find a YSWS you like, join its channel. Many YSWS also
              have a help channel. Join that, too.
            </p>
            <p>Here are more key channels:</p>
            <ul>
              <li>
                <ChannelName href="https://hackclub.enterprise.slack.com/archives/C0EA9S0A0">
                  #code
                </ChannelName>{' '}
                - A channel to discuss and get help with code
              </li>
              <li>
                <ChannelName href="https://hackclub.enterprise.slack.com/archives/C6C026NHJ">
                  #hardware
                </ChannelName>{' '}
                - A channel to get discuss and help with hardware projects
              </li>
              <li>
                <ChannelName href="https://hackclub.enterprise.slack.com/archives/C01504DCLVD">
                  #scrapbook
                </ChannelName>{' '}
                - A channel to show off your work in progress, and be amazed by
                others doing the same!
              </li>
            </ul>
            <ul>
              <li>
                <ChannelName href="https://hackclub.enterprise.slack.com/archives/C0266FRGT">
                  #announcements
                </ChannelName>{' '}
                - Big announcements
              </li>
              <li>
                <ChannelName href="https://hackclub.enterprise.slack.com/archives/C05B6DBN802">
                  #happenings
                </ChannelName>{' '}
                - A biweekly roundup of cool stuff happening on the Slack
              </li>
              <li>
                <ChannelName href="https://hackclub.enterprise.slack.com/archives/C01AS1YEM8A">
                  #neighbourhood
                </ChannelName>{' '}
                - A channel to help you find even more channels! Channels
                channel channels!
              </li>
              <li>
                <ChannelName href="https://hackclub.enterprise.slack.com/archives/C078Q8PBD4G">
                  #library
                </ChannelName>{' '}
                - An app that shows the newest and most active channels. We
                really like channels!
              </li>
              <li>
                <ChannelName href="https://hackclub.enterprise.slack.com/archives/C0266FRGV">
                  #lounge
                </ChannelName>{' '}
                - A channel for general discussion.{' '}
              </li>
            </ul>{' '}
            Remember to follow the code of conduct everywhere in the Slack!
            <p>
              Want more information about Slack? Read the{' '}
              <ThemeLink href="https://readme.hackclub.com/slack">
                readme
              </ThemeLink>
              !
            </p>
          </GuideItem>

          <GuideItem
            title="Being good"
            isOpen={openGuide === 2}
            onToggle={() => handleGuideToggle(2)}
          >
            <p>
              Hack Club is special, because we insist on making it that way. We
              will hold you to higher standards than most other online spaces.
            </p>
            <p>
              Our{' '}
              <ThemeLink href="https://hackclub.com/conduct/">
                Code of Conduct
              </ThemeLink>{' '}
              is short because we expect you to read it, know it, and follow it.
            </p>
            <p>
              If you want to report misconduct, send a DM to{' '}
              <ChannelName href="https://hackclub.slack.com/app_redirect?app=A07K4T4FMAS">
                @shroud
              </ChannelName>
              , which reports it to the Fire Department, our moderation team.
            </p>
          </GuideItem>
        </Card>

        {/* Slack Highlights */}
        <Card sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Heading
            as="h2"
            sx={{
              fontSize: ['2.5rem', '3.5rem'],
              color: 'primary',
              mb: 0,
              lineHeight: 'tight',
              fontWeight: 800,
              backgroundImage: (t) => t.util.gx('orange', 'red'),
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}
          >
            Slack Highlights
          </Heading>
          {countryChannel ? (
            <Text sx={{ fontSize: '1.15rem', color: 'slate' }}>
              Hey, it looks like you&apos;re from
              {stateChannel
                ? ` ${stateChannel.name}, ${countryChannel.code}`
                : ` ${countryChannel.name}`}
              ! Join fellow hack clubbers in{' '}
              <ChannelName href={countryChannel.channel.url}>
                #{countryChannel.channel.channel}
              </ChannelName>
              {stateChannel && (
                <>
                  {' '}
                  and{' '}
                  <ChannelName href={stateChannel.channel.url}>
                    #{stateChannel.channel.channel}
                  </ChannelName>
                </>
              )}
            </Text>
          ) : (
            <Box>
              <Text
                as="button"
                onClick={handleGeolocate}
                disabled={geoLoading}
                sx={{
                  bg: 'red',
                  backgroundImage:
                    'radial-gradient(ellipse farthest-corner at top left, #ff8c37, #ec3750)',
                  color: 'white',
                  fontSize: 2,
                  px: 4,
                  py: 3,
                  borderRadius: 'extra',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  display: 'inline-block',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform 0.125s ease-in-out',
                  border: '2px solid white',
                  cursor: geoLoading ? 'default' : 'pointer',
                  fontFamily: 'inherit',
                  opacity: geoLoading ? 0.7 : 1,
                  ':hover:not(:disabled)': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 0 0 2px white',
                    backgroundImage:
                      'radial-gradient(ellipse farthest-corner at bottom right, #ff8c37, #ec3750)'
                  }
                }}
              >
                {' '}
                {geoLoading ? (
                  'Looking up\u2026'
                ) : (
                  <>
                    Find your regional channel
                    <br />
                    (uses your browser timezone when available)
                  </>
                )}
              </Text>
              {geoError && (
                <Text
                  sx={{
                    color: 'red',
                    fontSize: 1,
                    mt: 2,
                    display: 'block',
                    fontWeight: 'bold'
                  }}
                >
                  {geoError}
                </Text>
              )}
            </Box>
          )}
          <Text sx={{ fontSize: '1.15rem', color: 'slate' }}>
            Feel like sharing something random from your life? Check out{' '}
            <ChannelName href="https://hackclub.enterprise.slack.com/archives/C0AL2BXLB7V">
              #self
            </ChannelName>{' '}
          </Text>
          <ThemeLink
            href="/channels"
            sx={{
              display: 'inline-block',
              mt: 2,
              color: 'primary',
              fontWeight: 700,
              fontSize: '1rem',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            Browse all regional channels →
          </ThemeLink>
        </Card>

        {/* Changelog */}
        <Card>
          <Heading
            as="h2"
            sx={{
              fontSize: ['2.5rem', '3.5rem'],
              color: 'primary',
              mb: '2rem',
              lineHeight: 'tight',
              fontWeight: 800,
              backgroundImage: (t) => t.util.gx('orange', 'red'),
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}
          >
            Changelog
          </Heading>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TimelineItem version="v1.3.0" date="March 16 2026">
              Country and US state channel suggestions based on your location
            </TimelineItem>
            <TimelineItem version="v1.2.0" date="March 10 2026">
              <ThemeLink href="https://news.hackclub.com">
                Slacker News
              </ThemeLink>{' '}
              and Prometheus launched
            </TimelineItem>
            <TimelineItem version="v1.1.0" date="January 27 2026">
              slides added to onboarding flow
            </TimelineItem>
            <TimelineItem version="v1.0.0" date="January 16 2026" isLast>
              slack.hackclub.com launched
            </TimelineItem>
          </Box>
        </Card>
      </Box>

      <Footer />
    </Box>
  )
}

export default SlackPage