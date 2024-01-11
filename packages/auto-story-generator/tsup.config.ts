import { defineConfig } from "tsup";

export default defineConfig((options) => {
  return {
    entryPoints: ["src/*.ts"],
    clean: true,
    format: ["cjs", "esm"],
    dts: true,
  };
});
