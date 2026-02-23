# BrowserOS MiniMax Config Generator

Generates BrowserOS-compatible provider configuration for MiniMax-M2.5.

## Usage

```bash
# Print config to stdout (global region, no API key)
bun run index.ts

# With API key
bun run index.ts --api-key=YOUR_MINIMAX_API_KEY

# China region
bun run index.ts --region=china --api-key=YOUR_MINIMAX_API_KEY

# Save to file
bun run index.ts --output=./minimax-config.json
```

## Output

JSON suitable for adding MiniMax as a provider in BrowserOS settings:

```json
{
  "provider": "minimax",
  "model": "MiniMax-M2.5",
  "baseUrl": "https://api.minimax.io/anthropic",
  "contextWindow": 204800,
  "supportsImages": true
}
```

## Get API Key

Visit [MiniMax Developer Platform](https://platform.minimax.io/user-center/basic-information/interface-key) (or [MiniMax China](https://platform.minimaxi.com) for China region).
