import { defineConfig } from "cypress";
import path from "path";
import admin from "firebase-admin";
import { plugin as cypressFirebasePlugin } from "cypress-firebase";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      config = cypressFirebasePlugin(on, config, admin, {
        projectId: "reddit-based-glassdoor",
      });

      process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve(
        __dirname,
        "serviceAccount.json"
      );

      return config;
    },
  },
});
