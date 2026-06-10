import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/router.ts"],
  format: ["esm"],
  clean: true,
  esbuildOptions(options) {
    options.minifySyntax = true; // <-- Deletes dead code (if false) but keeps formatting
  },
  define: {
    // patch import.meta.vitest as false when bundling so test blocks get sniped.
    "import.meta.vitest": "false",
  },
});
