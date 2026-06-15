import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, "pacakges/template/*"],
    include: ["./test/**/*.ts"]
  }
});
