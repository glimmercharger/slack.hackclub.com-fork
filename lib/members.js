export const count = 27253
export const formatted = count.toLocaleString('en-US')
export const thousands = Math.round(count / 1000)

export async function getLiveCount(signal) {
  try {
    const res = await fetch('https://slack-data.hackclub.dev/api/stats', { signal })
    if (!res.ok) throw new Error('Failed to fetch')
    const data = await res.json()
    const live = data.member_count ?? count
    return {
      count: live,
      formatted: live.toLocaleString('en-US'),
      thousands: Math.round(live / 1000)
    }
  } catch {
    return { count, formatted, thousands }
  }
}