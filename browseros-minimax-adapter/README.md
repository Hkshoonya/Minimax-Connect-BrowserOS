# BrowserOS MiniMax Adapter

HTTP proxy that forwards BrowserOS (OpenAI/Anthropic-compatible) requests to the MiniMax-M2.5 API. Use when BrowserOS cannot add MiniMax as a direct provider.

## Setup

```bash
bun install
```

## Environment Variables

| Variable           | Required | Default                           | Description                     |
| ------------------ | -------- | --------------------------------- | ------------------------------- |
| `MINIMAX_API_KEY`  | Yes      | -                                 | Your MiniMax API key            |
| `MINIMAX_BASE_URL` | No       | `https://api.minimax.io/anthropic`| MiniMax API base (use `https://api.minimaxi.com/anthropic` for China) |
| `PORT`             | No       | `3100`                            | Adapter server port             |

## Run

```bash
MINIMAX_API_KEY=your_key bun run start
```

## Usage with BrowserOS

1. Add an **OpenAI Compatible** provider in BrowserOS settings
2. Set **Base URL** to `http://localhost:3100` (or your adapter URL)
3. Leave API key empty (adapter injects `MINIMAX_API_KEY`)
4. Set **Model** to `MiniMax-M2.5` or `MiniMax-M2.5-highspeed`
