import geoip from 'geoip-lite'
import countries from 'i18n-iso-countries'
import ct from 'countries-and-timezones'

// Register the languages we need
countries.registerLocale(require('i18n-iso-countries/langs/en.json'))

export default async function handler(req, res) {
  const timezone = req.query.timezone

  if (typeof timezone === 'string' && timezone) {
    try {
      const country = ct.getCountryForTimezone(timezone)

      if (!country) {
        return res.status(404).json({ error: 'Location not found for this timezone' })
      }

      const countryName = countries.getName(country.id, 'en')

      return res.status(200).json({
        country_name: countryName || country.name,
        country_code: country.id,
        region: null,
        city: null
      })
    } catch (error) {
      console.error('Browser timezone geolocation error:', error)
      return res.status(500).json({ error: 'Failed to resolve browser timezone' })
    }
  }

  // Extract client IP from headers
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || ''
  
  // Handle comma-separated IPs
  if (ip.includes(',')) {
    ip = ip.split(',')[0].trim()
  }

  // Reject requests where we still cannot determine a usable client IP.
if (!ip || ip === '::1' || ip === '127.0.0.1' || ip.startsWith('192.168.') || ip.startsWith('10.') || /^172\.(1[6-9]|2\d|3[01])\./.test(ip)) {
    return res.status(400).json({ error: 'Could not determine client IP' })
  }

  try {
    const geo = geoip.lookup(ip)

    if (!geo) {
      return res.status(404).json({ error: 'Location not found for this IP' })
    }

    // Convert 2-letter country code to full name for frontend matching
    const countryName = countries.getName(geo.country, 'en')

    res.status(200).json({
      country_name: countryName || geo.country,
      country_code: geo.country,
      region: geo.region,
      city: geo.city
    })
  } catch (error) {
    console.error('Local geolocation error:', error)
    res.status(500).json({ error: 'Failed to perform local geolocation' })
  }
}
