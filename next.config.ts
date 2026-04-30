import type { NextConfig } from "next";
import path from "path";
import "@/lib/env";

const nextConfig: NextConfig = {
    turbopack: {
        root: process.cwd(),
        rules: {
            "*.svg": {
                loaders: ["@svgr/webpack"],
                as: "*.js",
            },
        },
    },
    outputFileTracingRoot: process.cwd(),

    // Webpack (next build)
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });
        return config;
    },
    sassOptions: {
        includePaths: [path.join(process.cwd(), "node_modules/normalize-scss/sass")],
    },
};

export default nextConfig;
