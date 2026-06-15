import { Box, Heading, Text, Link as ThemeLink } from 'theme-ui'
import { useState, useEffect, useCallback } from 'react'

const slideData = [
  {
    id: 'age',
    title: 'Hack Club is only for people aged 13-18',
    description: null,
    primaryButton: { label: 'I am 13-18', action: 'next' },
    secondaryButton: { label: "I'm a different age", action: 'down' },
    downSlide: {
      id: 'age-info',
      type: 'content',
      content: 'age-info'
    }
  },
  {
    id: 'conduct',
    title: 'Code of Conduct',
    description:
      'Hack Club is different from other online spaces - we will hold you to high standards that take effort to follow.',
    primaryButton: { label: 'I know and will follow the code', action: 'next' },
    secondaryButton: { label: 'Read the code', action: 'down' },
    downSlide: {
      id: 'conduct-content',
      type: 'fetch',
      url: 'https://hackclub.com/conduct/'
    }
  },
  {
    id: 'slack',
    title: 'We use Slack',
    description:
      <p>Slack is our online platform. If you don&#39;t know how to use it, we have written guides and <strong>living humans</strong> who will help you.</p>,
    primaryButton: { label: 'Join Hack Club', action: 'auth' },
    secondaryButton: { label: 'Help with Slack', action: 'down' },
    downSlide: {
      id: 'slack-help',
      type: 'content',
      content: 'slack-guide'
    }
  }
]

const BUTTON_MIN_WIDTH = '400px'

const PrimaryButton = ({ children, onClick }) => (
  <Box
    as="button"
    onClick={onClick}
    sx={{
      bg: 'red',
      backgroundImage:
        'radial-gradient(ellipse farthest-corner at top left, #ff8c37, #ec3750)',
      color: 'white',
      fontSize: [2, 3],
      px: 5,
      py: 3,
      borderRadius: 'extra',
      fontWeight: 'bold',
      border: '2px solid white',
      cursor: 'pointer',
      transition: 'all 0.125s ease-in-out',
      width: BUTTON_MIN_WIDTH,
      textAlign: 'center',
      ':hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 0 0 2px white',
        backgroundImage:
          'radial-gradient(ellipse farthest-corner at bottom right, #ff8c37, #ec3750)'
      }
    }}
  >
    {children} →
  </Box>
)

const SecondaryButton = ({ children, onClick }) => (
  <Box
    as="button"
    onClick={onClick}
    sx={{
      bg: 'transparent',
      color: 'white',
      fontSize: [2, 3],
      px: 4,
      py: 3,
      borderRadius: 'extra',
      fontWeight: 'bold',
      border: '2px solid white',
      cursor: 'pointer',
      transition: 'all 0.125s ease-in-out',
      width: BUTTON_MIN_WIDTH,
      textAlign: 'center',
      ':hover': {
        bg: 'white',
        color: 'red',
        transform: 'scale(1.05)'
      }
    }}
  >
    {children} ↓
  </Box>
)

const SlideContent = ({ slide, onAction }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      px: 4,
      maxWidth: '800px',
      mx: 'auto'
    }}
  >
    <Heading
      as="h1"
      sx={{
        color: 'white',
        fontSize: [4, 5, 6],
        mb: 3,
        textShadow: '0 2px 10px rgba(0,0,0,0.3)'
      }}
    >
      {slide.title}
    </Heading>
    {slide.description && (
      <Text
        sx={{
          color: 'white',
          fontSize: [2, 3],
          mb: 4,
          opacity: 0.9,
          textShadow: '0 1px 5px rgba(0,0,0,0.2)'
        }}
      >
        {slide.description}
      </Text>
    )}
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {slide.secondaryFirst ? (
        <>
          {slide.secondaryButton && (
            <SecondaryButton
              onClick={() => onAction(slide.secondaryButton.action)}
            >
              {slide.secondaryButton.label}
            </SecondaryButton>
          )}
          {slide.primaryButton && (
            <PrimaryButton onClick={() => onAction(slide.primaryButton.action)}>
              {slide.primaryButton.label}
            </PrimaryButton>
          )}
        </>
      ) : (
        <>
          {slide.primaryButton && (
            <PrimaryButton onClick={() => onAction(slide.primaryButton.action)}>
              {slide.primaryButton.label}
            </PrimaryButton>
          )}
          {slide.secondaryButton && (
            <SecondaryButton
              onClick={() => onAction(slide.secondaryButton.action)}
            >
              {slide.secondaryButton.label}
            </SecondaryButton>
          )}
        </>
      )}
    </Box>
  </Box>
)

const AgeInfoContent = () => (
  <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
    <Heading as="h2" sx={{ fontSize: [3, 4], color: 'black', mb: 3 }}>
      Not 13-18?
    </Heading>
    <Text sx={{ fontSize: [2, 3], color: 'slate', mb: 3 }}>
      If you&apos;re over 18, check out our partner organization,{' '}
      <ThemeLink href="https://github.com/education/students" target="_blank">
        GitHub Education
      </ThemeLink>
      .
    </Text>
    <Text sx={{ fontSize: [2, 3], color: 'slate' }}>
      If you&apos;re under 13, we&apos;ll be waiting for you on your birthday!
    </Text>
  </Box>
)

const SlackGuideContent = () => (
  <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
    <Heading as="h2" sx={{ fontSize: [3, 4], color: 'black', mb: 3 }}>
      How Slack works
    </Heading>
    <Box sx={{ fontSize: [1, 2], color: 'slate', '& p': { mb: 3 } }}>
      <p>
        Welcome! Our Slack can be intimidating, but that&apos;s because there is
        so much happening. We care about you, and wrote this guide to help you.
      </p>
      <p>
        <strong>Channels:</strong> Channels are to Slack what food is to a
        restaurant. The whole point! When you want to talk about something, you
        find the channel with other people who want to talk about it, or if that
        channel doesn&apos;t exist, you make your own.
      </p>
      <p>
        <strong>DMs:</strong> You can also DM individual users or groups of
        users.
      </p>
      <p>
        <strong>Search:</strong> The search bar at the top of your Slack is how
        you find channels to join, find people to DM, and look up messages. It
        has a lot of hidden functions; for example you can search in a specific
        channel for a specific message on a specific day.
      </p>
      <p>
        <strong>The Sidebar:</strong> Once you join a channel or start a DM, it
        lives in your sidebar. You can play around and reorganize it in the way
        that makes sense to you.
      </p>
    </Box>
  </Box>
)

const ConductContent = ({ content, loading, error }) => (
  <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
    <Heading as="h2" sx={{ fontSize: [3, 4], color: 'black', mb: 3 }}>
      Code of Conduct
    </Heading>
    {loading && <Text sx={{ color: 'slate', fontSize: 2 }}>Loading...</Text>}
    {error && (
      <Box>
        <Text sx={{ color: 'slate', fontSize: 2, mb: 2 }}>
          Could not load the Code of Conduct.
        </Text>
        <ThemeLink href="https://hackclub.com/conduct/" target="_blank">
          Read it on hackclub.com →
        </ThemeLink>
      </Box>
    )}
    {content && (
      <Box
        sx={{
          fontSize: [1, 2],
          color: 'slate',
          '& p': { mb: 3 },
          '& h1, & h2, & h3': { color: 'black', mt: 4, mb: 2 },
          '& ul, & ol': { pl: 4, mb: 3 },
          '& li': { mb: 2 }
        }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    )}
  </Box>
)

const DownSlideContent = ({ slide, onUp, conductData }) => {
  const renderContent = () => {
    if (slide.type === 'content') {
      if (slide.content === 'age-info') return <AgeInfoContent />
      if (slide.content === 'slack-guide') return <SlackGuideContent />
    }
    if (slide.type === 'fetch') {
      return (
        <ConductContent
          content={conductData.content}
          loading={conductData.loading}
          error={conductData.error}
        />
      )
    }
    return null
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        width: '100vw'
      }}
    >
      <Box
        sx={{
          backgroundImage: (t) => t.util.gx('orange', 'red'),
          height: '15vh',
          minHeight: '80px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          pb: 3
        }}
      >
        <Box
          as="button"
          onClick={onUp}
          sx={{
            bg: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: 'none',
            borderRadius: 'extra',
            px: 4,
            py: 2,
            fontSize: 2,
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            transition: 'background 0.2s',
            ':hover': { bg: 'rgba(255,255,255,0.3)' }
          }}
        >
          ↑ Back
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          bg: 'white',
          width: '100vw',
          overflowY: 'auto'
        }}
      >
        <Box
          sx={{
            maxWidth: '900px',
            mx: 'auto',
            p: [3, 4]
          }}
        >
          {renderContent()}
        </Box>
      </Box>
    </Box>
  )
}

const Slides = ({ isOpen, onClose }) => {
  const [currentX, setCurrentX] = useState(0)
  const [currentY, setCurrentY] = useState(0)
  const [slideDirection, setSlideDirection] = useState('right')
  const [conductData, setConductData] = useState({
    content: null,
    loading: false,
    error: null
  })

  const updateUrl = useCallback((x, y) => {
    const path = `/join${x > 0 ? `/${x + 1}` : ''}${y > 0 ? '/info' : ''}`
    window.history.pushState({ x, y, slides: true }, '', path)
  }, [])

  const navigateTo = useCallback(
    (x, y, direction) => {
      setSlideDirection(direction)
      setCurrentX(x)
      setCurrentY(y)
      updateUrl(x, y)
    },
    [updateUrl]
  )

  const handleAction = useCallback(
    (action) => {
      switch (action) {
        case 'next':
          if (currentX < slideData.length - 1) {
            navigateTo(currentX + 1, 0, 'right')
          }
          break
        case 'prev':
          if (currentX > 0) {
            navigateTo(currentX - 1, 0, 'left')
          } else {
            onClose()
          }
          break
        case 'down':
          navigateTo(currentX, 1, 'down')
          break
        case 'up':
          navigateTo(currentX, 0, 'up')
          break
        case 'auth':
          window.location.href = 'https://auth.hackclub.com/slack'
          break
      }
    },
    [currentX, navigateTo, onClose]
  )

  const handleBack = useCallback(() => {
    if (currentY > 0) {
      handleAction('up')
    } else if (currentX > 0) {
      handleAction('prev')
    } else {
      onClose()
    }
  }, [currentX, currentY, handleAction, onClose])

  useEffect(() => {
    if (!isOpen) return

    const handlePopState = (event) => {
      if (event.state?.slides) {
        const { x, y } = event.state
        const direction =
          x < currentX
            ? 'left'
            : x > currentX
              ? 'right'
              : y < currentY
                ? 'up'
                : 'down'
        setSlideDirection(direction)
        setCurrentX(x)
        setCurrentY(y)
      } else {
        onClose()
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [isOpen, handleAction, onClose])

  useEffect(() => {
    if (isOpen) {
      window.history.pushState({ x: 0, y: 0, slides: true }, '', '/join')
      setCurrentX(0)
      setCurrentY(0)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && currentY === 0) handleAction('next')
      if (e.key === 'ArrowLeft' && currentY === 0) handleAction('prev')
      if (
        e.key === 'ArrowDown' &&
        slideData[currentX]?.downSlide &&
        currentY === 0
      )
        handleAction('down')
      if (e.key === 'ArrowUp' && currentY > 0) handleAction('up')
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentX, currentY, handleAction, onClose])

  useEffect(()=>{
    if(currentY===1&&slideData[currentX]?.downSlide?.type==='fetch'){
      const controller=new AbortController()
      setConductData({content:null,loading:true,error:null})
      fetch('/api/conduct',{signal:controller.signal})
      .then((res)=>{
        if(!res.ok)throw new Error("failed to fetch")
          return res.text()
      })
      .then((html)=>{
        setConductData({content:html,loading:false,error:null})

      })
      .catch((err)=>{
        if(err.name==='AbortError')return
        setConductData({content:null,loading:false,error:true})
      })
      return()=>controller.abort()
    }
  },[currentX,currentY])

  if (!isOpen) return null

  const isDownSlide = currentY > 0
  const currentSlide = slideData[currentX]
  const downSlide = currentSlide?.downSlide

  const getAnimationName = () => {
    if (slideDirection === 'right') return 'slideFromRight'
    if (slideDirection === 'left') return 'slideFromLeft'
    if (slideDirection === 'down') return 'slideFromBottom'
    if (slideDirection === 'up') return 'slideFromTop'
    return 'slideFromRight'
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        overflow: 'hidden',
        '@keyframes slideFromRight': {
          from: { opacity: 0, transform: 'translateX(100%)' },
          to: { opacity: 1, transform: 'translateX(0)' }
        },
        '@keyframes slideFromLeft': {
          from: { opacity: 0, transform: 'translateX(-100%)' },
          to: { opacity: 1, transform: 'translateX(0)' }
        },
        '@keyframes slideFromBottom': {
          from: { opacity: 0, transform: 'translateY(100%)' },
          to: { opacity: 1, transform: 'translateY(0)' }
        },
        '@keyframes slideFromTop': {
          from: { opacity: 0, transform: 'translateY(-100%)' },
          to: { opacity: 1, transform: 'translateY(0)' }
        }
      }}
    >
      {!isDownSlide && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: (t) => t.util.gx('orange', 'red'),
            zIndex: 0
          }}
        />
      )}

      <Box
        as="button"
        onClick={handleBack}
        sx={{
          position: 'absolute',
          top: 4,
          left: 4,
          zIndex: 10,
          bg: 'rgba(255,255,255,0.2)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: 44,
          height: 44,
          fontSize: 3,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s',
          ':hover': { bg: 'rgba(255,255,255,0.3)' }
        }}
      >
        ←
      </Box>

      {!isDownSlide && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 4,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 2,
            zIndex: 10
          }}
        >
          {slideData.map((_, i) => (
            <Box
              key={i}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                bg: i === currentX ? 'white' : 'rgba(255,255,255,0.4)',
                transition: 'background 0.3s'
              }}
            />
          ))}
        </Box>
      )}

      <Box
        key={`${currentX}-${currentY}`}
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          animation: `${getAnimationName()} 0.4s ease-out forwards`
        }}
      >
        {isDownSlide && downSlide ? (
          <DownSlideContent
            slide={downSlide}
            onUp={() => handleAction('up')}
            conductData={conductData}
          />
        ) : (
          <SlideContent slide={currentSlide} onAction={handleAction} />
        )}
      </Box>
    </Box>
  )
}

export default Slides
