# BrowserOS ↔ MiniMax-M2.5 Full Implementation Plan

> **Goal:** Deliver all three tools: Config Generator, Adapter Service, and BrowserOS-agent integration with MiniMax provider + Agent UI.

**Architecture:** Config generator outputs JSON; adapter proxies HTTP to MiniMax; BrowserOS-agent adds MiniMax as first-class provider using Anthropic-compatible API.

**Tech Stack:** Bun, TypeScript, Hono (adapter), Vercel AI SDK (BrowserOS-agent)

---

## Component 1: Config Generator
- Single script `browseros-minimax-config/index.ts` with `--region global|china`, `--output`, `--api-key`
- Outputs BrowserOS-compatible provider config JSON

## Component 2: Adapter Service
- Hono HTTP server proxying chat completions to `https://api.minimax.io/anthropic`
- Env: `MINIMAX_API_KEY`, `MINIMAX_BASE_URL`, `PORT`

## Component 3: BrowserOS-agent Integration
- `packages/shared`: Add MINIMAX to LLM_PROVIDERS
- `apps/server`: Add createMinimaxModel in provider.ts
- `apps/agent`: Add minimax to types, providerTemplates, providerTypeOptions, providerIcons, DEFAULT_BASE_URLS
