export default async function handler(req, res) {
  try {
    const response = await fetch('https://glimmercharger.github.io/coc-in-html/')
    const html = await response.text()

    const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)
    if (mainMatch) {
      res.setHeader('Content-Type', 'text/html')
      res.status(200).send(mainMatch[1])
      return
    }

    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
    if (bodyMatch) {
      const content = bodyMatch[1]
        .replace(/<header[\s\S]*?<\/header>/gi, '')
        .replace(/<footer[\s\S]*?<\/footer>/gi, '')
        .replace(/<nav[\s\S]*?<\/nav>/gi, '')
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')

      res.setHeader('Content-Type', 'text/html')
      res.status(200).send(content)
      return
    }

    res.status(500).json({ error: 'Could not parse content' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch conduct page' })
  }
}
