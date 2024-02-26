import { defineConfig } from 'tsup';

export default defineConfig({
    name: "SIMPLE_TUI",
    entry: ['./src/index.ts'],
    dts: true,
    format: ['cjs', 'esm'],
    clean: true,
    sourcemap: true,
    minify: "terser",
    skipNodeModulesBundle: true,
})