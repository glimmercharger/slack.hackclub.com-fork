/** @jsxImportSource theme-ui */
import { useState, useEffect } from 'react'
import { Box, Card, Grid, Heading, Text } from 'theme-ui'
import { keyframes } from '@emotion/react'
import { getLiveCount, formatted as defaultFormatted } from '../../lib/members'

const float1 = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-18px); }
`
const float2 = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
`
const float3 = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`

const HeroGraphic = () => (
  <Box
    sx={{
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      overflow: 'hidden',
      zIndex: 0,
      pointerEvents: 'none'
    }}
  >
    <Box sx={{
      position: 'absolute', top: '10%', left: '5%',
      width: ['60px', '90px'], height: ['60px', '90px'],
      borderRadius: '50%', bg: 'rgba(255,255,255,0.15)',
      animation: `${float1} 6s ease-in-out infinite`
    }} />
    <Box sx={{
      position: 'absolute', top: '60%', left: '2%',
      width: ['30px', '50px'], height: ['30px', '50px'],
      borderRadius: '50%', bg: 'rgba(255,255,255,0.1)',
      animation: `${float2} 8s ease-in-out infinite`
    }} />
    <Box sx={{
      position: 'absolute', top: '20%', right: ['80px', '200px'],
      width: ['40px', '70px'], height: ['40px', '70px'],
      borderRadius: '50%', bg: 'rgba(255,255,255,0.12)',
      animation: `${float3} 7s ease-in-out infinite`
    }} />
    <Box aria-hidden="true" sx={{
      position: 'absolute',
      bottom: '-10px',
      left: ['10px', '40px'],
      fontSize: ['80px', '140px'],
      fontWeight: 800,
      color: 'rgba(255,255,255,0.08)',
      lineHeight: 1,
      fontFamily: 'inherit',
      userSelect: 'none'
    }}>
      #
    </Box>
    <Box aria-hidden="true" sx={{
      position: 'absolute',
      top: '5px',
      right: ['80px', '220px'],
      fontSize: ['60px', '100px'],
      fontWeight: 800,
      color: 'rgba(255,255,255,0.06)',
      lineHeight: 1,
      fontFamily: 'inherit',
      userSelect: 'none'
    }}>
      #
    </Box>
  </Box>
)

const MemberBadge = () => {
  const [count, setCount] = useState(defaultFormatted)

  useEffect(() => {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3000)
    getLiveCount(controller.signal)
      .then(data => setCount(data.formatted))
      .catch(() => {})
      .finally(() => clearTimeout(timeout))
    return () => {
      controller.abort()
      clearTimeout(timeout)
    }
  }, [])

  return (
    <Box sx={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 2,
      bg: 'rgba(255,255,255,0.15)',
      border: '1px solid rgba(255,255,255,0.3)',
      borderRadius: '999px',
      px: 3, py: 1, mb: 3,
      backdropFilter: 'blur(8px)'
    }}>
      <Box sx={{
        width: '8px', height: '8px',
        borderRadius: '50%', bg: '#2eb67d',
        boxShadow: '0 0 6px #2eb67d',
        animation: 'pulse 2s ease-in-out infinite',
        '@keyframes pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.4 }
        }
      }} />
      <Text sx={{ color: 'white', fontSize: 1, fontWeight: 600, letterSpacing: '0.03em' }}>
        {count} hackers online
      </Text>
    </Box>
  )
}

const Content = ({ onJoinClick }) => (
  <Grid
    gap={3}
    pt={[5, '100px']}
    pb={[3, 4]}
    sx={{
      backgroundImage:
        'radial-gradient(ellipse farthest-corner at top left, #ff8c37, #ec3750)',
      position: 'relative'
    }}
  >
    <HeroGraphic />
    <Box sx={{ position: 'relative', zIndex: 1, textShadow: 'text', textAlign: ['center', 'center'] }}>
      <MemberBadge />
      <Heading
        as="h1"
        variant="title"
        sx={{ color: 'white', fontSize: [5, 6, 7], lineHeight: 'limit', mb: [2, 3] }}
      >
        Hack Club Slack
      </Heading>
    </Box>
    <Box sx={{ zIndex: 5, display: 'flex', alignItems: 'center', position: 'relative' }}>
      <Card
        sx={{
          variant: 'cards.translucent',
          maxWidth: (t) => `calc(${t.sizes.narrow} * 1.2)`,
          mx: 'auto',
          textAlign: 'center'
        }}
      >
        <Text as="p" sx={{ fontSize: [2, 3], mb: 3 }}>
          Hack Clubbers hang out on our Slack.
          <br />
          Join up to make friends, find projects, and have fun.
        </Text>
        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Text
            as="button"
            onClick={onJoinClick}
            sx={{
              bg: 'red',
              backgroundImage:
                'radial-gradient(ellipse farthest-corner at top left, #ff8c37, #ec3750)',
              color: 'white',
              fontSize: [2, 3],
              px: 5, py: 3,
              borderRadius: 'extra',
              fontWeight: 'bold',
              textDecoration: 'none',
              display: 'inline-block',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.125s ease-in-out',
              border: '2px solid white',
              cursor: 'pointer',
              fontFamily: 'inherit',
              ':hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 0 0 2px white',
                backgroundImage:
                  'radial-gradient(ellipse farthest-corner at bottom right, #ff8c37, #ec3750)'
              }
            }}
          >
            Join Hack Club
          </Text>
        </Box>
      </Card>
    </Box>
  </Grid>
)

const Cover = () => (
  <Box
    sx={{
      position: 'absolute',
      bottom: '-20%',
      height: '100%',
      aspectRatio: '1/1',
      right: 0,
      backgroundImage: 'url(slack-logo.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100%',
      opacity: 0.75,
      zIndex: 0,
      filter: 'saturate(0.9) grayscale(0.2)'
    }}
  />
)


const Slack=({onJoinClick})=>(
  <Box 
  as="section"
  id="slack"
  sx={{
    position:'relative',
    overflow:'hidden'
  }}
  >
    <Cover/>
    <Content onJoinClick={onJoinClick}/>
  </Box>
)
export default Slack