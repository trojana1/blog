import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
    site: "https://trojana1.github.io",
    base: "/blog",
    prefetch: true,
    integrations: [tailwind(), preact()],
});
