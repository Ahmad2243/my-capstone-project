# Nomad Flow — Next.js App (Scaffold)

Quick scaffold for a Next.js 14+ App Router project with TypeScript and Tailwind.

Run locally:

```bash
npm install
npm run dev
```

Tailwind config is in `tailwind.config.ts` and global styles in `src/styles/globals.css`.

## AI Tool Contract

### `getDestinationWeather`
- **Description:** Fetches current weather conditions and tailored packing recommendations.
- **Input Schema (Zod):**
  - `location` (string, required): Destination name (e.g., "Tokyo, Japan").
  - `units` ("celsius" | "fahrenheit", default "celsius"): Temperature unit.
- **Return Shape:**
  ```json
  {
    "location": "string",
    "temperature": 22,
    "condition": "string",
    "humidity": "string",
    "windSpeed": "string",
    "recommendation": "string"
  }