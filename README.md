# BrowserOS ↔ MiniMax-M2.5 Integration

Tools to connect BrowserOS agents to the MiniMax-M2.5 API.

## Components

### 1. Config Generator (`browseros-minimax-config`)

Generates BrowserOS-compatible provider JSON for MiniMax-M2.5.

```bash
cd browseros-minimax-config
bun run index.ts --api-key=YOUR_KEY --region=global
# Or save: bun run index.ts --output=minimax-config.json
```

### 2. Adapter Service (`browseros-minimax-adapter`)

HTTP proxy that forwards requests to MiniMax. Use when BrowserOS cannot add MiniMax directly.

```bash
cd browseros-minimax-adapter
npm install
MINIMAX_API_KEY=your_key npm run start
# Configure BrowserOS: add OpenAI Compatible provider with baseUrl http://localhost:3100
```

### 3. BrowserOS-Agent Integration (`browseros-agent`)

MiniMax added as a first-class provider in the BrowserOS-agent monorepo.

**Changes:**
- `packages/shared`: MINIMAX in LLM_PROVIDERS
- `apps/server`: createMinimaxModel in provider.ts
- `apps/agent`: MiniMax in provider picker (types, templates, icons)

**Requirements:** Bun (project uses `workspace:*`)

```bash
cd browseros-agent
bun install
bun run start:server
# In BrowserOS: Settings → Add provider → MiniMax
```

## Quick Start

1. Get a [MiniMax API key](https://platform.minimax.io/user-center/basic-information/interface-key)
2. Use the config generator to output settings, or run the adapter, or clone BrowserOS-agent and use the native MiniMax provider
3. For China: use `--region=china` or `MINIMAX_BASE_URL=https://api.minimaxi.com/anthropic`
