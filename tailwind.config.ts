import daisyui from "daisyui";
import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./src/**/*.{ts,tsx,mdx}"],
	theme: {},
	plugins: [daisyui],
};
export default config;
