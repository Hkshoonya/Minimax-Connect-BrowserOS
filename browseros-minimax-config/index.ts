#!/usr/bin/env bun
/**
 * BrowserOS MiniMax Config Generator
 * Outputs BrowserOS-compatible provider config for MiniMax-M2.5
 *
 * Usage:
 *   bun run index.ts [--region global|china] [--api-key KEY] [--output path]
 *   bun run index.ts --region china --api-key sk-xxx
 */

const BASE_URLS = {
  global: 'https://api.minimax.io/anthropic',
  china: 'https://api.minimaxi.com/anthropic',
} as const

const DEFAULT_MODEL = 'MiniMax-M2.5'
const CONTEXT_WINDOW = 204_800

function parseArgs(): {
  region: 'global' | 'china'
  apiKey?: string
  output?: string
} {
  const args = process.argv.slice(2)
  let region: 'global' | 'china' = 'global'
  let apiKey: string | undefined
  let output: string | undefined

  for (const arg of args) {
    if (arg.startsWith('--region=')) {
      const val = arg.split('=')[1]
      if (val === 'china' || val === 'global') region = val
    } else if (arg.startsWith('--api-key=')) {
      apiKey = arg.split('=').slice(1).join('=').trim()
    } else if (arg.startsWith('--output=')) {
      output = arg.split('=')[1]
    }
  }

  return { region, apiKey, output }
}

function generateConfig(region: 'global' | 'china', apiKey?: string) {
  const baseUrl = BASE_URLS[region]
  return {
    provider: 'minimax',
    model: DEFAULT_MODEL,
    baseUrl,
    ...(apiKey && { apiKey }),
    contextWindow: CONTEXT_WINDOW,
    supportsImages: true,
    modelOptions: ['MiniMax-M2.5', 'MiniMax-M2.5-highspeed'],
  }
}

async function main() {
  const { region, apiKey, output } = parseArgs()
  const config = generateConfig(region, apiKey)
  const json = JSON.stringify(config, null, 2)

  if (output) {
    const fs = await import('fs/promises')
    await fs.writeFile(output, json)
    console.log(`Config written to ${output}`)
  } else {
    console.log(json)
  }
}

main().catch(console.error)
