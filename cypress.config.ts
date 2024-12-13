import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    defaultCommandTimeout: 10000, // Povećan timeout za sve komande na 10 sekundi
  },
});
