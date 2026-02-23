/**
 * BrowserOS → MiniMax Adapter
 * Proxies OpenAI/Anthropic-compatible chat requests to MiniMax API
 *
 * Set MINIMAX_API_KEY, optionally MINIMAX_BASE_URL and PORT
 */

import { Hono } from 'hono'

const BASE_URL =
  process.env.MINIMAX_BASE_URL ?? 'https://api.minimax.io/anthropic'
const API_KEY = process.env.MINIMAX_API_KEY ?? ''
const PORT = parseInt(process.env.PORT ?? '3100', 10)

const app = new Hono()

// Health check
app.get('/health', (c) => c.json({ ok: true, provider: 'minimax' }))

// Proxy chat completions to MiniMax
app.all('/*', async (c) => {
  if (!API_KEY) {
    return c.json(
      { error: 'MINIMAX_API_KEY environment variable is required' },
      500,
    )
  }

  const path = c.req.path.replace(/^\//, '')
  const url = `${BASE_URL.replace(/\/$/, '')}/${path}`
  const method = c.req.method
  const headers = new Headers(c.req.raw.headers)
  headers.set('x-api-key', API_KEY)
  headers.set('Authorization', `Bearer ${API_KEY}`)
  headers.delete('host')

  let body: BodyInit | undefined
  if (method !== 'GET' && method !== 'HEAD') {
    body = c.req.raw.body
  }

  const res = await fetch(url, {
    method,
    headers,
    body,
    duplex: 'half',
  } as RequestInit)

  const resHeaders = new Headers()
  res.headers.forEach((v, k) => {
    if (!['content-encoding'].includes(k.toLowerCase())) resHeaders.set(k, v)
  })

  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers: resHeaders,
  })
})

console.log(`BrowserOS MiniMax Adapter listening on http://localhost:${PORT}`)
console.log(`Proxying to ${BASE_URL}`)

export default {
  port: PORT,
  fetch: app.fetch,
}
