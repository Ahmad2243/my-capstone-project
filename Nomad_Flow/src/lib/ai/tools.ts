import { tool } from "ai";
import { z } from "zod";

export const destinationWeatherTool = tool({
  description: "Get current weather conditions and packed recommendation for a destination.",
  inputSchema: z.object({
    location: z.string().describe("The city and country to check weather for (e.g., 'Tokyo, Japan')"),
    units: z.enum(["celsius", "fahrenheit"]).default("celsius").describe("Temperature unit preference"),
  }),
  execute: async ({ location, units }) => {
    // Simulate API lookup delay
    await new Promise((res) => setTimeout(res, 1200));

    // Simulated error case for testing designed error UI
    if (location.toLowerCase().includes("fail") || location.toLowerCase().includes("error")) {
      throw new Error(`Failed to retrieve weather data for "${location}". Remote service unavailable.`);
    }

    return {
      location,
      temperature: units === "celsius" ? 22 : 72,
      condition: "Partly Cloudy",
      humidity: "65%",
      windSpeed: "12 km/h",
      recommendation: "Pack a lightweight jacket and comfortable walking shoes for evening strolls.",
    };
  },
});