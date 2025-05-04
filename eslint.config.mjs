import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Convert the Next.js configurations
const nextConfigs = compat.extends("next/core-web-vitals", "next/typescript");

// Use flat config format (no "overrides" key)
const eslintConfig = [
  ...nextConfigs,
  {
    files: ["src/app/blog/page.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off"
    }
  }
];

export default eslintConfig;
