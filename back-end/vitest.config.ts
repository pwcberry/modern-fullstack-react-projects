import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, "packages/template/*"],
    include: ["./test/**/*.ts"],
    setupFiles:[
      "./test/globalSetup.ts",
      "./test/globalTeardown.ts",
      "./test/setupFileAfterEnv.ts"
    ]
  }
});
