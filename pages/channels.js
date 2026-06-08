/** @jsxImportSource theme-ui */
import Meta from '@hackclub/meta'
import Head from 'next/head'
import { Box, Heading, Text, Link as ThemeLink, Input } from 'theme-ui'
import { useState, useMemo } from 'react'
import channels from '../channels.json'
import Footer from '../components/footer'
import ForceTheme from '../components/force-theme'
import Nav from '../components/nav'

const formatName = (str) =>
  str.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

const getTypeLabel = (type) => {
  if (type === 'us-state') return 'US State'
  if (type === 'island') return 'Island'
  return 'Country'
}

const ChannelCard = ({ channel }) => (
  <Box
    as="a"
    href={channel.url}
    target="_blank"
    rel="noopener noreferrer"
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
      p: 3,
      bg: 'white',
      borderRadius: '12px',
      border: '1px solid',
      borderColor: 'smoke',
      borderTop: '4px solid',
      borderTopColor: 'primary',
      textDecoration: 'none',
      transition: 'all 0.2s ease-in-out',
      cursor: 'pointer',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 24px rgba(236, 55, 80, 0.15)',
        borderTopColor: 'orange'
      }
    }}
  >
    <Text
      sx={{
        fontWeight: 800,
        fontSize: '1rem',
        color: 'primary',
        textAlign: 'center',
        lineHeight: 1.3
      }}
    >
      #{channel.channel}
    </Text>
    <Text
      sx={{
        fontSize: '0.75rem',
        color: 'muted',
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}
    >
      {getTypeLabel(channel.type)}
    </Text>
  </Box>
)

const FilterButton = ({ active, onClick, children }) => (
  <Box
    as="button"
    onClick={onClick}
    sx={{
      px: 4,
      py: 2,
      borderRadius: '999px',
      border: '2px solid',
      borderColor: active ? 'primary' : 'smoke',
      bg: active ? 'primary' : 'white',
      color: active ? 'white' : 'slate',
      fontWeight: 700,
      fontSize: '0.9rem',
      cursor: 'pointer',
      fontFamily: 'inherit',
      transition: 'all 0.15s ease',
      '&:hover': {
        borderColor: 'primary',
        color: active ? 'white' : 'primary'
      }
    }}
  >
    {children}
  </Box>
)

const ChannelsPage = () => {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(() => {
    return channels.filter((c) => {
      const matchesSearch =
        c.channel.includes(search.toLowerCase()) ||
        c.match.includes(search.toLowerCase())
      const matchesFilter =
        filter === 'all' ||
        (filter === 'country' && c.type === 'country') ||
        (filter === 'us-state' && c.type === 'us-state') ||
        (filter === 'island' && c.type === 'island')
      return matchesSearch && matchesFilter
    })
  }, [search, filter])

  const counts = useMemo(() => ({
    all: channels.length,
    country: channels.filter((c) => c.type === 'country').length,
    'us-state': channels.filter((c) => c.type === 'us-state').length,
    island: channels.filter((c) => c.type === 'island').length
  }), [])

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
        name="Regional Channels – Hack Club Slack"
        description="Browse all regional Hack Club Slack channels by country and US state. Find and join your local community!"
      />
      <ForceTheme theme="light" />
      <Nav />

      {/* Hero */}
      <Box
        sx={{
          backgroundImage: (t) => t.util.gx('orange', 'red'),
          pt: ['7rem', '8rem'],
          pb: ['3rem', '4rem'],
          px: ['1.5rem', '3rem'],
          textAlign: 'center'
        }}
      >
        <Heading
          as="h1"
          sx={{
            fontSize: ['2.5rem', '4rem'],
            color: 'white',
            fontWeight: 800,
            mb: 2,
            textShadow: '0 2px 12px rgba(0,0,0,0.2)'
          }}
        >
          Regional Channels
        </Heading>
        <Text
          sx={{
            color: 'white',
            fontSize: ['1rem', '1.25rem'],
            opacity: 0.9,
            mb: 3
          }}
        >
          Find and join your local Hack Club community on Slack
        </Text>
        <Text
          sx={{
            color: 'white',
            fontSize: '0.95rem',
            opacity: 0.75
          }}
        >
          {channels.length} channels across {counts.country} countries &amp; {counts['us-state']} US states
        </Text>
      </Box>

      {/* Search + Filter */}
      <Box
        sx={{
          maxWidth: '1200px',
          mx: 'auto',
          px: ['1.5rem', '3rem'],
          py: ['1.5rem', '2rem']
        }}
      >
        <Box
          sx={{
            bg: 'white',
            borderRadius: '16px',
            p: ['1.25rem', '1.75rem'],
            boxShadow: 'card',
            border: '1px solid',
            borderColor: 'smoke',
            mb: ['1.5rem', '2rem']
          }}
        >
          <Input
            placeholder="Search channels..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              mb: 3,
              fontSize: '1rem',
              borderRadius: '8px',
              border: '2px solid',
              borderColor: 'smoke',
              px: 3,
              py: 2,
              fontFamily: 'inherit',
              '&:focus': {
                borderColor: 'primary',
                outline: 'none'
              }
            }}
          />
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
              All ({counts.all})
            </FilterButton>
            <FilterButton active={filter === 'country'} onClick={() => setFilter('country')}>
              Countries ({counts.country})
            </FilterButton>
            <FilterButton active={filter === 'us-state'} onClick={() => setFilter('us-state')}>
              US States ({counts['us-state']})
            </FilterButton>
            <FilterButton active={filter === 'island'} onClick={() => setFilter('island')}>
              Islands ({counts.island})
            </FilterButton>
          </Box>
        </Box>

        {/* Results count */}
        <Text sx={{ color: 'muted', fontSize: '0.9rem', mb: 3, fontWeight: 500 }}>
          {filtered.length === 0
            ? 'No channels found'
            : `Showing ${filtered.length} channel${filtered.length !== 1 ? 's' : ''}`}
        </Text>

        {/* Grid */}
        {filtered.length > 0 ? (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: [
                'repeat(2, 1fr)',
                'repeat(3, 1fr)',
                'repeat(4, 1fr)',
                'repeat(5, 1fr)'
              ],
              gap: ['0.75rem', '1rem']
            }}
          >
            {filtered.map((channel) => (
              <ChannelCard key={channel.id} channel={channel} />
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              textAlign: 'center',
              py: '4rem',
              color: 'muted'
            }}
          >
            <Text sx={{ fontSize: '1.15rem', fontWeight: 600 }}>
              No channels match &quot;{search}&quot;
            </Text>
            <Text sx={{ fontSize: '0.95rem', mt: 1 }}>
              Try a different search term
            </Text>
          </Box>
        )}

        {/* Back link */}
        <Box sx={{ textAlign: 'center', mt: ['3rem', '4rem'], mb: '2rem' }}>
          <ThemeLink
            href="/"
            sx={{
              color: 'primary',
              fontWeight: 700,
              fontSize: '1rem',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            Back to Hack Club Slack
          </ThemeLink>
        </Box>
      </Box>

      <Footer />
    </Box>
  )
}

export default ChannelsPage