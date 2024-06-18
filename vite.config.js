import { defineConfig } from "vite";

export default defineConfig({
  base: "/gradius-js/", // Ensure this matches your repository name
  build: {
    outDir: "dist", // Ensure this matches the publish_dir in your workflow
  },
});
