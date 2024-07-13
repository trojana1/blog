const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    darkMode: "selector",
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", ...defaultTheme.fontFamily.sans],
            },
            rotate: {
                25: "25deg",
            },
            borderWidth: {
                1: "1px",
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
